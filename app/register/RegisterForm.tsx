"use client";

import FormContainer from "@/component/FormContainer";
import { useRegister } from "@/hooks/useRegister";
import { Button, TextField, Typography } from "@mui/material";
import { JSX } from "react";
import { Controller } from "react-hook-form";
import PasswordField from "@/component/FormContainer/Field/Password";

export default function RegisterForm(): JSX.Element {
  const { form, isLoading, onSubmit } = useRegister();
  const { control, handleSubmit } = form;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Typography variant="h4" align="center">
          Registrarse
        </Typography>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Nombre"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
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
