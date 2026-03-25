'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const images = [
  { id: 1, src: '/images/img1.png',  alt: 'Img1' },
  { id: 2, src: '/images/img2.png',  alt: 'Img2' },
  { id: 3, src: '/images/img3.png',  alt: 'Img3' },
  { id: 4, src: '/images/img4.png',  alt: 'Img4' },
  { id: 5, src: '/images/img5.png',  alt: 'Img5' },
];

// Duplicamos las imágenes para que el loop sea infinito y sin cortes
const loopImages = [...images, ...images, ...images];

const ImageCarousel = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, overflow: 'hidden' }}>
      <Container maxWidth="lg" disableGutters>

        {/* Cinta deslizante */}
        <Box
          sx={{
            overflow: 'hidden',
            width: '100%',
            // Pausa al hover
            '&:hover .track': { animationPlayState: 'paused' },
          }}
        >
          <Box
            className="track"
            sx={{
              display: 'flex',
              gap: '8px',
              width: 'max-content',
              animation: 'scroll-left 18s linear infinite',
              '@keyframes scroll-left': {
                '0%':   { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-33.333%)' },
              },
            }}
          >
            {loopImages.map((img, index) => (
              <Box
                key={index}
                onClick={() => setSelectedImg(img)}
                sx={{
                  cursor: 'zoom-in',
                  flexShrink: 0,
                  width: { xs: '220px', sm: '280px', md: '320px' },
                  overflow: 'hidden',
                  '&:hover img': { transform: 'scale(1.05)' },
                }}
              >
                <Box
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  sx={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Typography sx={{ mt: 2, ml: 2, fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
          IMAGENES
        </Typography>
      </Container>

      {/* Modal — imagen ampliada */}
      <Modal open={!!selectedImg} onClose={() => setSelectedImg(null)}>
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
          }}
          onClick={() => setSelectedImg(null)}
        >
          <IconButton
            onClick={() => setSelectedImg(null)}
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

          {selectedImg && (
            <Box
              component="img"
              src={selectedImg.src}
              alt={selectedImg.alt}
              onClick={(e) => e.stopPropagation()}
              sx={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: 1,
                boxShadow: 24,
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageCarousel;