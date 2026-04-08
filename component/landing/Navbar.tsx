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
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight={500}>
          Casa inteligente
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Button
            variant="text"
            sx={{ color: "white" }}
            onClick={onClickRegister}
          >
            Registrarse
          </Button>
          <Button variant="contained" onClick={onClickLogin}>
            Iniciar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
