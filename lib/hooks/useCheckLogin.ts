import { useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";

export const useLogin = () => {
  const studentId = useReadLocalStorage("studentId");
  const teacherId = useReadLocalStorage("teacherId");

  useEffect(() => {
    if(teacherId){
      location.href = "/main";
    }
    if(studentId){
      location.href = "/main/student/view" + studentId;
    }
  }, [studentId, teacherId]);
};
