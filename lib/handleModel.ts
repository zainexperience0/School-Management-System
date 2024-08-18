export const handleModal = (model: any, select: any, act: any) => {
  let defaultSelect = { ...select };
  if (model === "class") {
    if (defaultSelect?.student) {
      defaultSelect["student"] = {
        select: {
          name: true,
          id: true,
        },
      };
      return defaultSelect;
    }

    return defaultSelect;
  } else {
    return defaultSelect;
  }
};
