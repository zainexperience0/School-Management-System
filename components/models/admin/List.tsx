"use client";
import React, { useEffect, useState } from "react";
import { allModels, prePath } from "@/lib/schemas";
import Link from "next/link";
import { ArrowRight, Loader, Pencil, Plus, Trash } from "lucide-react";
import useInfiniteQuery from "@/lib/hooks/useQuery";
import { FilterTools } from "../FilterTools";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useReadLocalStorage } from "usehooks-ts";
import { ListClasses } from "../class/List";
import { cn } from "@/lib/utils";

export const ListUsers = ({ modelSlug }: any) => {
  const adminId = useReadLocalStorage("adminId");
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
      <div className="mt-10 max-w-5xl mx-auto text-center px-4">
        <p className="text-destructive text-2xl font-semibold">
          Page not found!
        </p>
      </div>
    );
  }

  if (isFailed) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center px-4">
        <p className="text-destructive text-2xl font-semibold">
          Failed to get data!
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-10 max-w-5xl mx-auto text-center px-4">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-5xl mx-auto px-4 py-6">
      {model?.name && (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <h1 className="text-3xl font-bold capitalize">ADMIN PANEL</h1>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-y-9">
        <div className="space-y-6">
          {data?.map((item: any, index: number) => (
            <div key={item.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant={"destructive"} className="text-xl">
                  ADMINS({data?.length})
                </Badge>
                <FilterTools model={model} setSearchQuery={setSearchQuery} />
                <Link
                  href={`/${prePath}/${modelSlug}/create`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <Plus className="h-5 w-5" />
                </Link>
              </div>
              <Table className="w-full overflow-x-auto">
                <TableCaption>
                  A list of all {model.name.toLowerCase()}.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] md:w-[100px]">NO.</TableHead>
                    <TableHead className="w-[50px] md:w-[100px]"></TableHead>
                    <TableHead className="w-[150px] md:w-[200px]">
                      Name
                    </TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Phone</TableHead>
                    <TableHead className="text-right">Address</TableHead>
                    <TableHead className="w-1/4"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      {index + 1}
                      {adminId === item.id && (
                        <Badge className="bg-green-600 ml-3">YOU</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage src={item.image} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell className="text-right font-medium">
                      {item.phone}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {item.address}
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
        <Separator />
        <ListClasses modelSlug={"class"} />
      </div>

      <div className="mt-8 text-center">
        {isLoading && (
          <div className="flex justify-center">
            <Loader className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        )}
        {isEnd && <p className="text-muted-foreground">All caught up!</p>}
      </div>
    </div>
  );
};
