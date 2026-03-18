"use client";

import { useState } from "react";
import "./login.css";

import Background from "@/component/Background";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormContainer from "@/component/FormContainer";
import PasswordIcon from "@/component/FormContainer/Icons/Password";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Background>
      <Container maxWidth="sm">
        <FormContainer>
          <Typography variant="h4" align="center">
            Iniciar sesión
          </Typography>
          <TextField label="Email" fullWidth />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <PasswordIcon
                  showPassword={showPassword}
                  handleClickShowPassword={handleClickShowPassword}
                ></PasswordIcon>
              }
              label="Password"
            />
          </FormControl>

          <Button variant="contained" size="large" fullWidth>
            Entrar
          </Button>
        </FormContainer>
      </Container>
    </Background>
  );
}
