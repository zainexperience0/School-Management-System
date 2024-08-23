import axios from "axios";
import { useEffect, useState } from "react";

export const useMainData = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          studentsResp,
          teachersResp,
          classesResp,
        ] = await Promise.all([
          axios.get("/api/v1/dynamic/student"),
          axios.get("/api/v1/dynamic/teacher"),
          axios.get("/api/v1/dynamic/class"),
        ]);

        setStudents(studentsResp.data);
        setTeachers(teachersResp.data);
        setClasses(classesResp.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    students,
    teachers,
    classes,
    loading,
    error,
  };
};
