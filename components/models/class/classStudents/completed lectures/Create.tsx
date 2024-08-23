"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Check, CheckCircle, Loader } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { InputWrapper } from "@/components/custom/inputWrapper";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export const LectureCompleteCreate = ({
  model,
  callbackFn,
  relation,
  page,
  student_id,
}: any) => {
  
  const [students, setStudents] = useState<any[]>([]);
  const [data, setData] = useState({ ...relation });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isRelational, setIsRelational] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/dynamic/classToStudent")
      .then((resp: any) => {
        setStudents(resp.data);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log({students});
  

  useEffect(() => {
    if (student_id) {
      setData((prevData: any) => ({
        ...prevData,
        classToStudent: {
          connect: {
            id: student_id,
          },
        },
      }));
    }
  }, [student_id]);

  const createRecord = () => {
    const requiredFields = model.fields?.filter((field: any) => field.required);

    if (requiredFields?.length > 0) {
      const isEmptyRecord = requiredFields.find(
        (field: any) =>
          data[field.slug] === undefined || data[field.slug] === ""
      );
      if (isEmptyRecord) {
        alert(`Please fill all required fields. 
            ${JSON.stringify(
              requiredFields?.map((field: any) => field.name)
            )}`);
        return;
      }
    }
    setCreating(true);
    axios
      .post(`/api/v1/dynamic/${model.model}`,data)
      .then((resp: any) => {
        setCreating(false);
        setCreateSuccess(true);
        setTimeout(() => {
          resetFields();
          if (!callbackFn) {
            window.history.back();
          } else {
            callbackFn();
          }
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        setCreating(false);
        setCreateFail(true);
      });
  };

  const resetFields = () => {
    setCreating(false);
    setCreateSuccess(false);
    setCreateFail(false);
    setData({ ...relation });
  };

  useEffect(() => {
    if (!relation) {
      setLoading(false);
      return;
    }
    const schemaRelationalFields = model.fields
      ?.filter((field: any) => field?.type === "relation")
      ?.map((field: any) => field?.slug);
    const propRelationalFields = Object.keys(relation);
    const isRelationalField = schemaRelationalFields?.some(
      (field: any) => !propRelationalFields?.includes(field)
    );
    setIsRelational(!!isRelationalField);

    setLoading(false);
  }, []);

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (isRelational) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center space-y-4">
        <p className="text-destructive text-2xl font-semibold">
          Relational records cannot be created manually!
        </p>
        <Link
          href={`/${prePath}/${model.model}`}
          className={buttonVariants({ variant: "outline" })}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Go back
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 space-y-6">
      {page && (
        <Breadcrumb className="mb-5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${prePath}/${model.model}`}>
                {model.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create {model.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
       <div className="mt-10">
        <Popover>
          <PopoverTrigger className="w-full">
            <Command className="w-full">
              <CommandInput
                placeholder="Type a class or search..."
                className="rounded-t-lg"
              />
              <PopoverContent className="max-h-60 w-full overflow-auto">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandList>
                  {students.map((option: any) => (
                    <CommandItem
                    className="w-full"
                      key={option.id}
                      value={option.id}
                      defaultValue={student_id}
                      onSelect={() => {
                        setData({
                          ...data,
                          classToStudent: {
                            connect: {
                              id: option.id,
                            },
                          },
                        });
                      }}
                    >
                      {option.student.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </PopoverContent>
            </Command>
          </PopoverTrigger>
        </Popover>
      </div>
      <InputWrapper
        model={model}
        data={data}
        setData={setData}
        action={"create"}
      />
      <Button
        onClick={() => createRecord()}
        disabled={creating || createSuccess || createFail}
        className="w-full sm:w-auto"
      >
        {creating && <Loader className="h-4 w-4 mr-2 animate-spin" />}
        {creating ? (
          "Creating..."
        ) : createSuccess ? (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            {model.name} created!
          </>
        ) : createFail ? (
          "Failed to create!"
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
};
