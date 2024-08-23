import { allModels } from "./schemas";

export const handleModel = (
  select: any,
  model: any,
  act: any,
  purpose: any
) => {
  let defaultSelect = { ...select };

  if (!purpose) {
    if (model === "classToStudent") {
      if (defaultSelect?.student) {
        defaultSelect["student"] = {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        };
        return defaultSelect;
      }
    }
    if (model === "teacher" || model === "student") {
      if (act === "getMeta") {
        let dataSelect: any = {};
        dataSelect["id"] = true;
        dataSelect["name"] = true;
        dataSelect["email"] = true;
        dataSelect["image"] = true;
        return dataSelect;
      } else {
        defaultSelect["password"] = false;
      }
    }
    return defaultSelect;
  } else {
    if (purpose === "edit") {
      const newSelect: any = {};
      const filteredModel = allModels.find((m) => m.model === model);
      if (filteredModel?.fields) {
        filteredModel.fields
          ?.filter((field: any) => field.dataType !== "relation")
          ?.map((field) => {
            newSelect[field.slug] = true;
          });
        return newSelect;
      }
      return defaultSelect;
    }
  }
};
