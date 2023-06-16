import "@fontsource-variable/raleway";
import "@fontsource-variable/rubik";
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
