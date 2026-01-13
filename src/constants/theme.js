// theme.js
import { createTheme } from "@mui/material/styles";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // ------- LIGHT MODE -------
          primary: {
            main: "#2563EB", // Blue
            light: "#3B82F6",
            dark: "#1E3A8A",
            contrastText: "#5f3535ff",
          },
          secondary: {
            main: "#9c27b0", // Purple
            contrastText: "#ffffff",
          },
          background: {
            default: "#F9FAFB", // Page background
            paper: "#ffffff",   // Card background
          },
          text: {
            primary: "#111827", // Dark text
            secondary: "#4B5563", // Muted text
          },
        }
      : {
          // ------- DARK MODE -------
          primary: {
            main: "#60A5FA", // Lighter blue
            light: "#93C5FD",
            dark: "#1E3A8A",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#CE93D8", // Purple
          },
          background: {
            default: "#0f172a", // Page background (slate-900)
            paper: "#1e293b",   // Card background (slate-800)
          },
          text: {
            primary: "#F9FAFB", // White text
            secondary: "#CBD5E1", // Gray text
          },
        }),
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h1: { fontWeight: 700, fontSize: "2.25rem", letterSpacing: "-0.02em" },
    h2: { fontWeight: 600, fontSize: "1.875rem" },
    h3: { fontWeight: 600, fontSize: "1.5rem" },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12, // Rounded corners everywhere
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "8px 20px",
          fontWeight: 600,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: "1rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: mode === "light" ? "#ffffff" : "#1e293b",
          color: mode === "light" ? "#111827" : "#F9FAFB",
          boxShadow: "none",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export const createAppTheme = (mode = "light") => createTheme(getDesignTokens(mode));
