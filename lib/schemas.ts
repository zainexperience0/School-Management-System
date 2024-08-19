import { nanoid } from "nanoid";

export const prePath = "main";

export const searchTypes = ["email", "name", "phone", "phone"];

export const allModels = [
  {
    name: "Teachers",
    model: "teacher",
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
        name: "Qualification",
        slug: "qualification",
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
        slug: "regId",
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
        name: "Social Links",
        slug: "socialLinks",
        type: "",
        defaultValue: [],
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
          return [];
        },
      },
      {
        name: "Education",
        slug: "education",
        type: "markdownInput",
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
        name: "Description",
        slug: "descriptiton",
        type: "markdownInput",
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
        name: "Duration",
        slug: "duration",
        type: "numberInput",
        defaultValue: 0,
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
          return 0;
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
    name: "Lecture",
    model: "lecture",
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
        name: "Content",
        slug: "content",
        type: "markdownInput",
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
        name: "Duration",
        slug: "duration",
        type: "numberInput",
        defaultValue: 0,
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
          return 0;
        },
      },
      {
        name: "class",
        slug: "class",
        type: "relation",
        defaultValue: "",
        required: true,
        dataType: "relation",
        customClassName: "",
        backend: ["findMany", "findUnique", "create"],
        frontend: ["list", "view"],
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
  {
    name: "Tasks",
    model: "task",
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
        name: "Content",
        slug: "content",
        type: "markdownInput",
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
        name: "Acceptance Criteria",
        slug: "delieveryCreteria",
        type: "markdownInput",
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
        name: "Lectures",
        slug: "lecture",
        type: "relation",
        defaultValue: "",
        required: true,
        dataType: "relation",
        customClassName: "",
        backend: ["findMany", "findUnique", "create"],
        frontend: ["list", "view"],
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