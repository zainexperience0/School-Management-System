import { useReadLocalStorage } from "usehooks-ts";

export const useStudentId = () => {
  const teacherId: any = useReadLocalStorage("studentId");

  return teacherId;
};
