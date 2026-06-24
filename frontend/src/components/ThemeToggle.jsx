import React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button className="icon-button" type="button" onClick={onToggle} aria-label="Toggle theme" title="Toggle theme">
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
