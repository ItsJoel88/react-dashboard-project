export default function getMenus() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          name: "Form Edit",
          path: "/form/edit",
          children: [],
        },
        {
          name: "Login",
          path: "/login",
          children: [],
        },
        {
          name: "Input",
          path: "/input",
          children: [],
        },
        {
          name: "Form Create",
          path: "/form/create",
          children: [],
        },
      ]);
    }, 400);
  });
}
