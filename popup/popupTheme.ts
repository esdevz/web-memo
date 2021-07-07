import { extendTheme, Theme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});
const FormLabel = {
  baseStyle: {
    fontWeight: "500",
    fontFamily: "Raleway",
  },
};
const theme = extendTheme<Theme>({
  breakpoints,
  components: {
    FormLabel,
    Button: FormLabel,
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
