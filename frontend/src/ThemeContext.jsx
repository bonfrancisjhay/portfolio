// src/ThemeContext.jsx
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true); // default: dark

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={dark ? "dark" : "light"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Custom hook — import this in any component
export function useTheme() {
  return useContext(ThemeContext);
}