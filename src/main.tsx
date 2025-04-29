// src/main.tsx  (oder index.tsx)
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

const queryClient = new QueryClient();   // ← 1× für die ganze App

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
