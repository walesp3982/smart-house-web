"use client";

import FormContainer from "@/component/Form/FormContainer";
import { useRegister } from "@/hooks/useRegister";
import { Button, Typography } from "@mui/material";
import { JSX } from "react";
import { BasicTextField, PasswordTextField, EmailTextField } from "@/component/Form/FormTextField";
export default function RegisterForm(): JSX.Element {
  const { form, isLoading, onSubmit } = useRegister();
  const { control, handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Typography variant="h4" align="center">
          Registrarse
        </Typography>
        <BasicTextField
          control={control}
          name="name"
          label="Nombre"
        />
        <EmailTextField
          control={control}
          name="email"
          label="Correo electrónico"
        />
        <PasswordTextField
          control={control}
          name="password"
          label="Contraseña"
        />
        <PasswordTextField
          control={control}
          name="confirmed_password"
          label="Confirmar Contraseña"
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant="contained"
          size="large"
          fullWidth
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </Button>
      </FormContainer>
    </form>
  );
}
