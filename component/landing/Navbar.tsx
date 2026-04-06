"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface RedirectsNavbar {
  onClickLogin: () => void;
  onClickRegister: () => void;
}

export default function Navbar({
  onClickLogin,
  onClickRegister,
}: RedirectsNavbar) {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#e0e0e0",
        color: "#000",
        boxShadow: "none",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight={700}>
          smart-house-web
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="text"
            sx={{ color: "#000", fontWeight: 600, textDecoration: "underline" }}
            onClick={onClickRegister}
          >
            Registrarse
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#222" },
            }}
            onClick={onClickLogin}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
