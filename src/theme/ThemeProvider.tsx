"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo, useEffect } from "react"
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material"
import type { PaletteMode } from "@mui/material"
import { createAppTheme } from "./index"

// Theme context type
interface ThemeContextType {
  mode: PaletteMode
  toggleColorMode: () => void
}

// Create theme context
const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
})

// Custom hook to use theme context
export const useThemeContext = () => useContext(ThemeContext)

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get initial theme from localStorage or default to light
  const [mode, setMode] = useState<PaletteMode>("light")

  // Initialize theme from localStorage on client-side only
  useEffect(() => {
    const savedMode = localStorage?.getItem("themeMode")
    if (savedMode) {
      setMode(savedMode as PaletteMode)
    }
  }, [])

  // Toggle theme function
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  // Save theme preference to localStorage (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("themeMode", mode)
    }
  }, [mode])

  // Memoize theme to prevent unnecessary re-renders
  const theme = useMemo(() => createAppTheme(mode), [mode])

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

