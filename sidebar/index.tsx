import "@fontsource/raleway/variable.css";
import "@fontsource/raleway/variable-italic.css";
import "@fontsource/rubik/variable.css";
import "@fontsource/rubik/variable-italic.css";
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
