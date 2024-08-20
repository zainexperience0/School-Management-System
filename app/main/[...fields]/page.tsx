"use client";

import { RegisterAdmin } from "@/components/models/teacher/Create";
import { AdminPanel } from "@/components/models/teacher/List";
import { ViewClass } from "@/components/models/class/View";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
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
import { ListStudents } from "@/components/models/student/List";
import { EditStudent } from "@/components/models/student/Edit";
import { ViewStudent } from "@/components/models/student/View";
import { ViewTeacher } from "@/components/models/teacher/View";
import { ListClasses } from "@/components/models/class/List";
import { ListLecturesData } from "@/components/models/lecture/List";
import { ListTasks } from "@/components/models/tasks/List";
import { ListCompletedLectures } from "@/components/models/class/classStudents/completed lectures/List";
import { ListCompletedTasks } from "@/components/models/class/classStudents/completed lectures/taskCompleted/List";
import { ListStudentsFee } from "@/components/models/class/classStudents/fee/List";
import { TaskEdit } from "@/components/models/tasks/Edit";
import { TasksCompletedEdit } from "@/components/models/class/classStudents/completed lectures/taskCompleted/Edit";
import { FeeEdit } from "@/components/models/class/classStudents/fee/Edit";
import { LectureCompletedEdit } from "@/components/models/class/classStudents/completed lectures/Edit";
import { ClassToStudentEdit } from "@/components/models/class/classStudents/Edit";
import { LectureEdit } from "@/components/models/lecture/Edit";
import { ViewTaskCompleted } from "@/components/models/class/classStudents/completed lectures/taskCompleted/View";

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
      if (model === "teacher") {
        return <ViewTeacher modelSlug={model} id={fieldId} />;
      }
      if (model === "student") {
        return <ViewStudent modelSlug={model} id={fieldId} />;
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
      if (model === "taskCompleted") {
        return <ViewTaskCompleted modelSlug={model} id={fieldId} />;
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
              lectureCompletedId={searchParams?.lectureCompleted}
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
              lecture_id={searchParams?.lecture_id}
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
              student_id={searchParams?.classToStudentId}
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
          );
        case "lecture":
          return (
            <LectureEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "student":
          return (
            <EditStudent
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "taskCompleted":
          return (
            <TasksCompletedEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "classToStudent":
          return (
            <ClassToStudentEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "class":
          return (
            <ClassEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "task":
          return (
            <TaskEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "fee":
          return (
            <FeeEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
        case "lectureCompleted":
          return (
            <LectureCompletedEdit
              model={allModels.find((m) => m.model === model)}
              id={fieldId}
            />
          );
      }

      break;

    case "delete":
      return (
        <DeleteField modelSlug={model} id={fieldId} field={deleteFieldKey} />
      );

    default:
      if (model === "teacher") {
        return <AdminPanel modelSlug={model} />;
      }
      if (model === "student") {
        return <ListStudents modelSlug={model} />;
      }
      if (model === "class") {
        return <ListClasses modelSlug={model} />;
      }
      if (model === "lecture") {
        return <ListLecturesData modelSlug={model} />;
      }
      if (model === "task") {
        return <ListTasks modelSlug={model} />;
      }
      if (model === "lectureCompleted") {
        return <ListCompletedLectures modelSlug={model} />;
      }
      if (model === "taskCompleted") {
        return <ListCompletedTasks modelSlug={model} />;
      }
      if (model === "fee") {
        return <ListStudentsFee modelSlug={model} />;
      }
      break;
  }

  return null; // Fallback if no conditions are met
};

export default DynamicPage;
