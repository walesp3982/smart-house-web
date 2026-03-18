"use client";

import FormContainer from "@/component/FormContainer";
import PasswordField from "@/component/FormContainer/Field/Password";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function LoginForm() {
  return (
    <FormContainer>
      <Typography variant="h4" align="center">
        Iniciar sesión
      </Typography>
      <TextField label="Email" fullWidth />
      <PasswordField></PasswordField>
      <Button variant="contained" size="large" fullWidth>
        Entrar
      </Button>
    </FormContainer>
  );
}
