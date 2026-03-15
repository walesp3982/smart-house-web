"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Priorizando desarrollo en modo dark,
    primary: {
      main: "#7c8cf8", // azul/violeta suave, visible sobre fondos oscuros
    },
    secondary: {
      main: "#f48fb1", // rosa suave
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ffa726",
    },
    success: {
      main: "#66bb6a",
    },
    info: {
      main: "#29b6f6",
    },
    background: {
      default: "#0f1117", // fondo del body, muy oscuro
      paper: "#1a1d27", // fondo de Cards, Dialogs, Paper
    },
    text: {
      primary: "#e2e8f0", // texto principal, blanco suave
      secondary: "#94a3b8", // texto secundario, gris claro
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  cssVariables: true,
  // colorSchemes: {
  //   light: {
  //     // TODO: Revisar si se puede integrar
  //     palette: {
  //       mode: "light",
  //       primary: {
  //         main: "#1976d2",
  //       },
  //     },
  //   },
  //   dark: {
  //     palette: {
  //       mode: "dark",
  //       primary: {
  //         main: "#90caf9",
  //       },
  //     },
  //   },
  // },
});

export default theme;
