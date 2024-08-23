import { useEffect, useState } from "react";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";

export const useGetUserMeta = () => {
  const teacherId = useReadLocalStorage("teacherId");
  const studentid = useReadLocalStorage("studentId");
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    if (teacherId) {
      axios
        .get(`/api/v1/dynamic/teacher/${teacherId}?act=getMeta`)
        .then((resp: any) => {
          setUser(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (studentid) {
      axios
        .get(`/api/v1/dynamic/student/${studentid}?act=getMeta`)
        .then((resp: any) => {
          setUser(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [teacherId, studentid]);

  return  user ;
};
