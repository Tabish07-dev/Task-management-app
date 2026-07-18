"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        success: {
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid rgba(99, 102, 241, 0.35)",
          },
        },
        error: {
          style: {
            background: "#111827",
            color: "#fef2f2",
            border: "1px solid rgba(244, 63, 94, 0.35)",
          },
        },
      }}
    />
  );
}
