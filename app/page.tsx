"use client";
import { AdminLogin } from "@/components/models/teacher/Login";
import { StudentLogin } from "@/components/models/student/Login";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginSchema } from "@/lib/schemas";
import Image from "next/image";
import { useLogin } from "@/lib/hooks/useCheckLogin";

export default function Home() {
  useLogin();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-8 md:p-16 lg:p-24">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
        SCHOOL MANAGEMENT SYSTEM
      </h1>
      <div className="w-full sm:w-auto">
        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="flex justify-center">
            <TabsTrigger value="admin" className="flex-1">
              <Badge variant="destructive">ADMIN</Badge>
            </TabsTrigger>
            <TabsTrigger value="student" className="flex-1">
              Student
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="admin"
            className="w-full sm:w-[500px] md:w-[600px] lg:w-[800px] mx-auto"
          >
            <AdminLogin model={LoginSchema.find((m) => m.model === "admin")} />
          </TabsContent>
          <TabsContent
            value="student"
            className="w-full sm:w-[500px] md:w-[600px] lg:w-[800px] mx-auto"
          >
            <StudentLogin model={LoginSchema.find((m) => m.model === "admin")}/>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-8 sm:mt-12 md:mt-16">
        <Image
          src="/ar.png"
          alt="Picture of the author"
          width={100}
          height={100}
          className="mx-auto"
        />
        <p className="text-center text-sm sm:text-base mt-4">
          Copyright © 2023. All rights reserved.
        </p>
      </div>
    </div>
  );
}
