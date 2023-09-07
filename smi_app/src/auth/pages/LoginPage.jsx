import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";
import logo from "../../assets/logo.png";

const loginFormFields = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const [email, setEmail] = useState("");
  const { password, onInputChange } = useForm(loginFormFields);
  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: email, password: password });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en la autenticación", errorMessage, "error");
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, [errorMessage]);

  return (
    <div className="main-container center-container">
        <div className="row login-row d-flex align-items-center">
          <div className="col-md-7 d-flex align-items-center text-left image-container-login">
            <img
              src={logo}
              className="img-fluid mx-auto imagen-fondo"
              alt=""
            />
          </div>
          <div className="col-md-5 login-form-1">
            <h1 className="login-title">SMI-APP</h1>
            <form onSubmit={loginSubmit}>
              <div className="form-group mb-2 pb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo Electrónico"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-2 pb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={onInputChange}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <input type="submit" className="w-100 btnSubmit " value="Ingresar"/>
                </div>
                <div className="col-md-6">
                  <input type="submit" className="w-100 btnSubmit" value="Registrarme"/>
                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
  );
};
