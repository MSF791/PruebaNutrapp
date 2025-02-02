import React, { useEffect } from "react";
import { EditProductProps } from "../../interfaces/ProductProps";
import { EditProduct } from "../../interfaces/Product";
import { useForm } from "react-hook-form"
import { EditProductData, GetProduct } from "../../api/products";
import { success, load, closeModal, errorModal } from "../../hooks/Modals";

const EditProduct: React.FC<EditProductProps> = ({ close, id, setProducts }) => {
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm<EditProduct>();

    useEffect(() => {
        async function loadProduct() {
            const res = await GetProduct(id)
            setValue('nombre', res.data.producto.nombre)
            setValue('descripcion', res.data.producto.descripcion)
            setValue('stock', res.data.producto.stock)
            setValue('precio', res.data.producto.precio)
        }

        loadProduct()
    }, [id])

    const DataSubmit = handleSubmit(async (data) => {
        try{
            load('Editando producto...')
            await EditProductData(id, data)
            setProducts(prevProducts => 
                prevProducts.map(p => p._id === id ? { ...p, ...data } : p)
            );
            closeModal()
            success('Producto editado con exito')
            close()
        }catch{
            closeModal()
            errorModal('Ha ocurrido un error al editar el producto')
        }
    })
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 shadow-xl shadow-black p-2">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-[600px] max-h-full text-white overflow-y-auto">
                <h2 className="text-lg font-semibold text-center">Editar Producto</h2>
                <form
                    onSubmit={DataSubmit}
                    autoComplete="off"
                    className="flex flex-col gap-6 px-6 py-6 text-black"
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
                            type="text"
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
                            type="text"
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

export default EditProduct