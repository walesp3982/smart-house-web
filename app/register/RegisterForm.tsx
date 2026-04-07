"use client";

import FormContainer from "@/component/Form/FormContainer";
import { useRegister } from "@/hooks/useRegister";
import { Button, Typography } from "@mui/material";
import { JSX } from "react";
import { BasicFieldText, PasswordFieldText } from "@/component/Form/FormTextField";
export default function RegisterForm(): JSX.Element {
  const { form, isLoading, onSubmit } = useRegister();
  const { control, handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Typography variant="h4" align="center">
          Registrarse
        </Typography>
        <BasicFieldText
          control={control}
          name="name"
          label="Nombre"
        />
        <BasicFieldText
          control={control}
          name="email"
          label="Correo electrónico"
        />
        <PasswordFieldText
          control={control}
          name="password"
          label="Contraseña"
        />
        <PasswordFieldText
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
