import { useColorModeValue } from "@chakra-ui/react";

const colorsDark = [
  { name: "default", value: "inherit" },
  { name: "teal", value: "var(--chakra-colors-teal-700)" },
  { name: "blue", value: "var(--chakra-colors-bb-700)" },
  { name: "pink", value: "var(--chakra-colors-pink-700)" },
  { name: "yellow", value: "var(--chakra-colors-yellow-700)" },
  { name: "green", value: "var(--chakra-colors-whatsapp-700)" },
  { name: "gray", value: "var(--chakra-colors-gray-600)" },
];
const colorsLight = [
  { name: "default", value: "inherit" },
  { name: "teal", value: "var(--chakra-colors-teal-200)" },
  { name: "blue", value: "var(--chakra-colors-bb-200)" },
  { name: "pink", value: "var(--chakra-colors-pink-200)" },
  { name: "yellow", value: "var(--chakra-colors-yellow-200)" },
  { name: "green", value: "var(--chakra-colors-whatsapp-200)" },
  { name: "gray", value: "var(--chakra-colors-gray-200)" },
];

export function useHighLightColors() {
  const colorProps = useColorModeValue(colorsLight, colorsDark);

  return colorProps;
}
