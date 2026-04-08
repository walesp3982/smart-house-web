"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const HeroSection = () => {
  return (
    <Box
      sx={{
        pt: { xs: 10, md: 12, sm: 13 },
        pb: { xs: 10, md: 12, sm: 13 },
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)", // ← fondo negro
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "4rem", sm: "5rem", md: "6rem" },
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            mb: 4,
            color: "#fff", // ← texto blanco
          }}
        >
          &quot;Controla todo. Con solo hablar.&quot;
        </Typography>

        <Typography
          component="p"
          sx={{ fontWeight: 700, fontSize: "1.5rem", color: "#ffffffc9" }} // ← texto blanco
        >
          &quot;Automatiza tu hogar con comandos de voz. Seguridad, confort y
          eficiencia en un solo lugar.&quot;
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;
