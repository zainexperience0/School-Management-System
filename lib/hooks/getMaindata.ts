import axios from "axios";
import { useEffect, useState } from "react";

export const useMainData = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [lectures, setLectures] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [lecturesCompleted, setLecturesCompleted] = useState<any[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<any[]>([]);
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
          lecturesResp,
          tasksResp,
          lecturesCompletedResp,
          tasksCompletedResp,
        ] = await Promise.all([
          axios.get("/api/v1/dynamic/student"),
          axios.get("/api/v1/dynamic/teacher"),
          axios.get("/api/v1/dynamic/class"),
          axios.get("/api/v1/dynamic/lecture"),
          axios.get("/api/v1/dynamic/task"),
          axios.get("/api/v1/dynamic/lectureCompleted"),
          axios.get("/api/v1/dynamic/taskCompleted"),
        ]);

        setStudents(studentsResp.data);
        setTeachers(teachersResp.data);
        setClasses(classesResp.data);
        setLectures(lecturesResp.data);
        setTasks(tasksResp.data);
        setLecturesCompleted(lecturesCompletedResp.data);
        setTasksCompleted(tasksCompletedResp.data);
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
    lectures,
    tasks,
    lecturesCompleted,
    tasksCompleted,
    loading,
    error,
  };
};
