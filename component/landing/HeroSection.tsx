"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const HeroSection = () => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        textAlign: "center",
        backgroundColor: "#000", // ← fondo negro
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.5rem" },
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
          sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }} // ← texto blanco
        >
          &quot;Automatiza tu hogar con comandos de voz. Seguridad, confort y
          eficiencia en un solo lugar.&quot;
        </Typography>
      </Container>
    </Box>
  );
};

export default HeroSection;
