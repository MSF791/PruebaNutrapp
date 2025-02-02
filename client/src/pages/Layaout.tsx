import React, { useState } from "react";
import { LayoutProps } from "../interfaces/Layaout";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/TokenContext";

const Layaout: React.FC<LayoutProps> = ({ children }) => {
    const { logout, token } = useAuth();
    const [menu, setMenuOpen] = useState(false);
    return (
        <>
            <header className="bg-indigo-600 w-screen h-[80px] px-8 max-w-full">
                <nav className="flex justify-between items-center h-full text-white text-lg">
                    <button
                        className="md:hidden p-2 z-50"
                        onClick={() => setMenuOpen(!menu)}
                    >
                        {menu ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
                    </button>

                    <ul className="hidden md:flex items-center gap-8 cursor-pointer">
                        <Link
                            to="/"
                            className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white"
                        >
                            Inicio
                        </Link>
                    </ul>

                    {token && 
                        <ul className="hidden md:flex items-center gap-8 cursor-pointer">
                            <Link to="/products" className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white">
                                Productos
                            </Link>
                            <Link to="/orders" className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white">
                                Órdenes
                            </Link>
                        </ul>
                    }

                    <ul className="hidden md:flex items-center gap-8 cursor-pointer">
                        {token ? 
                        <li 
                        onClick={() => logout()}
                        className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white">
                            Cerrar Sesión
                        </li> : 
                        <Link to="/login" className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white">
                            Iniciar Sesión
                        </Link>
                        }

                        <Link to="/registro" className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white">
                            Registrarse
                        </Link>
                    </ul>
                </nav>

                <div
                    className={`absolute top-0 left-0 w-full h-screen bg-indigo-700 transform ${menu ? "translate-x-0" : "-translate-x-full"
                        } transition-transform md:hidden flex flex-col items-center gap-6 pt-16 text-white text-lg`}
                >
                    <ul className="flex flex-col items-center gap-4">
                        <Link to="/"
                            className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link to="/products" 
                            className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white"
                            onClick={() => setMenuOpen(false)}
                        >
                                Productos
                        </Link>
                        <Link to="/orders" 
                            className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white"
                            onClick={() => setMenuOpen(false)}
                        >
                                Órdenes
                        </Link>
                        <Link to="/login"
                            className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Iniciar Sesión
                        </Link>
                        <Link to="/registro"
                            className="relative pb-1 transition duration-150 ease-in-out hover:border-b-2 hover:border-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            Registrarse
                        </Link>
                    </ul>
                </div>
            </header>

            <main className="flex justify-center items-center py-8">{children}</main>
        </>
    )
}

export default Layaout