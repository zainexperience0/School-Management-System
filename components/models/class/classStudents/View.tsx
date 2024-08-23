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

export const ViewStudentInClass = ({ modelSlug, id }: any) => {
  const [data, setData] = useState<any>({});
  const [model, setModel] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

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

  if (failed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
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
    <div className="max-w-5xl mx-auto my-10 px-4">
      <Breadcrumb className="mb-5">
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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <p className="text-lg sm:text-xl text-muted-foreground">
          {isoToDate(data?.joinDate)}
        </p>
        <div className="flex flex-row space-x-2 mt-2 sm:mt-0">
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
      </div>
      <p className="text-4xl sm:text-5xl font-semibold mb-2">{data.name}</p>
      <Separator className="my-4" />
      <p className="text-lg text-muted-foreground mb-10">
        Updated {timeAgo(data?.updatedAt)}
      </p>

      <div className="text-center">
        <Image
          src={data?.student.image}
          alt={data?.name}
          width={200}
          height={200}
          className="rounded-full mx-auto"
        />
        <p className="text-sm text-muted-foreground mt-2">
          {data?.student.email}
        </p>
        <p className="text-sm mt-2">Phone: {data?.student.phone}</p>
        <p className="font-bold">{data.class.name}</p>
      </div>

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
        <ListCompletedLectures modelSlug={"lectureCompleted"} student_id={data?.id}/>
        </TabsContent>
      </Tabs>
    </div>
  );
};
