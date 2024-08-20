import { useReadLocalStorage } from "usehooks-ts";

export const useStudentId = () => {
  const teacherId = useReadLocalStorage("teacherId");

  return teacherId;
};
