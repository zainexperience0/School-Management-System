"use client";

import { RegisterAdmin } from "@/components/models/teacher/Create";
import { AdminPanel } from "@/components/models/teacher/List";
import { ViewClass } from "@/components/models/class/View";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ViewField } from "@/components/models/viewField";
import { allModels } from "@/lib/schemas";
import { CreateLecture } from "@/components/models/lecture/create";
import { CreateTasks } from "@/components/models/tasks/create";
import { RegisterStudent } from "@/components/models/student/Create";
import { CreateClass } from "@/components/models/class/Create";
import { ViewLecture } from "@/components/models/lecture/View";
import { CreateStudentsInClasses } from "@/components/models/class/classStudents/Create";
import { ViewStudentInClass } from "@/components/models/class/classStudents/View";
import { FeeCreate } from "@/components/models/class/classStudents/fee/Create";
import { LectureCompleteCreate } from "@/components/models/class/classStudents/completed lectures/Create";
import { ViewLectureCompleted } from "@/components/models/class/classStudents/completed lectures/View";
import { TaskCompleteCreate } from "@/components/models/class/classStudents/completed lectures/taskCompleted/Create";
import { TeacherEdit } from "@/components/models/teacher/Edit";
import { ClassEdit } from "@/components/models/class/Edit";

const DynamicPage = ({ params, searchParams }: any) => {
  const dynamicParameters = params.fields || [];
  const model = dynamicParameters[0];
  const action = dynamicParameters[1];
  const fieldId = dynamicParameters[2];

  const deleteFieldKey = searchParams?.deletekey;

  switch (action) {
    case "view":
      if (model === "class") {
        return <ViewClass modelSlug={model} id={fieldId} />;
      }
      if (model === "lecture") {
        return <ViewLecture modelSlug={model} id={fieldId} />;
      }
      if (model === "classToStudent") {
        return <ViewStudentInClass modelSlug={model} id={fieldId} />;
      }
      if (model === "lectureCompleted") {
        return <ViewLectureCompleted modelSlug={model} id={fieldId} />;
      }
      if (fieldId && !["edit", "delete"].includes(action)) {
        return <ViewField modelSlug={model} id={fieldId} />;
      }

      break;

    case "create":
      switch (model) {
        case "teacher":
          return (
            <RegisterAdmin
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        case "lecture":
          return (
            <CreateLecture
            classId={searchParams?.classId}
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        case "classToStudent":
          return (
            <CreateStudentsInClasses
              id={searchParams?.classId}
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
          case "taskCompleted":
            return (
              <TaskCompleteCreate
                id={searchParams?.lectureCompleted}
                model={allModels.find((m) => m.model === model)}
                page={true}
              />
            );
        case "student":
          return (
            <RegisterStudent
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        case "task":
          return (
            <CreateTasks
            lecture_id={searchParams?.lectureId}
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
          case "lectureCompleted":
            return (
              <LectureCompleteCreate
              student_id={searchParams?.student_id}
                model={allModels.find((m) => m.model === model)}
                page={true}
              />
            );
        case "class":
          return (
            <CreateClass
            classId={searchParams?.classId}
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        case "fee":
          return (
            <FeeCreate
            student_id={searchParams?.student_id}
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        default:
          if (
            model &&
            !["teacher", "class", "lecture", "student", "task"].includes(model)
          ) {
            return (
              <CreateField
                model={allModels.find((m) => m.model === model)}
                page={true}
              />
            );
          }
          break;
      }
      break;

    case "edit":
      switch (model) {
        case "teacher": 
        return (
          <TeacherEdit
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
            />
        )
        case "class": 
        return (
          <ClassEdit
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
            />
        )
      }

    case "delete":
      return (
        <DeleteField modelSlug={model} id={fieldId} field={deleteFieldKey} />
      );

    default:
      if (model === "teacher") {
        return <AdminPanel modelSlug={model} />;
      }
      break;
  }

  return null; // Fallback if no conditions are met
};

export default DynamicPage;
