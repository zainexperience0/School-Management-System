"use client"

import { LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { useGetUserMeta } from "@/lib/hooks/getUserMeta"
import { useLocalStorage } from "usehooks-ts"

export const Navbar = () => {
    const user: any = useGetUserMeta()
    const [teacherId, setTeacherId, removeTeacherId] = useLocalStorage(
        "teacherId",
        ""
    );
    const [studentId, setStudentId, removeStudentId] = useLocalStorage(
        "studentId",
        ""
    );

    const logout = () => {
        removeTeacherId();
        removeStudentId();
        location.href = "/";
    };


    return (
        <div className="bg-transparent top-0 h-16 border-b w-full flex justify-between items-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                School Management System
            </h1>
            <div className="flex items-center space-x-4">
                <Avatar>
                    {user?.image ? (
                        <AvatarImage src={user.image} alt={user?.name} />
                    ) : (
                        <AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
                    )}
                </Avatar>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
                <Button variant={"destructive"} onClick={logout}>
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
