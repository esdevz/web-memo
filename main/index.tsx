import "@fontsource/raleway/variable.css";
import "@fontsource/raleway/variable-italic.css";
import "@fontsource/rubik/variable.css";
import "@fontsource/rubik/variable-italic.css";
import React from "react";
import { createRoot } from "react-dom/client";
import InitApp from "./components/main/InitApp";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <ChakraProvider resetCSS theme={theme}>
    <InitApp>
      <App />
    </InitApp>
  </ChakraProvider>
);
