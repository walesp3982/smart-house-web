"use client";

import Error from "@/component/Error";
import { JSX } from "react";

export default function NotFound(): JSX.Element {
  return (
    <Error
      title="404 NOT FOUND"
      subtitle="Parece que esta página no existe"
      redirect="/"
      button_text="Ir al panel principal"
    />
  );
}
