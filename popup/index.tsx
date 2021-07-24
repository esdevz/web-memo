import "@fontsource/raleway";
import ReactDom from "react-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Popup from "./components/Popup";
import theme from "./popupTheme";

ReactDom.render(
  <ChakraProvider theme={theme} resetCSS>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Popup />
  </ChakraProvider>,
  document.getElementById("root")
);
