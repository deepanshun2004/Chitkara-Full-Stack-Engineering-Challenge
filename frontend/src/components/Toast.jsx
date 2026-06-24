import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export function Toast({ toast }) {
  if (!toast) {
    return null;
  }

  const Icon = toast.type === "error" ? XCircle : CheckCircle2;

  return (
    <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
      <Icon size={18} />
      <span>{toast.message}</span>
    </div>
  );
}
