"use client";

import Background from "@/component/Background";
import RegisterForm from "./RegisterForm";
import { Container } from "@mui/material";

export default function RegisterPage() {
  return (
    <Background>
      <Container maxWidth="sm">
        <RegisterForm></RegisterForm>
      </Container>
    </Background>
  );
}
