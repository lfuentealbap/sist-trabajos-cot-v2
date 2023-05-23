import { useState } from "react";
import Fondo from "./Fondo";

function Login() {

    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');
  
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
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ rut, password })
        });
  
        if (response.ok) {
          const data = await response.json();
          // Obtener token
          const token = data.token;
    console.log(token)
          // Guardar token en el almacenamiento local
          localStorage.setItem('token', token);
          
          // Redireccionar a dashboard
          //window.location.href = '/home';
          alert(`Autentificación exitosa!! \nToken generado: ${data}`)
        } else {
          // Manejo de errores en caso de autenticación fallida
          alert('Acceso denegado');
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      }
  
    };

  return (
    <>
    <Fondo></Fondo>
      <div className="flex justify-center items-center h-screen content-container">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rut">
            Rut
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="rut"
            type="text"
            placeholder="Ingrese su rut"
            value={rut}
            onChange={handleRutChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
    </>
  )
}
export default Login;