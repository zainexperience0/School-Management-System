import { nanoid } from "nanoid";

export const prePath = "main";

export const searchTypes = ["email", "name", "phone", "phone"];

export const allModels = [
  {
    name: "Users",
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
        backend: ["findFirst","findUnique","create","update","delete", "findMany"],
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
        frontend: ["list", "view", "update", "delete"],
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
  {
    name: "Student",
    model: "student",
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
        name: "Reg No",
        slug: "registrationNumber",
        type: "textInput",
        defaultValue: nanoid(6),
        required: true, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: ["findFirst","findUnique","findMany","create","update","delete"],
        frontend: ["list","view","update","delete","create"],
        valueGetter: () => {
          return nanoid(6)
        }
      },
      {
        name: "Roll No",
        slug: "rollNumber",
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
        backend: ["findFirst","findUnique","create","update","delete", "findMany"],
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
        name: "Date of Birth",
        slug: "dob",
        type: "dateInput",
        defaultValue: new Date(),
        required: false, // tells whether this field is required in UI inputs
        dataType: "string", // Schema datatype mapping
        customClassName: "",
        backend: [
          "findFirst",
          "findUnique",
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return new Date();
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
        name: "Gender",
        slug: "gender",
        type: "selectInput",
        options: ["Male", "Female", "Other"],
        defaultValue: "Other",
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
        frontend: ["list", "view", "update", "delete"],
        valueGetter: () => {
          return "Other";
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
        frontend: ["list", "view", "update", "delete"],
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
  {
    name: "Class",
    model: "class",
    meta: {
      title: "name",
    },
    updateField: "updatedAt",
    searchConfig: {
      searchFields: ["name"],
      sortBy: "desc",
      sortField: "createdAt",
    },
    fields: [
      {
        name: "Name",
        slug: "name",
        type: "textInput",
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
        name: "Student",
        slug: "students",
        type: "relation",
        defaultValue: "",
        required: true,
        dataType: "relation",
        customClassName: "",
        backend: ["findFirst","findUnique","findMany","create","update","delete"],
        frontend: [],
        valueGetter: () => {
          return "";
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


export const LoginSchema = [
  {
    name: "ADMIN",
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
          "create",
          "update",
          "delete",
        ],
        frontend: ["list", "view", "update", "delete", "create"],
        valueGetter: () => {
          return "";
        },
      },
    ],
  },
]