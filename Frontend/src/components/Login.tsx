import { useState } from "react";
import Fondo from "./Backgrounds/Fondo";

function Login() {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRut(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const uri = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Autentificar con backend
    try {
      const response = await fetch(`${uri}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rut, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Obtener token
        const token = data.token;
        console.log(token);
        // Guardar token en el almacenamiento local
        localStorage.setItem("token", token);

        // Redireccionar a dashboard
        //window.location.href = '/home';
        alert(`Autentificación exitosa!! \nToken generado: ${data}`);
      } else {
        // Manejo de errores en caso de autenticación fallida
        alert("Acceso denegado");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <>
      <Fondo></Fondo>
      <div className="flex justify-center items-center h-screen">
        <div className="content-container justify-center items-center flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Bienvenid@!</h1>
            <p className="text-sm dark:text-gray-400">
              Inicie sesión para acceder a la plataforma
            </p>
          </div>
          <form
            action=""
            className="space-y-12 ng-untouched ng-pristine ng-valid "
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="rut" className="block mb-2 text-sm">
                  RUT
                </label>
                <input
                  type="text"
                  name="rut"
                  id="email"
                  placeholder="12345678-9"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  value={rut}
                  onChange={handleRutChange}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm">
                    Contraseña
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900"
                >
                  Iniciar sesión
                </button>
              </div>
              <p className="px-6 text-sm text-center dark:text-gray-400">
                No tiene cuenta?
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="hover:underline dark:text-violet-400"
                >
                  &nbsp;Regístrese
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
