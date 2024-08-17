"use client";
import { RegisterAdmin } from "@/components/models/admin/Create";
import { CreateField } from "@/components/models/createField";
import { DeleteField } from "@/components/models/DeleteField";
import { EditField } from "@/components/models/EditField";
import { ListModelData } from "@/components/models/listModelData";
import { ViewField } from "@/components/models/viewField";
import { allModels } from "@/lib/schemas";

// export function generateMetadata({ params }: any): any {
//   const dynamicParamaters = params.fields;
//   const model = dynamicParamaters[0];
//   return {
//     title: model.toUpperCase(),
//   };
// }

const DynamicPage = ({ params, searchParams }: any) => {
  const dynamicParamaters = params.fields;
  // console.log({dynamicParamaters});
  const model = dynamicParamaters[0];
  const action = dynamicParamaters[1];
  const fieldId = dynamicParamaters[2];
  console.log({ searchParams });

  const deletefieldKey = searchParams?.deletekey;

  if (fieldId && !["edit", "delete"].includes(action)) {
    return <ViewField modelSlug={model} id={fieldId} />;
  } else if (action) {
    return (
      <div>
        {action === "create" && model !== "admin" && <CreateField model={allModels.find((m) => m.model === model)} page={true} />}
        {action === "create" && model === "admin" && <RegisterAdmin model={allModels.find((m) => m.model === model)} page={true} />}
        {action === "edit" && <EditField model={allModels.find((m) => m.model === model)} id={fieldId} />}
        {action === "delete" && (
          <DeleteField modelSlug={model} id={fieldId} field={deletefieldKey} />
        )}
      </div>
    );
  } else if (model) {
    return (
      <div>
        {model === "admin" && <ListModelData modelSlug={model} />}
      </div>
    );
  }
};

export default DynamicPage;