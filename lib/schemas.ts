import { nanoid } from "nanoid";

export const prePath = "main";

export const searchTypes = ["email", "name", "phone", "phone"];

export const allModels = [
  {
    name: "Admins",
    model: "admin",
    meta: {
      title: "username",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["username"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Name",
        slug: "name",
        type: "textInput",
        defaultValue: "",
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: ["findFirst","findUnique","findMany","create","update","delete"],
        frontend: ["list","view","update","delete","create"],
        valueGetter: () => {
          return ""
        }
      },
      {
        name: "Username",
        slug: "username",
        type: "textInput",
        defaultValue: "",
        required: false,
        dataType: "string",
        customClassName: "",
        backend: ["findFirst","findUnique","create","update","delete"],
        frontend: ["list","view","update","delete"],
        valueGetter: () => {
          return ""
        }
      },
      {
        name: "Email",
        slug: "email",
        type: "emailInput",
        defaultValue: "",
        required: false,
        dataType: "string",
        customClassName: "",
        backend: ["findFirst","findUnique","findMany","create","update","delete"],
        frontend: ["list","view","update","delete","create"],
        valueGetter: () => {
          return ""
        }
      },
      {
        name: "Password",
        slug: "password",
        type: "passwordInput",
        defaultValue: "",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Phone",
        slug: "phone",
        type: "phoneInput",
        defaultValue: "",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Address",
        slug: "address",
        type: "textInput",
        defaultValue: "",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
      {
        name: "Image",
        slug: "image",
        type: "textInput",
        defaultValue: "https://github.com/shadcn.png",
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "findMany",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "https://github.com/shadcn.png";
        },
      },
      {
        name: "Created At",
        slug: "createdAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst","findUnique","findMany"],
        frontend: ["list","view"],
        valueGetter: () => {
          return ""
        }
      },
      {
        name: "Updated At",
        slug: "updatedAt",
        type: "",
        defaultValue: "",
        required: false,
        dataType: "time",
        customClassName: "",
        backend: ["findFirst","findUnique","findMany"],
        frontend: ["list","view"],
        valueGetter: () => {
          return ""
        }
      },
    ],
  },
];