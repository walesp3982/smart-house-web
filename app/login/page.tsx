"use client";

import { useState } from "react";
import "./login.css";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Background from "@/component/Background";
import Card from "@/component/Card";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Background>
      <Card>
        <h1>Iniciar Sesión</h1>

        <form>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input"
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="input"
            />

            <span
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>

          <button className="button">Ingresar</button>
        </form>
      </Card>
    </Background>
  );
}
