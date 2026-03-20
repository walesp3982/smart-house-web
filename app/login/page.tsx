<<<<<<< HEAD
"use client"

import { useState } from "react"
import "./login.css"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e:any) => {
    e.preventDefault()

    try {

      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      const data = await response.json()

      if(response.ok){

        alert("Login correcto")

        // guardar token
        localStorage.setItem("token", data.token)

      }else{
        alert("Credenciales incorrectas")
      }

    } catch (error) {
      console.log(error)
      alert("Error conectando con el servidor")
    }

  }

  return (

    <div className="container">
      <div className="card">

        <h1>Iniciar Sesión</h1>

        <form onSubmit={handleLogin}>

=======
"use client";

import { useState } from "react";
import "./login.css";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <div className="card">
        <h1>Iniciar Sesión</h1>

        <form>
>>>>>>> b4b1dfa87f690a2176f2df8f6b033dd4de54dbc8
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input"
<<<<<<< HEAD
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <div className="password-container">

=======
          />

          <div className="password-container">
>>>>>>> b4b1dfa87f690a2176f2df8f6b033dd4de54dbc8
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="input"
<<<<<<< HEAD
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
=======
>>>>>>> b4b1dfa87f690a2176f2df8f6b033dd4de54dbc8
            />

            <span
              className="eye"
<<<<<<< HEAD
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? "👁" : "🙈"}
            </span>

          </div>

          <button className="button">
            Ingresar
          </button>

        </form>

      </div>
    </div>
  )
}
=======
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>

          <button className="button">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
>>>>>>> b4b1dfa87f690a2176f2df8f6b033dd4de54dbc8
