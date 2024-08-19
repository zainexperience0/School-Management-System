import { useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";

export const useAdminCheck = () => {
  const studentId = useReadLocalStorage("studentId");
  const teacherId = useReadLocalStorage("teacherId");

  useEffect(() => {
    if (!teacherId || studentId) {
      location.href = "/";
    }
  }, [teacherId, studentId]);
};
