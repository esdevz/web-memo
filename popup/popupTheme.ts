import { extendTheme, Theme } from "@chakra-ui/react";

const FormLabel = {
  baseStyle: {
    fontWeight: "500",
    fontFamily: "Raleway",
  },
};
const theme = extendTheme<Theme>({
  components: {
    FormLabel,
    Button: FormLabel,
  },
  fontSizes: {
    xs: "0.6em",
    sm: "0.75em",
    md: "1em",
    lg: "1.1em",
    xl: "1.2em",
  },
  styles: {
    global: {
      h3: {
        fontSize: "1em",
        fontWeight: "500",
        fontFamily: "Raleway",
      },
      em: {
        fontSize: "xs",
      },
    },
  },
});

export default theme;
