"use client";

import FormContainer from "@/component/Form/FormContainer";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLogin } from "@/hooks/useLogin";
import { EmailTextField, PasswordFieldText } from "@/component/Form/FormTextField";
export default function LoginForm() {
  const { form, isLoading, onSubmit } = useLogin();

  const { control, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Typography variant="h4" align="center">
          Iniciar sesión
        </Typography>

        <EmailTextField
          control={control}
          name="email"
          label="Correo electrónico"
        />
        <PasswordFieldText
          control={control}
          name="password"
          label="Contraseña"
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
