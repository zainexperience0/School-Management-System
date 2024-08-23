"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminCheck } from "@/lib/hooks/admin-check";
import { useMainData } from "@/lib/hooks/getMaindata";
import { useTeacherId } from "@/lib/hooks/teacherId-get";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const MainPage = () => {
  const {
    students,
    teachers,
    classes,
    loading,
    error,
  } = useMainData();
  const teacherId: any = useTeacherId();

  useAdminCheck();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {/* Total Students Card */}
        <Card className="rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl">
              Total Students
            </CardTitle>
            <CardDescription>Manage and add more students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{students.length}</h1>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/main/student")}
              >
                Visit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Total Teachers Card */}
        {teacherId && (
          <Card className="rounded-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl">
                Total Teachers
              </CardTitle>
              <CardDescription>Manage and add more teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">{teachers.length}</h1>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/main/teacher")}
                >
                  Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Total Classes Card */}
        <Card className="rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl">
              Total Classes
            </CardTitle>
            <CardDescription>Manage and view classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{classes.length}</h1>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/main/class")}
              >
                Visit
              </Button>
            </div>
          </CardContent>
        </Card>

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
};

export default MainPage;
