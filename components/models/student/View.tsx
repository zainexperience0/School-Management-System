"use client";
import { allModels, prePath } from "@/lib/schemas";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ArrowLeft, Info, Loader, Pencil, ReceiptTextIcon, Trash } from "lucide-react";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
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
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useReadLocalStorage } from "usehooks-ts";
import { ViewStudentInClass } from "../class/classStudents/View";


export const ViewStudent = ({ modelSlug, id }: { modelSlug: string, id: string }) => {
  const [classes, setClasses] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const teacherId: any = useReadLocalStorage("teacherId");
  const studentId: any = useReadLocalStorage("studentId");
  const printRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  if(!teacherId && !studentId){
    location.href = "/";
  }
}, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const modelData = allModels.find((model: any) => model.model === modelSlug);
    setModel(modelData);
    fetchData();
  }, [modelSlug, id]);

  const fetchData = () => {
    axios
      .get(`/api/v1/dynamic/${modelSlug}/${id}`)
      .then((resp) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };

  useEffect(() => {
    setLoading(true);
    axios.post(`/api/classToStudent`, { studentId: id })
      .then((resp) => {
        setLoading(false);
        setClasses(resp.data);
      })
      .catch(() => {
        setLoading(false);
        setFailed(true);
      });
  }, [id]);

  console.log({ classes });
  
  

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Failed to retrieve data. Please try again later.
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

  if (!data?.id) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <div className="flex flex-row space-x-2 items-center justify-center">
          <Info className="h-8 w-8 text-muted-foreground" />
          <p className="text-2xl text-muted-foreground">
            This page doesn&apos;t exist!
          </p>
        </div>
        <Link
          className={cn(buttonVariants({ variant: "secondary" }), "mt-4")}
          href={`/${prePath}/${modelSlug}`}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${modelSlug}`}>
              {model.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>




      <Tabs defaultValue="classes" className="w-full">
        <TabsList>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="resume">
          {teacherId && (
            <div className="flex flex-row space-x-4 mt-4">
              <Link
                href={`/${prePath}/${modelSlug}/edit/${data.id}`}
                className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Update
              </Link>
              <Link
                href={`/${prePath}/${modelSlug}/delete/${data.id}`}
                className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Link>
            </div>
          )}
          <div ref={printRef} className="rounded-lg p-6 mb-8 border mt-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start">
              <div className="flex-1">
                <p className="text-3xl font-semibold">{data.name}</p>
                <p className="text-muted-foreground">{data.email}</p>
                <p>Phone: {data.phone}</p>
                <p>Address: {data.address}</p>
                <p>Gender: {data.gender}</p>
              </div>
              <Image
                src={data?.image}
                alt={data?.name}
                width={120}
                height={120}
                className="rounded-full mb-4 sm:mb-0 sm:mr-6"
              />
            </div>

            <div className="mt-6">
              <p className="text-xl font-semibold mb-4">Education</p>
              <p>{data.education}</p>
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <p className="text-xl font-semibold mb-4">Courses</p>
              {classes && classes.length > 0 ? (
                classes.map((course: any) => (
                  <div key={course.id} className="mb-4">
                    <p className="text-sm font-semibold">{course.class.name}</p>
                  </div>
                ))
              ) : (
                <p>No courses found.</p>
              )}
            </div>

            <Separator className="my-6" />

            <div className="mt-6">
              <p className="text-xl font-semibold mb-4">Social Links</p>
              <ul className="list-disc list-inside">
                {data.socialLinks && data.socialLinks.length > 0
                  ? Object.entries(JSON.parse(data.socialLinks[0])).map(
                    ([key, value]: any) => (
                      <li key={key}>
                        <strong>{key}:</strong>{" "}
                        <Link
                          href={value.startsWith("http") ? value : `https://${value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {value}
                        </Link>
                      </li>
                    )
                  )
                  : <p>No social links available.</p>}
              </ul>
            </div>
          </div>
          <div>
            <Separator className="my-6" />
            <Button variant="outline" onClick={handlePrint}>
              Print Resume
              <ReceiptTextIcon className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Created: {isoToDate(data?.createdAt)}
            </p>
            <p className="text-sm text-gray-500">
              Updated: {timeAgo(data?.updatedAt)}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="classes">
          {classes.length > 0 ? (
            <div>
              {classes.map((classItem: any) => (
                <div key={classItem.id}>
                  <ViewStudentInClass id={classItem.id} modelSlug={"classToStudent"}/>
                </div>
              ))}
            </div>
          ) : (
            <p>No courses found</p>
          )}
        </TabsContent>
      </Tabs>


    </div>
  );
};
