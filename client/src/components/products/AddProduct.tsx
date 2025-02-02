import React from "react";
import { useForm } from "react-hook-form";
import { AddProductProps } from "../../interfaces/ProductProps";
import { AddProduct } from "../../interfaces/Product";
import { success, load, errorModal, closeModal } from "../../hooks/Modals";
import { SaveProduct } from "../../api/products";


const AddProduct: React.FC<AddProductProps> = ({ close, setProducts }) => {
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<AddProduct>();

    const SubmitData = handleSubmit(async (data) => {
        try {
            load('Creando producto...')
            const res = await SaveProduct(data)
            setProducts(prevProducts => [res.data.producto, ...prevProducts]);           
            close()
            closeModal()
            success('Producto creado con éxito')
        } catch {
            closeModal()
            errorModal('Ha ocurrido un error al crear el producto')
        }
    })
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 shadow-xl shadow-black p-2">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-[600px] max-h-full text-white overflow-y-auto">
                <h2 className="text-lg font-semibold text-center">Crear Producto</h2>
                <form
                    autoComplete="off"
                    className="flex flex-col gap-6 px-6 py-6 text-black"
                    onSubmit={SubmitData}
                >
                    <div className="flex flex-col">
                        <label htmlFor="nombre" className="text-white mb-2">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            placeholder="Nombre del producto"
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            {...register('nombre', { required: "Este campo es obligatorio" })}
                        />
                        {errors.nombre?.message && <span className='text-white text-sm font-normal'>{String(errors.nombre.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="descripcion" className="text-white mb-2">Descripción</label>
                        <textarea
                            id="descripcion"
                            placeholder="Nombre del producto"
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            {...register('descripcion', { required: "Este campo es obligatorio" })}
                        ></textarea>
                        {errors.descripcion?.message && <span className='text-white text-sm font-normal'>{String(errors.descripcion.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="stock" className="text-white mb-2">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            placeholder="ejemplo: 1"
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            {...register('stock', { required: "Este campo es obligatorio" })}
                        />
                        {errors.stock?.message && <span className='text-white text-sm font-normal'>{String(errors.stock.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="precio" className="text-white mb-2">Precio</label>
                        <input
                            type="number"
                            id="precio"
                            placeholder="ejemplo: 1000"
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            {...register('precio', { required: "Este campo es obligatorio" })}
                        />
                        {errors.precio?.message && <span className='text-white text-sm font-normal'>{String(errors.precio.message)}</span>}
                    </div>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={close}
                            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                        >
                            Cerrar
                        </button>
                        <button
                            type="submit"
                            className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                        >
                            Guardar
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default AddProduct