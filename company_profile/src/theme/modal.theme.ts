import { createTheme } from "flowbite-react";

const modalTheme = createTheme({
  modal: {
    header: {
      base: "dark:bg-[#111827]",
    },
    body: {
      base: "overflow-y-auto dark:bg-[#111827]",
    },
    footer: {
      base: "dark:bg-[#111827]",
    },
  },
});

export default modalTheme;
