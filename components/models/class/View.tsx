"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Info, Loader, Pencil, Trash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListLecturesData } from "../lecture/List";
import { ListClassStudents } from "./classStudents/List";
import { MarkdownViewer } from "@/components/customView/markdown";
import { useAdminCheck } from "@/lib/hooks/admin-check";
import { allModels, prePath } from "@/lib/schemas";
import { calculateRemainingDays, cn, isoToDate, timeAgo } from "@/lib/utils";

export const ViewClass = ({ modelSlug, id }: any) => {
  useAdminCheck();

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
        <p className="text-destructive text-xl font-medium">
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
          <p className="text-xl text-muted-foreground">
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
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <p className="text-base sm:text-lg text-muted-foreground">
          {isoToDate(data?.createdAt)}
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

      <p className="text-lg sm:text-3xl font-medium mb-2">{data.name}</p>
      <Separator className="my-4" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
        <Image
          src={data.image}
          alt={data.name}
          width={200}
          height={200}
          className="sm:w-32 sm:h-32 rounded-full"
        />
        <div className="sm:flex-1">
          <p className="text-base font-medium">
            Duration: {data.duration} {data.duration > 1 ? 'months' : 'month'}
          </p>
          <p className="text-base font-medium">
            Remaining: {calculateRemainingDays(data?.createdAt, data?.duration)} days
          </p>
          <MarkdownViewer content={data?.descriptiton} customClassName="border p-2" />
        </div>
      </div>

      <p className="text-base text-muted-foreground mb-10">
        Updated {timeAgo(data?.updatedAt)}
      </p>

      <Tabs defaultValue="lecture" className="w-full">
        <TabsList className="w-full border-b border-muted">
          <TabsTrigger value="lecture" className="flex-1 text-center py-2 text-sm">
            Lecture
          </TabsTrigger>
          <TabsTrigger value="students" className="flex-1 text-center py-2 text-sm">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent value="lecture">
          <ListLecturesData modelSlug={"lecture"} id={data.id} />
        </TabsContent>
        <TabsContent value="students">
          <ListClassStudents modelSlug={"classToStudent"} id={data.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
