import "@fontsource-variable/raleway";
import "@fontsource-variable/rubik";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import theme from "./SidebarTheme";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ChakraProvider theme={theme} resetCSS>
    <Sidebar />
  </ChakraProvider>
);
