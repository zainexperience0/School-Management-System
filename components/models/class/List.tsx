"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allModels, prePath } from "@/lib/schemas";
import Link from "next/link";
import { ArrowRight, Loader, Pencil, Plus, Trash } from "lucide-react";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { cn, isoToDate, timeAgo } from "@/lib/utils";
import { FilterTools } from "../FilterTools";
import { buttonVariants } from "@/components/ui/button";

export const ListClasses = ({ modelSlug }: any) => {
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
    <div className="mt-10 max-w-5xl px-4 py-6">
      {model?.name && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <h1 className="text-2xl md:text-3xl font-bold capitalize">
              {model?.name} ({data?.length})
            </h1>
            <FilterTools model={model} setSearchQuery={setSearchQuery} />
          </div>
          <Link
            href={`/${prePath}/${modelSlug}/create`}
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      )}

      <div className="my-10 space-y-4">
        {data?.map((item: any, index: number) => (
          <div key={item.id} className="w-fullrounded-lg overflow-hidden">
            <div className="block md:hidden p-4">
              <div className="font-medium">{index + 1}</div>
              <div className="font-medium">{item?.name}</div>
              <div className="font-medium">{isoToDate(item?.createdAt)}</div>
              <div className="font-medium">{timeAgo(item?.updatedAt)}</div>
              <div className="flex items-center justify-end space-x-2 mt-4">
                <Link
                  href={`/${prePath}/${modelSlug}/view/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" })
                  )}
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${prePath}/${modelSlug}/edit/${item.id}`}
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" })
                  )}
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <Link
                  href={`/${prePath}/${modelSlug}/delete/${item.id}?deletekey=name`}
                  className={cn(
                    buttonVariants({ variant: "destructive", size: "sm" })
                  )}
                >
                  <Trash className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Table className="hidden md:table max-w-5xl">
              <TableCaption>
                A list of all {model.name.toLowerCase()}.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/5">#</TableHead>
                  <TableHead className="w-2/5">Name</TableHead>
                  <TableHead className="w-2/5">Students</TableHead>
                  <TableHead className="w-1/5">Created</TableHead>
                  <TableHead className="w-1/5">Updated</TableHead>
                  <TableHead className="w-1/5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell className="font-medium">
                    {item?.students?.length}
                  </TableCell>
                  <TableCell className="font-medium">
                    {isoToDate(item?.createdAt)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {timeAgo(item?.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center justify-end space-x-2">
                      <Link
                        href={`/${prePath}/${modelSlug}/view/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" })
                        )}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Link>
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
                          buttonVariants({ variant: "destructive", size: "sm" })
                        )}
                      >
                        <Trash className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      <div className="mb-10">
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        )}
        {/* {isEnd && (
          <p className="text-muted-foreground text-center">All caught up!</p>
        )} */}
      </div>
    </div>
  );
};
