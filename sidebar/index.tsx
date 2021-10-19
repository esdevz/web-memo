import "@fontsource/raleway";
import React from "react";
import ReactDom from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import theme from "./SidebarTheme";

ReactDom.render(
  <ChakraProvider theme={theme} resetCSS>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Sidebar />
  </ChakraProvider>,
  document.getElementById("root")
);
