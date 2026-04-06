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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Navbar onClickLogin={onClickLogin} onClickRegister={onClickRegister} />
      <HeroSection />
      <ImageCarousel />
      <CTASection />
    </Box>
  );
}
