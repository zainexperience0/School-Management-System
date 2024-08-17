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
import { buttonVariants } from "../ui/button";
import { Loader, MoveRight, Pencil, Plus, Trash } from "lucide-react";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { FilterTools } from "./FilterTools";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import { Badge } from "../ui/badge";
export const ListModelData = ({ modelSlug }: any) => {
  const [searchQuery, setSearchQuery] = useState(
    `&sortby=desc&sortfield=${
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
  console.log();
    setModel(allModels.find((model) => model.model === modelSlug));
    // const schema =  model.fields.filter((field: any) => field.frontend.includes("findMany"));
    // console.log(schema);
    
    
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
    <div className="mt-10 max-w-5xl mx-auto px-2">
      {model?.name && (
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            <p className="text-5xl  font-semibold capitalize">{model.name}</p>
            {/* build search query in url for next pages also */}
            {/* <SearchModal model={model} setSearchQuery={setSearchQuery} /> */}
            <FilterTools model={model} setSearchQuery={setSearchQuery} />
          </div>
          <Link
            href={`/${prePath}/${modelSlug}/create`}
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      )}

      <div className="my-10 space-y-4">
        {data?.map((item: any) => (
          <Fragment key={item.id}>
            <Card key={item.id}>
              <CardHeader className="group flex flex-row justify-between items-start">
                <Link
                  className="flex flex-col space-y-2 cursor-pointer w-full"
                  href={`/${prePath}/${modelSlug}/view/${item.id}`}
                >
                  <CardTitle className="capitalize flex flex-row space-x-2 group-hover:underline">
                    <span>{item[model.meta.title]}</span>
                    <MoveRight className=" opacity-75" />
                  </CardTitle>
                  <CardDescription className=" line-clamp-3 ">
                    {item[model.meta.description]}
                  </CardDescription>
                  <div className="flex flex-row space-x-4 items-center">
                  <p className="text-sm text-muted-foreground ">
                    {isoToDate(item?.createdAt)}
                  </p>
                  { item?.updatedAt !== item?.createdAt && <p className="text-sm text-muted-foreground underline">
                    Edited {timeAgo(item?.updatedAt)}
                  </p>}
                </div>
                <div className="flex flex-row items-center space-x-2">
                  {item?.tags?.map((tag: any) => (
                    <Badge
                      key={tag}
                    >
                      {tag}
                    </Badge>
                  ))}
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
        {isEnd && <p className="text-muted-foreground text-center">All caught up!</p>}
      </div>
    </div>
  );
};