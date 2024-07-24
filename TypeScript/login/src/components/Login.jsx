//@ts-check
import React, { useState } from "react";
import "../../src/App.css";
import useCrud from "../hooks/useCrud";
import { Link, useNavigate } from "react-router-dom";
import LogoSena from "../../src/assets/img/logoSena.png";

const BASEURL = "http://localhost:3000";
const loginPath = "/loginAdmin";
const registerPath = "/invitados";

const Login = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(true);
  const [, , postLogin] = useCrud(BASEURL, loginPath);
  const [, , postRegister] = useCrud(BASEURL, registerPath);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userLogin = {
      numero_identificacion: e.target.numero_identificacion.value,
      contraseña_usuario: e.target.contraseña_usuario.value,
    };

    try {
      const res = await postLogin(userLogin);
      if (res && res.message === "Usuario autorizado") {
        localStorage.setItem('token', res.token); // Guarda el token en localStorage
        const userRole = res.user.rol_usuario;
        if (userRole === 'admininistrador') {
          navigate("/home");
        } 
      } else {
        alert("Inicio de sesión fallido");
      }
    } catch (error) {
      alert("Error durante el inicio de sesión: " + error.message);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    const userRegister = {
      nombre_usuario: event.target.nombre_usuario.value,
      apellido_usuario: event.target.apellido_usuario.value,
      Tipologia_usuario: event.target.Tipologia_usuario.value,
      numero_identificacion: event.target.numero_identificacion.value,
      tipo_documento: event.target.tipo_documento.value,
      correo_electronico: event.target.correo_electronico.value,
    };

    try {
      const res = await postRegister(userRegister);
      if (res && res.message === "Invitado registrado con éxito") {
        alert("Registro completado con éxito ✅");
        setIsRightPanelActive(false);
        navigate("/home");
      } else {
        alert("Registro fallido");
      }
    } catch (error) {
      alert("Error inesperado 😕: " + error.message);
    }
  };

  return (
    <>
      <img
        className="h-28 w-28 absolute ml-10 mt-6"
        src={LogoSena}
        alt="Logo SENA"
        style={{
          filter: "drop-shadow(2px 4px 6px black) brightness(1.2)",
          transform: "rotateY(20deg) scale(1.1)",
        }}
        
      />

      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="login-bg">
          <div
            className={`relative w-full max-w-4xl min-h-[480px] bg-white bg-opacity-85 rounded-3xl shadow-lg overflow-hidden ${
              isRightPanelActive ? "" : "right-panel-active"
            }`}
            id="container"
          >
            {/* Formulario de Iniciar Sesión */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${
                isRightPanelActive
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              } flex items-center justify-center z-20`}
            >
              <form
                className="flex flex-col items-center justify-center h-full p-8"
                onSubmit={handleLogin}
              >
                <h1 className="text-3xl font-bold mb-4">Iniciar Sesión</h1>
                <input
                  type="number"
                  placeholder="Número de identificación"
                  name="numero_identificacion"
                  required
                  className="mb-2 p-3 border rounded-lg w-full"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="contraseña_usuario"
                  required
                  autoComplete="new-password"
                  className="mb-4 p-3 border rounded-lg w-full"
                />
                <button className="bg-purple-700  text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition duration-300">
                  Iniciar Sesión
                </button>
                <Link to="#" className="text-black mt-2 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </form>
            </div>

            {/* Formulario de Crear Cuenta */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${
                isRightPanelActive
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              } flex items-center justify-center z-10`}
            >
              <form
                className="flex flex-col items-center justify-center h-full p-8"
                onSubmit={handleRegister}
              >
                <h1 className="text-3xl font-bold mb-4">Crear Cuenta</h1>
                <input
                  type="text"
                  placeholder="Nombre"
                  name="nombre_usuario"
                  required
                  className="mb-2 p-3 border rounded-lg w-full"
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  name="apellido_usuario"
                  required
                  className="mb-2 p-3 border rounded-lg w-full"
                />
                <select
                  name="Tipologia_usuario"
                  required
                  className="mb-2 p-3 border rounded-lg w-full"
                >
                  <option value="">Tipología</option>
                  <option value="interno">Interno</option>
                  <option value="externo">Externo</option>
                </select>
                <select
                  name="tipo_documento"
                  required
                  className="mb-2 p-3 border rounded-lg w-full"
                >
                  <option value="">Tipo documento</option>
                  <option value="cc">CC</option>
                  <option value="ti">TI</option>
                  <option value="nit">NIT</option>
                </select>
                <input
                  type="text"
                  placeholder="Número de identificación"
                  name="numero_identificacion"
                  required
                  className="mb-2 p-3 border rounded-lg w-full"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  name="correo_electronico"
                  required
                  className="mb-4 p-3 border rounded-lg w-full"
                />
                <button
                  type="submit"
                  className="bg-purple-700 text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-800 transition duration-300"
                >
                  Registrarse
                </button>
              </form>
            </div>

            {/* Panel de Información */}
            <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50">
              <div
                className={`bg-gradient-to-r from-purple-700 to-purple-500 opacity-85 absolute left-[-100%] h-full w-[200%] transition-transform duration-700 ease-in-out transform ${
                  isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
                }`}
                style={{ borderRadius: "10px" }}
              >
                <div
                  className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${
                    isRightPanelActive ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <h1 className="text-4xl font-bold text-white mb-4">¡Hola!</h1>
                  <p className="text-white mb-4">
                    Regístrate con tus datos personales para comenzar tu
                    experiencia
                  </p>
                  <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-purple-700 transition duration-300"
                    onClick={() => setIsRightPanelActive(false)}
                  >
                    Registrarse
                  </button>
                </div>
                <div
                  className={`absolute flex items-center left-1/2 w-1/2 h-full justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${
                    isRightPanelActive ? "translate-x-full" : "translate-x-0"
                  }`}
                >
                  <h1 className="text-4xl font-bold text-white mb-4">
                    ¡Bienvenido de nuevo!
                  </h1>
                  <p className="text-white mb-4">
                    Para mantenerte conectado, por favor inicia sesión con tu
                    información personal
                  </p>
                  <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-purple-700 transition duration-300"
                    onClick={() => setIsRightPanelActive(true)}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
