import { createTheme, responsiveFontSizes, type Theme, type ThemeOptions } from "@mui/material/styles"
import type { PaletteMode } from "@mui/material"

// Define color palette tokens
const tokens = {
  grey: {
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  primary: {
    100: "#d1e9ff",
    200: "#a3d3ff",
    300: "#75bcff",
    400: "#47a6ff",
    500: "#1976d2", // Main primary color
    600: "#1565c0",
    700: "#0d47a1",
    800: "#0a2f6b",
    900: "#051834",
  },
  secondary: {
    100: "#f8dbd0",
    200: "#f1b7a1",
    300: "#e99473",
    400: "#e27044",
    500: "#ff5722", // Main secondary color
    600: "#d84315",
    700: "#bf360c",
    800: "#7f2408",
    900: "#3f1204",
  },
  success: {
    100: "#e8f5e9",
    500: "#4caf50",
    900: "#1b5e20",
  },
  error: {
    100: "#ffebee",
    500: "#f44336",
    900: "#b71c1c",
  },
  warning: {
    100: "#fff8e1",
    500: "#ff9800",
    900: "#e65100",
  },
  info: {
    100: "#e3f2fd",
    500: "#2196f3",
    900: "#0d47a1",
  },
}

// Theme configuration
const themeConfig = (mode: PaletteMode): ThemeOptions => {
  const isLight = mode === "light"

  return {
    palette: {
      mode,
      primary: {
        main: tokens.primary[500],
        light: tokens.primary[300],
        dark: tokens.primary[700],
        contrastText: "#ffffff",
      },
      secondary: {
        main: tokens.secondary[500],
        light: tokens.secondary[300],
        dark: tokens.secondary[700],
        contrastText: "#ffffff",
      },
      success: {
        main: tokens.success[500],
        light: tokens.success[100],
        dark: tokens.success[900],
      },
      error: {
        main: tokens.error[500],
        light: tokens.error[100],
        dark: tokens.error[900],
      },
      warning: {
        main: tokens.warning[500],
        light: tokens.warning[100],
        dark: tokens.warning[900],
      },
      info: {
        main: tokens.info[500],
        light: tokens.info[100],
        dark: tokens.info[900],
      },
      background: {
        default: isLight ? tokens.grey[100] : tokens.grey[900],
        paper: isLight ? "#ffffff" : tokens.grey[800],
      },
      text: {
        primary: isLight ? tokens.grey[900] : tokens.grey[100],
        secondary: isLight ? tokens.grey[700] : tokens.grey[300],
      },
      divider: isLight ? tokens.grey[300] : tokens.grey[700],
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
        fontSize: "2.5rem",
      },
      h2: {
        fontWeight: 500,
        fontSize: "2rem",
      },
      h3: {
        fontWeight: 500,
        fontSize: "1.75rem",
      },
      h4: {
        fontWeight: 500,
        fontSize: "1.5rem",
      },
      h5: {
        fontWeight: 500,
        fontSize: "1.25rem",
      },
      h6: {
        fontWeight: 500,
        fontSize: "1rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 4,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            boxShadow: isLight ? "0px 2px 4px rgba(0, 0, 0, 0.05)" : "0px 2px 4px rgba(0, 0, 0, 0.15)",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "12px 16px",
          },
        },
      },
    },
    shape: {
      borderRadius: 4,
    },
  }
}

// Create theme with responsive font sizes
export const createAppTheme = (mode: PaletteMode): Theme => {
  let theme = createTheme(themeConfig(mode))
  theme = responsiveFontSizes(theme)
  return theme
}

