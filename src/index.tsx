import "@fontsource/raleway";
import ReactDom from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";
import InitApp from "./components/main/InitApp";

ReactDom.render(
  <ChakraProvider resetCSS theme={theme}>
    <InitApp>
      <App />
    </InitApp>
  </ChakraProvider>,
  document.getElementById("root")
);
