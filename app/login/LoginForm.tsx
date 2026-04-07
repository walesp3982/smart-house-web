"use client";

import FormContainer from "@/component/Form/FormContainer";
import PasswordField from "@/component/Form/FormContainer/Field/Password";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const { form, isLoading, onSubmit } = useLogin();

  const { control, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Typography variant="h4" align="center">
          Iniciar sesión
        </Typography>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            ></TextField>
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <PasswordField field={field} fieldState={fieldState} />
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
