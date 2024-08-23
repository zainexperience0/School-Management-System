import { useReadLocalStorage } from "usehooks-ts";

export const useTeacherId = () => {
  const teacherId: any = useReadLocalStorage("teacherId");

  return teacherId;
};
