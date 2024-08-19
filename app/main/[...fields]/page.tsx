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

const DynamicPage = ({ params, searchParams }: any) => {
  const dynamicParameters = params.fields;
  const model = dynamicParameters[0];
  const action = dynamicParameters[1];
  const fieldId = dynamicParameters[2];

  const deleteFieldKey = searchParams?.deletekey;

  if (action === "view" && model === "class") {
    return <ViewClass modelSlug={model} id={fieldId} />;
  }

  if (fieldId && !["edit", "delete"].includes(action)) {
    return <ViewField modelSlug={model} id={fieldId} />;
  }

  if (action) {
    switch (action) {
      case "create":
        if (model === "admin") {
          return (
            <RegisterAdmin
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        } else if (model === "lecture") {
          return (
            <CreateLecture
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        } else if (model && !["admin", "teacher"].includes(model)) {
          return (
            <CreateField
              model={allModels.find((m) => m.model === model)}
              page={true}
            />
          );
        }
        break;

      case "edit":
        return (
          <EditField
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
          />
        );

      case "delete":
        return (
          <DeleteField
            modelSlug={model}
            id={fieldId}
            field={deleteFieldKey}
          />
        );

      default:
        return null;
    }
  }

  if (model === "teacher") {
    return <AdminPanel modelSlug={model} />;
  }

  return null; // Fallback if no conditions are met
};

export default DynamicPage;
