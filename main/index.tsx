import "@fontsource/raleway";
import React from "react";
import { createRoot } from "react-dom/client";
import InitApp from "./components/main/InitApp";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ChakraProvider resetCSS theme={theme}>
    <InitApp>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </InitApp>
  </ChakraProvider>
);
