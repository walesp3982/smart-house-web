import { JSX, ReactNode } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import styles from "./FormContainer.module.css"

interface propsFormContainer {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function FormContainer({
  children, title, subtitle
}: propsFormContainer): JSX.Element {
  return (
    <Paper elevation={0} sx={{ p: 5, mt: 8, borderRadius: "12px" }}>
      {title && <Typography variant="h3" className={styles.title}>
        {title}
      </Typography>}
      {subtitle && <Typography variant="body1" className={styles.subtitle}>
        {subtitle}
      </Typography>}
      <Stack spacing={4}>{children}</Stack>
    </Paper>
  );
}
