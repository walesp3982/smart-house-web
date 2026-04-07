"use client";

import FormContainer from "@/component/Form/FormContainer";
import { useRegister } from "@/hooks/useRegister";
import { Button, Typography } from "@mui/material";
import { JSX } from "react";
import { Controller } from "react-hook-form";
import PasswordField from "@/component/Form/FormContainer/Field/Password";
import FormTextField from "@/component/Form/FormTextField";
export default function RegisterForm(): JSX.Element {
  const { form, isLoading, onSubmit } = useRegister();
  const { control, handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Typography variant="h4" align="center">
          Registrarse
        </Typography>
        <FormTextField
          control={control}
          name="name"
          label="Nombre"
        />
        <FormTextField
          control={control}
          name="email"
          type="email"
          label="Email"
        />
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <PasswordField field={field} fieldState={fieldState} />
          )}
        />
        <Controller
          control={control}
          name="confirmed_password"
          render={({ field, fieldState }) => (
            <PasswordField
              field={field}
              fieldState={fieldState}
              name="Confirmar Password"
            />
          )}
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
