import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./app";

import "./styles/index.scss";
const rootElem = document.getElementById("root")!;

createRoot(rootElem).render(
  <StrictMode>
    <App />
  </StrictMode>
);
