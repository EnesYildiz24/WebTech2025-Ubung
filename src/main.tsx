// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing"; // falls ihr es noch nutzt
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  release: import.meta.env.VITE_APP_VERSION, 
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});

const queryClient = new QueryClient();
const container = document.getElementById("root")!;

createRoot(container).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Ups! Da ist etwas schiefgelaufen.</p>}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
