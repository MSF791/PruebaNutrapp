import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import { success, load, errorModal, closeModal } from '../hooks/Modals';
import { SaveUser } from '../api/users';
import { UserData } from '../interfaces/UserData';

const Regisiter: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<UserData>();

    const DataSubmit = handleSubmit(async (data) => {
        try {
            load('Creando usuario...')
            await SaveUser(data);
            closeModal()
            success('Usuario creado satisfactoriamente')
        } catch (error) {
            const err = error as any
            console.log(err.response.data.mensaje)
            closeModal()
            if (err.response.data.mensaje === 'El email ya está registrado') {
                errorModal('el correo ya está registrado, por favor digite otro correo')
            } else {
                errorModal('Ha ocurrido un error al crear el usuario, por favor intentelo de nuevo más tarde')
            }
        }
    })
    return (
        <section className='text-2xl flex flex-col items-center max-w-full'>
            <h1 className='text-indigo-600 text-2xl font-semibold mb-4'>Registro</h1>
            <form
                onSubmit={DataSubmit}
                autoComplete="off"
                className="flex flex-col gap-6 bg-indigo-600 px-6 py-8 text-black shadow-black shadow-lg rounded-lg w-full max-w-full text-md max-h-full overflow-y-auto"
            >
                <div className="flex flex-col">
                    <label htmlFor="nombre" className="text-white mb-2">nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Escribe tu nombre"
                        className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                        {...register('nombre', { required: "Este campo es obligatorio" })}
                    />
                    {errors.nombre?.message && <span className='text-white text-sm font-normal'>{String(errors.nombre.message)}</span>}
                </div>
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
                        {...register('password', {
                            required: "Este campo es obligatorio", pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                message:
                                    "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial",
                            },
                        })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-16 right-2 flex items-center text-gray-600 text-sm hover:text-gray-900 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                    <div className='max-w-xs'>
                        {errors.password?.message && <span className='text-white text-sm font-normal break-words'>{String(errors.password.message)}</span>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-indigo-900 rounded-md py-2 text-white font-semibold hover:bg-indigo-950 transition-all cursor-pointer"
                >
                    Registrarse
                </button>
                <Link to="/login" className="text-sm text-white font-bold cursor-pointer hover:underline text-center">¿Ya tienes cuenta? Inicia Sesión</Link>
            </form>
        </section>
    )
}

export default Regisiter