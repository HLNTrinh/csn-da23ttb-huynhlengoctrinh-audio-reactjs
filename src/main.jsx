import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { RecommendProvider } from "./context/RecommendContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecommendProvider>
      <App />
    </RecommendProvider>
  </React.StrictMode>
);
