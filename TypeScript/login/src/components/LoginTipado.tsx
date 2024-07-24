import React, { useState, FormEvent } from "react";
import "../../src/App.css";
import useCrud from "../hook/Crud";
import { Link, useNavigate } from "react-router-dom";

interface UserLogin {
  numero_identificacion: string;
  contraseña_usuario: string;
}

interface UserRegister {
  nombre_usuario: string;
  apellido_usuario: string;
  Tipologia_usuario: string;
  numero_identificacion: string;
  tipo_documento: string;
  correo_electronico: string;
}

interface ServerResponse {
  message: string;
  user?: {
    rol_usuario: string;
  };
}

const BASEURL = "http://localhost:3000";
const loginPath = "/loginAdmin";
const registerPath = "/invitados";

const Login: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(true);
  const [, , postLogin] = useCrud(BASEURL, loginPath);
  const [, , postRegister] = useCrud(BASEURL, registerPath);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userLogin: UserLogin = {
      numero_identificacion: (
        e.currentTarget.elements.namedItem(
          "numero_identificacion"
        ) as HTMLInputElement
      ).value,
      contraseña_usuario: (
        e.currentTarget.elements.namedItem(
          "contraseña_usuario"
        ) as HTMLInputElement
      ).value,
    };

    try {
      if (postLogin) {
        const res = (await postLogin(userLogin)) as ServerResponse;
        if (res && res.message === "Usuario autorizado") {
          navigate("/home");
        } else {
          alert("Inicio de sesión fallido");
        }
      }
    } catch (error) {
      alert("Error durante el inicio de sesión: " + (error as Error).message);
    }
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userRegister: UserRegister = {
      nombre_usuario: (
        event.currentTarget.elements.namedItem(
          "nombre_usuario"
        ) as HTMLInputElement
      ).value,
      apellido_usuario: (
        event.currentTarget.elements.namedItem(
          "apellido_usuario"
        ) as HTMLInputElement
      ).value,
      Tipologia_usuario: (
        event.currentTarget.elements.namedItem(
          "Tipologia_usuario"
        ) as HTMLSelectElement
      ).value,
      numero_identificacion: (
        event.currentTarget.elements.namedItem(
          "numero_identificacion"
        ) as HTMLInputElement
      ).value,
      tipo_documento: (
        event.currentTarget.elements.namedItem(
          "tipo_documento"
        ) as HTMLSelectElement
      ).value,
      correo_electronico: (
        event.currentTarget.elements.namedItem(
          "correo_electronico"
        ) as HTMLInputElement
      ).value,
    };

    try {
      if (postRegister) {
        const res = (await postRegister(userRegister)) as ServerResponse;
        if (res && res.message === "Invitado registrado con éxito") {
          alert("Registro completado con éxito ✅");
          navigate("/home");
        } else {
          alert("Registro fallido");
        }
      } else {
        console.error("postRegister is not defined");
      }
    } catch (error) {
      alert("Error inesperado 😕: " + (error as Error).message);
    }

    setIsRightPanelActive(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="login-bg">
        <div
          className={`relative w-full max-w-4xl min-h-[480px] bg-white rounded-3xl shadow-lg overflow-hidden bg-opacity-40 ${
            isRightPanelActive ? "right-panel-active" : ""
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
              <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
              <input
                type="number"
                placeholder="Numero de identificacion"
                name="numero_identificacion"
                required
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="password"
                placeholder="Contraseña"
                name="contraseña_usuario"
                required
                className="mb-4 p-2 border rounded w-full"
              />
              <button className="bg-purple-800 text-white font-bold py-2 px-4 rounded mb-4">
                Iniciar Sesión
              </button>
              <Link to="" className="text-black">
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
              <h1 className="text-2xl font-bold mb-4">Crear Cuenta</h1>
              <input
                type="text"
                placeholder="Nombre"
                name="nombre_usuario"
                required
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Apellido"
                name="apellido_usuario"
                required
                className="mb-2 p-2 border rounded w-full"
              />
              <select
                name="Tipologia_usuario"
                required
                className="mb-2 p-2 border rounded w-full"
              >
                <option value="">Tipología</option>
                <option value="interno">interno</option>
                <option value="externo">externo</option>
              </select>
              <select
                name="tipo_documento"
                required
                className="mb-2 p-2 border rounded w-full"
              >
                <option value="">Tipo documento</option>
                <option value="cc">cc</option>
                <option value="ti">ti</option>
                <option value="nit">nit</option>
              </select>
              <input
                type="text"
                placeholder="Numero identificacion"
                name="numero_identificacion"
                required
                className="mb-2 p-2 border rounded w-full"
              />
              <input
                type="email"
                placeholder="Correo electronico"
                name="correo_electronico"
                required
                className="mb-4 p-2 border rounded w-full"
              />
              <button
                type="submit"
                className="bg-purple-800 text-white font-bold py-2 px-4"
              >
                Registrarse
              </button>
            </form>
          </div>

          {/* Panel de Información */}
          <div className="bg-opacity-25">
            <div className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50">
              <div
                className={`bg-gradient-to-r bg-colorweb bg-opacity-90 absolute left-[-100%] h-full w-[200%] transition-transform duration-700 ease-in-out transform ${
                  isRightPanelActive ? "translate-x-1/2" : "translate-x-0"
                }`}
                style={{ borderRadius: "10px" }}
              >
                <div
                  className={`absolute flex items-center justify-center flex-col px-10 text-center top-0 h-full w-1/2 transition-transform duration-700 ease-in-out transform ${
                    isRightPanelActive ? "translate-x-0" : "-translate-x-full"
                  }`}
                >
                  <h1 className="text-2xl font-bold mb-4">¡Hola!</h1>
                  <p className="mb-4">
                    Regístrate con tus datos personales para comenzar tu
                    experiencia
                  </p>
                  <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsRightPanelActive(false)}
                  >
                    Registrarse
                  </button>
                </div>
                <div
                  className={`absolute flex items-center left-1/2 w-1/2 h-full justify-center flex-col px-10 text-center top-0 transition-transform duration-700 ease-in-out transform ${
                    isRightPanelActive ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <h1 className="text-2xl font-bold mb-4">
                    ¡Bienvenido de nuevo!
                  </h1>
                  <p className="mb-4">
                    Para mantenerte conectado con nosotros por favor inicia
                    sesión con tu información personal.
                  </p>
                  <button
                    className="bg-transparent border border-white text-white font-bold py-2 px-4 rounded"
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
    </div>
  );
};

export default Login;
