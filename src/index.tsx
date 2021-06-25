import { StrictMode } from "react";
import ReactDom from "react-dom";
import App from "./App";
import "./index.css";

ReactDom.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
