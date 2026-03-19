"use client";

import FormContainer from "@/component/FormContainer";
import PasswordField from "@/component/FormContainer/Field/Password";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiClient } from "@/src/lib/api/client";
const schema = z.object({
  email: z.email("Dirección de correo inválida"),
  password: z.string().min(1, "Se requiere este campo"),
});

type FormValues = z.infer<typeof schema>;
export default function LoginForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data_submit: FormValues) => {
    console.log(data_submit);
    try {
      const { data, error } = await apiClient.POST("/token", {
        body: {
          username: data_submit.email,
          password: data_submit.password,
          scope: "",
        },
      });
      console.log("error", error);
      console.log("data", data);
    } catch {}
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
