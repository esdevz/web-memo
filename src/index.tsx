import "@fontsource/raleway";
import "@fontsource/montserrat";
import ReactDom from "react-dom";
import App from "./App";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import "./index.css";
import InitApp from "./components/main/InitApp";

ReactDom.render(
  <ChakraProvider resetCSS theme={theme}>
    <InitApp>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </InitApp>
  </ChakraProvider>,
  document.getElementById("root")
);
