import Box from '@mui/material/Box';
import Navbar from '@/component/landing/Navbar';
import HeroSection from '@/component/landing/HeroSection';
import ImageCarousel from '@/component/landing/ImageCarousel';
import CTASection from '@/component/landing/CTASection';

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#000' }}>
      <Navbar />
      <HeroSection />
      <ImageCarousel />
      <CTASection />
    </Box>
  );
}

