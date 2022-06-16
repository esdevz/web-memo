const body = document.querySelector("body");
const colorMode = localStorage.getItem("chakra-ui-color-mode");

if (colorMode === "dark") {
  body.classList.add("clr-scheme-dark");
}
