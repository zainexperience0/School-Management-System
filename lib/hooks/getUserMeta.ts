import { useEffect, useState } from "react";
import axios from "axios";
import { useReadLocalStorage } from "usehooks-ts";

export const useGetUserMeta = () => {
  const teacherId = useReadLocalStorage("teacherId");
  const studentid = useReadLocalStorage("studentId");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>({});
  useEffect(() => {
    setLoading(true);
    if (teacherId) {
      axios
        .get(`/api/v1/dynamic/teacher/${teacherId}?act=getMeta`)
        .then((resp: any) => {
          setUser(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
    if (studentid) {
      axios
        .get(`/api/v1/dynamic/student/${studentid}?act=getMeta`)
        .then((resp: any) => {
          setUser(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [teacherId, studentid]);

  return  {
    user,
    loading
  } ;
};
