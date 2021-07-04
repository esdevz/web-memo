import ReactDom from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Popup from "./Popup";

ReactDom.render(
  <ChakraProvider resetCSS>
    <Popup />
  </ChakraProvider>,
  document.getElementById("root")
);
