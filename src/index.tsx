import "@fontsource/raleway";
import React from "react";
import ReactDom from "react-dom";
import InitApp from "./components/main/InitApp";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";
ReactDom.render(
  <ChakraProvider resetCSS theme={theme}>
    <InitApp>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </InitApp>
  </ChakraProvider>,
  document.getElementById("root")
);
