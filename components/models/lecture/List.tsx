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
import { FilterTools } from "../FilterTools";
import { buttonVariants } from "@/components/ui/button";
import { useAdminCheck } from "@/lib/hooks/admin-check";

export const ListLecturesData = ({ modelSlug, id }: any) => {
  useAdminCheck();
  const [searchQuery, setSearchQuery] = useState(
    `&sortby=asc&${
      id ? `eq=true&fields=classId&classId=${id}` : ""
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
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center space-x-4">
            <p className="text-3xl font-semibold capitalize">{model.name}</p>
            <FilterTools model={model} setSearchQuery={setSearchQuery} />
          </div>
          <Link
            href={`/${prePath}/${modelSlug}/create${
              id ? `?classId=${id}` : ""
            }`}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {data?.map((item: any, index: number) => (
          <Fragment key={item.id}>
            <Card>
              <CardHeader className="flex flex-row justify-between items-start">
                <Link
                  className="flex flex-col space-y-2 cursor-pointer w-full"
                  href={`/${prePath}/${modelSlug}/view/${item.id}`}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <CardTitle className="flex items-center space-x-2 group-hover:underline">
                      <span className="text-lg font-semibold">
                        {index + 1}. {item[model.meta.title]}
                      </span>
                      <MoveRight className="opacity-75" />
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {item[model.meta.description]}
                  </CardDescription>
                  <div className="flex flex-row space-x-4 items-center">
                    <p className="text-sm text-muted-foreground">
                      {isoToDate(item?.createdAt)}
                    </p>
                    {item?.updatedAt !== item?.createdAt && (
                      <p className="text-sm text-muted-foreground underline">
                        Edited {timeAgo(item?.updatedAt)}
                      </p>
                    )}
                  </div>
                </Link>

                <div className="flex flex-row items-center justify-end space-x-2">
                  <Link
                    href={`/${prePath}/${modelSlug}/edit/${item.id}`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" })
                    )}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/${prePath}/${modelSlug}/delete/${item.id}?deletekey=title`}
                    className={cn(
                      buttonVariants({ variant: "default", size: "sm" })
                    )}
                  >
                    <Trash className="h-4 w-4" />
                  </Link>
                </div>
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
