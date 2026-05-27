"use client";

import "./login.css";
import LoginForm from "./LoginForm";
import Background from "@/component/Background";

import Container from "@mui/material/Container";

export default function Login() {
  return (
    <Background>
      <Container maxWidth="sm">
        <LoginForm></LoginForm>
      </Container>
    </Background>
  );
}
