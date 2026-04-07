"use client";

import Box from "@mui/material/Box";
import Navbar from "@/component/landing/Navbar";
import HeroSection from "@/component/landing/HeroSection";
import ImageCarousel from "@/component/landing/ImageCarousel";
import CTASection from "@/component/landing/CTASection";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const onClickLogin = () => {
    router.push("login");
  };
  const onClickRegister = () => {
    router.push("register");
  };

  return (
    <Box>
      <Navbar onClickLogin={onClickLogin} onClickRegister={onClickRegister} />
      <HeroSection />
      <ImageCarousel />
      <CTASection onClickStarted={onClickRegister} />
    </Box>
  );
}
