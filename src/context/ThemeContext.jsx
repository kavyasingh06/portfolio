import { createContext, useContext, useState, useEffect } from "react";
import themes from "../config/themes";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const [palette, setPalette] = useState("midnight");

  // Reset palette if it doesn't exist in the new mode
  useEffect(() => {
    if (!themes[mode][palette]) {
      setPalette(Object.keys(themes[mode])[0]);
    }
  }, [mode, palette]);

  const t = themes[mode]?.[palette] || themes.light.cleanSlate;

  const toggleMode = () => setMode(m => (m === "light" ? "dark" : "light"));

  const value = {
    mode,
    setMode,
    palette,
    setPalette,
    toggleMode,
    t,
    palettes: themes[mode],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}