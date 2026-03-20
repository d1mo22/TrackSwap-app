import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard.jsx";
import { LanguageProvider } from "./i18n/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <Dashboard />
    </LanguageProvider>
  </React.StrictMode>,
);
