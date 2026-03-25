"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Priorizando desarrollo en modo dark
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


