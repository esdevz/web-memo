import ReactDom from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";

ReactDom.render(
  <ChakraProvider resetCSS theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
