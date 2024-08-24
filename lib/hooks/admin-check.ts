import { useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";

export const useAdminCheck = () => {
  const teacherId = useReadLocalStorage("teacherId");

  useEffect(() => {
    if (!teacherId) {
      location.href = "/";
    }
  }, [teacherId]);
};
