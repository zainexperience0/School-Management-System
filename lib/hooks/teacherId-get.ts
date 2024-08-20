import { useReadLocalStorage } from "usehooks-ts";

export const useTeacherId = () => {
  const teacherId = useReadLocalStorage("teacherId");

  return teacherId;
};
