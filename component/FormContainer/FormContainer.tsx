import { JSX, ReactNode } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
interface propsFormContainer {
  children: ReactNode;
}

export default function FormContainer({
  children,
}: propsFormContainer): JSX.Element {
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: "12px" }}>
      <Stack spacing={5}>{children}</Stack>
    </Paper>
  );
}
