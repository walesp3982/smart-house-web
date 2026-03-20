'use client'; 

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home'; 
import Link from 'next/link';

export default function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh', 
          textAlign: 'center',
          gap: 3 // Un poco más de espacio entre elementos
        }}
      >
        {/* Título en Azul con Sombra */}
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main', // Azul principal del tema
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', // Sombra sutil
            letterSpacing: '1px'
          }} 
          gutterBottom
        >
          PÁGINA NO ENCONTRADA
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, px: 2 }}>
          Parece que esta habitación no existe en tu Smart House 

        </Typography>

        {/* Botón Estilizado */}
        <Button
          variant="contained"
          component={Link}
          href="/"
          startIcon={<HomeIcon />}
          sx={{ 
            borderRadius: '50px', // Bordes más redondeados
            px: 5, 
            py: 1.5,
            fontWeight: 'bold',
            backgroundColor: 'primary.main', // Asegura el mismo azul
            boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.3)', // Sombra azulada
            '&:hover': {
              backgroundColor: 'primary.dark', // Azul más oscuro al pasar el mouse
              boxShadow: '0px 6px 15px rgba(25, 118, 210, 0.4)',
            }
          }}
        >
          Ir al Panel Central
        </Button>
      </Box>
    </Container>
  );
}