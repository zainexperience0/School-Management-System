"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, CheckCircle, Loader } from "lucide-react";
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
import { generateFromEmail } from "unique-username-generator";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useAdminCheck } from "@/lib/hooks/admin-check";

export const RegisterStudent = ({ model, callbackFn, relation, page }: any) => {
  useAdminCheck();
  const [socialLinks, setSocialLinks] = useState<any>([]);
  const [data, setData] = useState({ ...relation });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isRelational, setIsRelational] = useState(false);

  useEffect(() => {
    setData((prevData: any) => ({
      ...prevData,
      socialLinks: [JSON.stringify(socialLinks)],
    }));
  }, [socialLinks]);

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
      .post(`/api/v1/dynamic/${model.model}`, {
        ...data,
      })
      .then((resp: any) => {
        // console.log(resp);
        setCreating(false);
        setCreateSuccess(true);
        setTimeout(() => {
          resetFields();
          if (!callbackFn) {
            window.location.href = "/main/student";
          } else {
            callbackFn()
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
    // console.log({ isRelationalField });
    setIsRelational(!!isRelationalField);

    setLoading(false);
  }, []);

  // console.log({ data });

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
    <div className="max-w-5xl mx-auto my-10 px-2">
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
      <Image
        src={data?.image}
        alt={model.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <InputWrapper
        model={model}
        data={data}
        setData={setData}
        action={"create"}
      />
       <Select
        onValueChange={(value) =>
          setSocialLinks((prevLinks: any) => ({ ...prevLinks, [value]: "" }))
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Social Links" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Twitter">Twitter</SelectItem>
          <SelectItem value="Facebook">Facebook</SelectItem>
          <SelectItem value="Instagram">Instagram</SelectItem>
          <SelectItem value="LinkedIn">LinkedIn</SelectItem>
        </SelectContent>
      </Select>
      {Object.keys(socialLinks).map((key: any) => (
        
          <div key={key} className="mt-2 flex items-center justify-center space-x-4">
            <h1 className="text-md text-muted-foreground">{key}</h1>
            <Input
            key={key}
            type="textInput"
            placeholder={key}
            onChange={(e) => {
              setSocialLinks({
                ...socialLinks,
                [key]: e.target.value,
              });
            }}
            className="mt-2"
          />
          </div>
        ))}
      <Button
      className="mt-6"
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
