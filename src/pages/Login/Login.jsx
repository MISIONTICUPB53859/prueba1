import React, { useContext } from "react";
import { SkynetContext } from "../../context/SkynetContext";
import "./Login.css";
import logo from "../../assets/icons/logo2 1.svg";
import google from "../../assets/icons/google-logo.png";
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
  const { setUser } = useContext(SkynetContext);
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="box-container">
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {/* ! Sign In form */}

            <form
              action="index.html"
              autocomplete="off"
              className="sign-in-form"
            >
              <div className="logo">
                <img src={logo} alt="Skynet Store" />
                <h3>Skynet Store</h3>
              </div>

              <div className="heading">
                <h2>Bienvenido</h2>
                {/* <h6>No tiene cuenta aún?</h6>
                <a href="#" className="toggle">
                  Registrarse
                </a> */}
              </div>

              <div className="actual-form">
                {/* <div className="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                  />
                  <label className="login-label">Nombre</label>
                </div> */}

                {/* <div className="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                  />
                  <label className="login-label">Contraseña</label>
                </div>

                <input type="submit" value="Ingresar" className="sign-btn" /> */}

                <div className="google-btn" onClick={() => {
                  
                  loginWithRedirect()
                  setUser("usuario");
                  }}>
                  <img src={google} alt="Logo de Google" />Ingresa con Google
                </div>
                <br />
{/* 
                <p className="text">
                  Olvidó su contraseña?
                  <a href="#">Ayuda</a> para iniciar sesioń
                </p> */}
              </div>
            </form>
            {/* ! Sign Up form */}

            <form
              action="index.html"
              autocomplete="off"
              className="sign-up-form"
            >
              <div className="logo">
                <img src={logo} alt="Skynet Store" />
                <h3>Skynet Store</h3>
              </div>

              <div className="heading">
                <h2>Registro</h2>
                <h6>Ya tengo una cuenta</h6>
                <a href="#" className="toggle">
                  Ingresar
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                  />
                  <label className="login-label">Nombre</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="Email"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                  />
                  <label className="login-label">Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    className="input-field"
                    autocomplete="off"
                    required
                  />
                  <label className="login-label">Contraseña</label>
                </div>

                <input type="submit" value="Registrarse" className="sign-btn" />

                <p className="text">
                  Al registrarme, acepto los
                  <a href="#">Términos y Condiciones</a> y las
                  <a href="#">Políticas de Privacidad</a>
                </p>
              </div>
            </form>
          </div>

          <div className="carousel">
            <div className="image"></div>

            <div className="text_btn">
              {" "}
              <br /> © 2021, Skynet Store, Marca Registrada
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
