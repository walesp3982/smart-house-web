"use client";

import {
  Button,
  Container,
} from "@mui/material";
import { translations } from "./tranlations";
import { useRegisterDevice } from "@/hooks/useRegisterDevice";
import FormContainer from "@/component/Form/FormContainer";
import { BasicTextField } from "@/component/Form/FormTextField";

const t = (key: keyof typeof translations) => translations[key];

export default function DashboardHomePage() {
  const { form, isLoading, onSubmit } = useRegisterDevice()
  const { control, handleSubmit } = form

  return (
    <>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer
            title={t("welcome")}
            subtitle={t("enterDeviceCode")}>

            <BasicTextField
              control={control}
              label={t("deviceCodeLabel")}
              name="uuid"
            />
            <BasicTextField
              control={control}
              name="code_verificacion"
              label="Código de verificación"
            />

            <BasicTextField
              control={control}
              name="name"
              label="Nombre"
            />


            <Button variant="contained" fullWidth size="large" type="submit" disabled={isLoading}>
              {isLoading ? "Cargando..." : t("addDeviceButton")}
            </Button >
          </FormContainer >
        </form>
      </Container>
    </>
  );
}
