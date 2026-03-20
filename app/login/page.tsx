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

          <input
            type="email"
            placeholder="Correo electrónico"
            className="input"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <div className="password-container">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="input"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <span
              className="eye"
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