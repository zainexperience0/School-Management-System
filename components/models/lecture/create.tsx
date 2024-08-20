"use client";
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
import { cn } from "@/lib/utils";

export const CreateLecture = ({
  model,
  callbackFn,
  relation,
  page,
  classId,
}: any) => {
  const [classes, setClasses] = useState<any[]>([]);
  const [data, setData] = useState({ ...relation });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRelational, setIsRelational] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/dynamic/class")
      .then((resp: any) => {
        setClasses(resp.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (classId) {
      setData((prevData: any) => ({
        ...prevData,
        class: {
          connect: {
            id: classId,
          },
        },
      }));
    }
  }, [classId]);

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
      .post(`/api/v1/dynamic/${model.model}`, data)
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
    <div className="max-w-5xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
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
      <InputWrapper
        model={model}
        data={data}
        setData={setData}
        action={"create"}
      />
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
                  {classes.map((option: any) => (
                    <CommandItem
                      key={option.id}
                      value={option.id}
                      defaultValue={classId}
                      onSelect={() => {
                        setData({
                          ...data,
                          class: {
                            connect: {
                              id: option.id,
                            },
                          },
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.id === classId ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option.name}
                    </CommandItem>
                  ))}
                </CommandList>
              </PopoverContent>
            </Command>
          </PopoverTrigger>
        </Popover>
      </div>
      <Button
        className="mt-4 w-full sm:w-auto"
        onClick={() => {
          createRecord();
        }}
        disabled={creating || createSuccess || createFail}
      >
        {creating && <Loader className="h-4 w-4 mr-2 animate-spin" />}
        {creating && "Creating..."}
        {!creating && !createSuccess && !createFail && "Submit"}
        {createSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
        {createSuccess && `${model.name} created!`}
        {createFail && "Failed to create!"}
      </Button>
    </div>
  );
};
