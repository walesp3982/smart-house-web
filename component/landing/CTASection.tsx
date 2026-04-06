'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';

// ─── Pon aquí la ruta de tu imagen, ej: '/images/img4.jpeg' ──────────────
const CTA_IMAGE_SRC = '/images/img2.png';
// ─────────────────────────────────────────────────────────────────────────

const CTASection = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="stretch">

          {/* Tarjeta izquierda */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                backgroundColor: '#2a2a2a',
                p: { xs: 4, md: 5 },
                height: '100%',
                minHeight: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',   // centra horizontalmente
                textAlign: 'center',    // centra el texto
              }}
            >
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: '#fff' }}>
                Únete a miles de hogares que ya controlan su casa con la voz.
                Configura luces, seguridad y temperatura desde cualquier lugar,
                en segundos.
              </Typography>

             <Button
                variant="contained"
                 size="large"
                    startIcon={<HomeIcon />}
                    sx={{
                    mt: 4,
                    backgroundColor: '#fff',
                    color: '#000',
                     fontWeight: 700,
                    px: 4,
                    '&:hover': { backgroundColor: '#ddd' },
                }}
>
                Empieza gratis
                </Button>
            </Box>
          </Grid>

          

          {/* Imagen derecha — clic para agrandar */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              onClick={() => setOpen(true)}
              sx={{
                position: 'relative',
                width: '100%',
                minHeight: 320,
                cursor: 'zoom-in',
                overflow: 'hidden',
                '&:hover img': { transform: 'scale(1.04)' },
              }}
            >
              <Box
                component="img"
                src={CTA_IMAGE_SRC}
                alt="CTA imagen"
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: 320,
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* Modal — imagen ampliada */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
          }}
          onClick={() => setOpen(false)}
        >
          {/* Botón cerrar */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              color: '#fff',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={CTA_IMAGE_SRC}
            alt="CTA imagen ampliada"
            onClick={(e) => e.stopPropagation()}
            sx={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 1,
              boxShadow: 24,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default CTASection;