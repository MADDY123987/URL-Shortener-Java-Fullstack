import React, { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const THEME_KEY = "URL_SHORTNER_THEME";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // initial value: from localStorage or system preference
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;

    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });

  // apply to <html data-theme="...">
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 transition-colors"
      aria-label="Toggle dark / light mode"
    >
      {isDark ? (
        <>
          <MdOutlineLightMode className="text-yellow-300 text-lg" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <MdOutlineDarkMode className="text-slate-200 text-lg" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
