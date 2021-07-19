import "@fontsource/raleway";
import ReactDom from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Popup from "./components/Popup";
import theme from "./popupTheme";

ReactDom.render(
  <ChakraProvider theme={theme} resetCSS>
    <Popup />
  </ChakraProvider>,
  document.getElementById("root")
);
