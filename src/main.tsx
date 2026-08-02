import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import "./styles.css";
import PublicSettingsEffects from "./features/admin/settings/PublicSettingsEffects";

createRoot(document.getElementById("root")!).render(
  <StrictMode><BrowserRouter><ReactQueryProvider><PublicSettingsEffects/><App /></ReactQueryProvider></BrowserRouter></StrictMode>,
);
