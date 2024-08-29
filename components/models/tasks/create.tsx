"use client";
import { prePath } from "@/lib/schemas";
import { useEffect, useState, useCallback } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminCheck } from "@/lib/hooks/admin-check";

export const CreateTasks = ({ model, callbackFn, relation, page, lecture_id }: any) => {
  useAdminCheck();
  const [state, setState] = useState<any>({
    lectures: [],
    classes: [],
    classId: null,
    data: { ...relation },
    loading: true,
    creating: false,
    status: null, // 'success', 'fail'
    isRelational: false,
  });

  // Combine API calls for fetching classes and lectures
  const fetchClassesAndLectures = useCallback(async () => {
    setState((prev: any) => ({ ...prev }));
    try {
      const [classRes, lectureRes] = await Promise.all([
        axios.get(`/api/v1/dynamic/class`),
        state.classId && axios.post(`/api/lectures`, { classId: state.classId }),
      ]);

      setState((prev: any) => ({
        ...prev,
        classes: classRes.data || [],
        lectures: lectureRes?.data || [],
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setState((prev: any) => ({ ...prev, loading: false }));
    }
  }, [state.classId]);

  useEffect(() => {
    fetchClassesAndLectures();
  }, [fetchClassesAndLectures, page]);

  useEffect(() => {
    if (lecture_id) {
      setState((prev: any) => ({
        ...prev,
        data: {
          ...prev.data,
          lecture: { connect: { id: lecture_id } },
        },
      }));
    }
  }, [lecture_id]);

  const createRecord = async () => {
    const requiredFields = model.fields?.filter((field: any) => field.required);
    const isEmptyRecord = requiredFields?.some(
      (field: any) => !state.data[field.slug]
    );

    if (isEmptyRecord) {
      alert(`Please fill all required fields: ${JSON.stringify(requiredFields.map((field: any) => field.name))}`);
      return;
    }

    setState((prev: any) => ({ ...prev, creating: true }));
    try {
      await axios.post(`/api/v1/dynamic/${model.model}`, state.data);
      setState((prev: any) => ({ ...prev, creating: false, status: 'success' }));
      setTimeout(() => {
        resetFields();
        callbackFn ? callbackFn() : window.history.back();
      }, 2000);
    } catch (error) {
      console.error(error);
      setState((prev: any) => ({ ...prev, creating: false, status: 'fail' }));
    }
  };

  const resetFields = () => {
    setState((prev: any) => ({
      ...prev,
      creating: false,
      status: null,
      data: { ...relation },
    }));
  };

  useEffect(() => {
    if (!relation) {
      setState((prev: any) => ({ ...prev, loading: false }));
      return;
    }

    const schemaRelationalFields = model.fields?.filter((field: any) => field.type === "relation").map((field: any) => field.slug);
    const propRelationalFields = Object.keys(relation);
    const isRelationalField = schemaRelationalFields?.some((field: any) => !propRelationalFields.includes(field));
    setState((prev: any) => ({ ...prev, isRelational: !!isRelationalField, loading: false }));
  }, [model.fields, relation]);

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">Page not found!</p>
      </div>
    );
  }

  if (state.isRelational) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center space-y-4">
        <p className="text-destructive text-2xl font-semibold">Relational records cannot be created manually!</p>
        <Link href={`/${prePath}/${model.model}`} className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Go back
        </Link>
      </div>
    );
  }

  if (state.loading) {
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
      <InputWrapper model={model} data={state.data} setData={(data: any) => setState((prev: any) => ({ ...prev, data }))} action="create" />
      <div className="mt-10 flex justify-between items-center">
        <h1>Select Class</h1>
        <Select onValueChange={(value) => setState((prev: any) => ({ ...prev, classId: value }))}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            {state.classes.map((option: any) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-10 flex justify-between items-center">
        <h1>Select lectures</h1>
        <Select
          onValueChange={() => setState((prev: any) => ({
            ...prev,
            data: {
              ...prev.data,
              lecture: { connect: { id: lecture_id } },
            },
          }))}
          defaultValue={lecture_id || ""}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select Lectures" />
          </SelectTrigger>
          <SelectContent>
            {state.lectures.map((option: any) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="mt-4 w-full sm:w-auto"
        onClick={createRecord}
        disabled={state.creating || state.status}
      >
        {state.creating && <Loader className="h-4 w-4 mr-2 animate-spin" />}
        {state.creating ? "Creating..." : state.status === 'success' ? `${model.name} created!` : "Submit"}
        {state.status === 'fail' && "Failed to create!"}
      </Button>
    </div>
  );
};
