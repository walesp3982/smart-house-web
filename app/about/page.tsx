import { Toaster } from "sonner";
import { toastTest } from "./actions";
import Button from "@/component/Button/Button";

export default function About() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
        Esto es una About
        <Button onClick={toastTest}>Presionar</Button>
      </div>
    </>
  );
}
