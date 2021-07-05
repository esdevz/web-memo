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
});

export default theme;
