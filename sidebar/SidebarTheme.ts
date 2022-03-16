import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { themeColorPalette } from "../utils";

const FormLabel = {
  baseStyle: {
    fontWeight: "500",
    fontFamily: "Raleway",
  },
};

const Button = {
  sizes: {
    xs: {
      h: "4ch",
      w: "4ch",
      fontSize: "sm",
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    FormLabel,
    Button: Button,
  },
  colors: {
    bb: {
      ...themeColorPalette([
        "#D8E6F4",
        "#B9D0E5",
        "#A1BBD5",
        "#8CA9C4",
        "#7C98B3",
        "#6188AD",
        "#4A79A6",
        "#3A6C9C",
        "#2B6093",
      ]),
    },
  },
  fontSizes: {
    xs: "0.7rem",
    sm: "0.8rem",
    md: "0.9rem",
    lg: "1.1rem",
    xl: "1.2rem",
  },
  styles: {
    global: {
      h3: {
        fontSize: "sm",
        fontWeight: "400",
        fontFamily: "Raleway",
      },
      em: {
        fontSize: "xs",
      },
      "::selection": {
        backgroundColor: "rgb(130,130,130,0.5)",
      },
    },
  },
});

export default theme;
