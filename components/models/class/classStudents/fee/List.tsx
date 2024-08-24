"use client";

import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { allModels, prePath } from "@/lib/schemas";
import Link from "next/link";
import { Loader, MoveRight, Pencil, Plus, Trash } from "lucide-react";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FilterTools } from "@/components/models/FilterTools";
import { Badge } from "@/components/ui/badge";
import { FeeEdit } from "./Edit";
import { useReadLocalStorage } from "usehooks-ts";

const statusStyles: any = {
  SUBMITTED: "bg-green-100 text-green-800",
  NOT_SUBMITTED: "bg-red-300 text-red-800",
  LATE_SUBMITTED: "bg-yellow-100 text-yellow-800",
};

export const ListStudentsFee = ({ modelSlug, id }: any) => {
  const studentId = useReadLocalStorage("studentId");
  const [searchQuery, setSearchQuery] = useState(
    `&sortby=desc&${
      id ? `eq=true&fields=classToStudentId&classToStudentId=${id}` : ""
    }&sortfield=${
      allModels.find((model) => model.model === modelSlug)?.searchConfig
        ?.sortField
    }`
  );

  const { data, isLoading, isFailed, isEnd } = useInfiniteQuery({
    modelSlug,
    searchQuery,
  });

  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<any>({});

  useEffect(() => {
    setModel(allModels.find((model) => model.model === modelSlug));

    const fields = model.searchConfig?.searchFields;
    const sortField = model.searchConfig?.sortField;
    const sortBy = model.searchConfig?.sortBy;
    const search = "";
    setSearchQuery(
      `${search?.length > 0 ? `&s=${search}` : ""}${
        fields?.length > 0 ? `&fields=${fields.join(",")}` : ""
      }${sortField?.length > 0 ? `&sortfield=${sortField}` : ""}${
        sortBy?.length > 0 ? `&sortby=${sortBy}` : ""
      }`
    );
    setLoading(false);
  }, [modelSlug]);

  if (!model) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (isFailed) {
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

  return (
    <div className="mt-10 max-w-5xl mx-auto px-4">
      {model?.name && (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            <p className="text-4xl font-semibold capitalize">{model.name}</p>
            <FilterTools model={model} setSearchQuery={setSearchQuery} />
          </div>
          {!studentId && (
            <Link
              href={`/${prePath}/${modelSlug}/create${id ? `?classToStudentId=${id}` : ""}`}
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              <Plus className="h-5 w-5" />
            </Link>
          )}
        </div>
      )}

      <div className="my-10 space-y-4">
        {data?.map((item: any) => (
          <Fragment key={item.id}>
            <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="group flex flex-row justify-between items-start">
                {/* <Link
                  className="flex flex-col space-y-2 cursor-pointer w-full"
                  href={`/${prePath}/${modelSlug}/view/${item.id}`}
                > */}
                  <CardTitle className="capitalize flex flex-row items-center space-x-2 group-hover:underline">
                    <span>{item.month}</span>
                    <Badge className={statusStyles[item.status]}>
                      {item.status}
                    </Badge>
                    {/* <MoveRight className="opacity-75" /> */}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item[model.meta.description]}
                  </CardDescription>
                  <div className="flex flex-row space-x-4 items-center">
                    <p className="text-sm text-muted-foreground">
                      {isoToDate(item?.dueDate)}
                    </p>
                    {item?.status === "SUBMITTED" && (
                      <p className="text-sm text-muted-foreground underline">
                        Edited {timeAgo(item?.submittedDate)}
                      </p>
                    )}
                  </div>
                {/* </Link> */}

                {!studentId && (
                  <div className="flex flex-row items-center justify-end space-x-2">
                    <FeeEdit id={item.id} model={allModels.find((model) => model.model === "fee")} />
                  </div>
                )}
              </CardHeader>
            </Card>
          </Fragment>
        ))}
      </div>
      <div className="mb-10">
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        )}
        {isEnd && (
          <p className="text-muted-foreground text-center">All caught up!</p>
        )}
      </div>
    </div>
  );
};
