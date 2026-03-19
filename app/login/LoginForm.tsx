"use client";

import FormContainer from "@/component/FormContainer";
import PasswordField from "@/component/FormContainer/Field/Password";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

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
        <Button type="submit" variant="contained" size="large" fullWidth>
          Entrar
        </Button>
      </FormContainer>
    </form>
  );
}
