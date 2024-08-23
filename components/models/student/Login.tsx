"use client";
import { EmailInputField } from "@/components/custom/FieldList/EmailInputField";
import { PasswordInputField } from "@/components/custom/FieldList/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";
import { useState } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

export const StudentLogin = ({ model }: any) => {
  const [teacherId, setTeacherId, removeTeacherId] = useLocalStorage(
    "teacherId",
    ""
  );
  const [studentId, setStudentId, removeStudentId] = useLocalStorage(
    "studentId",
    ""
  );

  const [data, setData] = useState<any>({});
  const [login, setLogin] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createFail, setCreateFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
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
    setLogin(true);
    axios
      .post(`/api/v1/student/login`, data)
      .then((resp: any) => {
        setLogin(false);
        setCreateSuccess(true);
        removeTeacherId();
        setStudentId(resp.data.id);
        setTimeout(() => {
          resetFields();
          window.location.href = `/main/student/view/${resp.data.id}`;
        }, 2000);
      })
      .catch((err: any) => {
        console.log(err);
        setLogin(false);
        setCreateFail(true);
      });
  };

  const resetFields = () => {
    setLogin(false);
    setCreateSuccess(false);
    setCreateFail(false);
    setData({});
  };

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
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
    <Card>
      <CardHeader>
        <CardTitle>STUDENT ACCOUNT</CardTitle>
        <CardDescription>Provide admin account details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <EmailInputField
          field={model?.fields[0]}
          record={data}
          setRecord={setData}
        />
        <PasswordInputField
          field={model?.fields[1]}
          record={data}
          setRecord={setData}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleLogin}
          disabled={login || createSuccess || createFail}
          className="mt-6"
        >
          {login && <Loader className="h-4 w-4 mr-2 animate-spin" />}
          {login && "Verifying"}
          {!login && !createSuccess && !createFail && "Sign In"}
          {createSuccess && <CheckCircle className="h-4 w-4 mr-2" />}
          {createSuccess && `Verified`}
          {createFail && "Incorrect email or password"}
        </Button>
      </CardFooter>
    </Card>
  );
};
