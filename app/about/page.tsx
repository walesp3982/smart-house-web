import { Toaster } from "sonner";
import { toastTest } from "./actions";
import Button from "@/component/Button/Button";
import TextField from "@mui/material/TextField";

export default function About() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
        Esto es una About
        <Button onClick={toastTest}>Presionar</Button>
      </div>
      <TextField
        id="outlined-email"
        label="Correo electrónico"
        variant="outlined"
      />

      <TextField
        id="outlined-password"
        label="Contraseña"
        type={false ? "text" : "password"}
        variant="outlined"
      />
    </>
  );
}
