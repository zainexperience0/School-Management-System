"use client";
import { allModels, prePath } from "@/lib/schemas";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Info, Loader, Pencil, Trash } from "lucide-react";
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
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ListStudentsFee } from "./fee/List";
import { ListCompletedLectures } from "./completed lectures/List";
import { MarkdownViewer } from "@/components/customView/markdown";
import { Badge } from "@/components/ui/badge";
import { useReadLocalStorage } from "usehooks-ts";

export const ViewStudentInClass = ({ modelSlug, id }: any) => {
  const [data, setData] = useState<any>({});
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const student_id = useReadLocalStorage("studentId");


  useEffect(() => {
    setModel(allModels.find((model: any) => model.model === modelSlug));
    fetchData();
  }, [modelSlug, id]);

  const fetchData = () => {
    axios
      .get(`/api/v1/dynamic/${modelSlug}/${id}`)
      .then((resp: any) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
      });
  };

  console.log(data);

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-lg font-semibold">
          Failed to get data!
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
          <Info className="h-6 w-6 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
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
    <div className="max-w-5xl mx-auto my-8 px-4 rounded-md">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${prePath}/${modelSlug}`}>
              {model.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.student.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 p-4 border-b">
        <div className="flex items-center space-x-3">
          <Image
            src={data?.student.image}
            alt={data?.student.name}
            width={80}
            height={80}
            className="rounded-full border"
          />
          <div>
            <p className="text-xl font-semibold">{data.student.name}</p>
            <p className="text-sm text-muted-foreground">{data.student.email}</p>

            <Badge>{data.class.name}</Badge>
            <MarkdownViewer content={data.class.descriptiton} customClassName="border p-2 rounded-md" />
          </div>
        </div>
        {!student_id && (
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-x-2">
          <Link
            href={`/${prePath}/${modelSlug}/edit/${data.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Update
          </Link>
          <Link
            href={`/${prePath}/${modelSlug}/delete/${data.id}`}
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          >
            <Trash className="h-4 w-4 mr-1" />
            Delete
          </Link>
        </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-muted-foreground mb-2">
          Joined on {isoToDate(data?.joinDate)}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Last Updated: {timeAgo(data?.updatedAt)}
        </p>
        <Separator className="my-4" />
        <Tabs defaultValue="fee" className="w-full">
          <TabsList className="w-full border-b border-muted">
            <TabsTrigger value="fee" className="flex-1 text-center py-2">
              Fee
            </TabsTrigger>
            <TabsTrigger
              value="lecturesCompleted"
              className="flex-1 text-center py-2"
            >
              Lectures Completed
            </TabsTrigger>
          </TabsList>
          <TabsContent value="fee">
            <ListStudentsFee modelSlug="fee" id={data?.id} />
          </TabsContent>
          <TabsContent value="lecturesCompleted">
            <ListCompletedLectures modelSlug={"lectureCompleted"} student_id={data?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
