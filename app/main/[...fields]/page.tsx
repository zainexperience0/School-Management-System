"use client";
import { RegisterAdmin } from "@/components/models/admin/Create";
import { ListUsers } from "@/components/models/admin/List";
import { ListClasses } from "@/components/models/class/List";
import { ViewClass } from "@/components/models/class/View";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ViewField } from "@/components/models/viewField";
import { allModels } from "@/lib/schemas";

const DynamicPage = ({ params, searchParams }: any) => {
  const dynamicParamaters = params.fields;
  const model = dynamicParamaters[0];
  const action = dynamicParamaters[1];
  const fieldId = dynamicParamaters[2];

  const deletefieldKey = searchParams?.deletekey;

  // Render only the ViewClass component if the action is "view" and the model is "class"
  if (action === "view" && model === "class") {
    return (
      <ViewClass
        modelSlug={model}
        id={fieldId}
      />
    );
  }

  if (fieldId && !["edit", "delete"].includes(action)) {
    return <ViewField modelSlug={model} id={fieldId} />;
  } else if (action) {
    return (
      <div>
        {action === "create" && model !== "admin" && (
          <CreateField
            model={allModels.find((m) => m.model === model)}
            page={true}
          />
        )}
        {action === "create" && model === "admin" && (
          <RegisterAdmin
            model={allModels.find((m) => m.model === model)}
            page={true}
          />
        )}
        {action === "edit" && (
          <EditField
            model={allModels.find((m) => m.model === model)}
            id={fieldId}
          />
        )}
        {action === "delete" && (
          <DeleteField modelSlug={model} id={fieldId} field={deletefieldKey} />
        )}
      </div>
    );
  } else if (model) {
    return (
      <div>
        {model === "admin" && <ListUsers modelSlug={model} />}
      </div>
    );
  }

  return null; // Fallback if no conditions are met
};

export default DynamicPage;
