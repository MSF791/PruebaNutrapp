import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserLoginData } from "../interfaces/UserData";
import { useForm } from "react-hook-form";
import { success, load, errorModal, closeModal } from "../hooks/Modals";
import { useAuth } from "../hooks/TokenContext";
import { GetToken } from "../api/users";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();
    const {
        register, 
        formState: { errors },
        handleSubmit
    } = useForm<UserLoginData>();

    const DataSubmit = handleSubmit(async (data) => {
        try{
            load('Iniciando Sesión...');
            const res = await GetToken(data)
            login(res.data.token)
            closeModal();
            success('Has iniciado sesión con éxito');
            navigate('/')
        }catch(error){
            const err = error as any
            closeModal();
            if(err.response.data.error === 'Credenciales Invalidas'){
                errorModal('Credenciales Invalidas')
            }else{
                errorModal('Ha ocurrido un error al iniciar sesión');
            }
        }
    })
    return (
        <section className="text-indigo-600 text-2xl flex flex-col items-center max-w-full">
            <h1 className='text-indigo-600 text-2xl font-semibold mb-4'>Iniciar Sesión</h1>
            <form 
            onSubmit={DataSubmit}
            autoComplete="off" 
            className="flex flex-col gap-6 bg-indigo-600 px-6 py-8 text-black shadow-black shadow-lg rounded-lg w-full max-w-full text-md">
                <div className="flex flex-col">
                    <label htmlFor="correo" className="text-white mb-2">Correo</label>
                    <input
                        type="email"
                        id="correo"
                        placeholder="test@example.com"
                        className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                        {...register('email', { required: "Este campo es obligatorio" })}
                    />
                    {errors.email?.message && <span className='text-white text-sm font-normal'>{String(errors.email.message)}</span>}
                </div>
                <div className="flex flex-col relative">
                    <label htmlFor="password" className="text-white mb-2">Contraseña</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Contraseña"
                        className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                        {...register('password', { required:"Este campo es obligatorio" })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-16 right-2 flex items-center text-gray-600 text-sm hover:text-gray-900 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                    {errors.password?.message && <span className='text-white text-sm font-normal'>{String(errors.password.message)}</span>}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-900 rounded-md py-2 text-white font-semibold hover:bg-indigo-950 transition-all cursor-pointer"
                >
                    Iniciar Sesión
                </button>
                <Link to="/registro" className="text-sm text-white font-bold cursor-pointer hover:underline text-center">¿No tienes cuenta? Registrate aqui</Link>
            </form>
        </section>

    )
}

export default Login