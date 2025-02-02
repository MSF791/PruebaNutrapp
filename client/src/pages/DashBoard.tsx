import React from "react";
import { useAuth } from "../hooks/TokenContext";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
    const { role } = useAuth();
    console.log(role)
    return (
        <section>
            <h1 className='text-indigo-600 text-2xl font-semibold mb-4 text-center'>Bienvenido</h1>
            {role === null &&
            <div className="flex flex-col bg-indigo-600 text-white shadow-lg shadow-black w-[600px] h-[160px] rounded-md text-center p-6 font-semibold">
                    <Link to="/registro" className="cursor-pointer hover:underline py-2">¿Quieres Acceder a nuestras funciones? Registrate Gratis</Link>
                    <Link to="/login" className="cursor-pointer hover:underline py-2">¿Ya tienes cuenta? Inicia Sesión aqui</Link>
            </div>
            }
            {role === 'admin' ?
                <div className="flex flex-col bg-indigo-600 text-white shadow-lg shadow-black w-[600px] h-[160px] rounded-md text-center p-6 font-semibold">
                    <p className="text-xl py-2">rol: {role}</p>
                    <Link to="/products" className="cursor-pointer hover:underline py-2">¿Quieres Registrar Productos? Hazlo Aqui</Link>
                    <Link to="/orders" className="cursor-pointer hover:underline py-2">¿Quieres Ver Todas Las Ordenes? Hazlo Aqui</Link>
                </div> : role === 'cliente' &&
                <div className="flex flex-col bg-indigo-600 text-white shadow-lg shadow-black w-[600px] h-[160px] rounded-md text-center p-6 font-semibold">
                    <p className="text-xl py-2">rol: {role}</p>
                    <Link to="/products" className="cursor-pointer hover:underline py-2">¿Quieres Ver Nuevos Productos? Hazlo Aqui</Link>
                    <Link to="/orders" className="cursor-pointer hover:underline py-2">¿Quieres Ver Tus Ordenes? Hazlo Aqui</Link>
                </div>
            }
        </section>
    )
}

export default Dashboard
