import React, { useEffect, useState } from "react"
import { AddOrderProps } from "../../interfaces/OrderProps"
import { useForm } from "react-hook-form"
import { useAuth } from "../../hooks/TokenContext"
import { GetProducts } from "../../api/products"
import { Product } from "../../interfaces/Product"
import { success, load, errorModal, closeModal } from "../../hooks/Modals"
import { AddOrder } from "../../interfaces/Orders"
import { SaveOrder } from "../../api/orders"

const AddOrder: React.FC<AddOrderProps> = ({ close, setOrders }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [totalOrden, setTotalOrden] = useState<number>(0);
    const { idUser } = useAuth();

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit
    } = useForm<AddOrder>();

    if (idUser) {
        setValue('usuario', idUser)
    }
    if (totalOrden){
        setValue('total_orden', totalOrden)
    }

    useEffect(() => {
        async function LoadProducts() {
            const res = await GetProducts()
            setProducts(res.data.productos)
        }

        LoadProducts()
    }, [])

    const calculateTotal = (selectedIds: string[]) => {
        let total = 0;

        selectedIds.forEach((id) => {
            const product = products.find(p => p._id === id);
            if (product) {
                total += product.precio;
            }
        });

        setTotalOrden(total);
    };

    const DataSubmit = handleSubmit(async (data) => {
        try {
            load('Creando orden...');
            const res = await SaveOrder(data);
            setOrders(prevData => [res.data.order, ...prevData])
            closeModal();
            success('orden creada con éxito');
            close();
        } catch {
            closeModal();
            errorModal('Ha ocurrido un error al crear la orden');
        }
    })
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 shadow-xl shadow-black p-2">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-[600px] max-h-full text-white overflow-y-auto">
                <h2 className="text-lg font-semibold text-center">Crear Orden</h2>
                <form
                    autoComplete="off"
                    className="flex flex-col gap-6 px-6 py-6 text-black"
                    onSubmit={DataSubmit}
                >
                    <div className="flex flex-col">
                        <input
                            type="hidden"
                            {...register('usuario', { required: "Por favor inicie sesión" })}
                        />
                        {errors.usuario?.message && <span className='text-white text-sm font-normal'>{String(errors.usuario.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="productos" className="text-white mb-2">Selecciona productos:</label>
                        <select
                            id="productos"
                            multiple
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            value={selectedProducts}
                            {...register('productos', {required:"Este campo es obligatorio"})}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                                setSelectedProducts(selectedOptions);
                                calculateTotal(selectedOptions)
                            }}
                            
                        >
                            {products.map(product => (
                                <option key={product._id} value={product._id}>
                                    {product.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.productos && <span className='text-white text-sm font-normal'>{String(errors.productos.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="total_orden" className="text-white mb-2">Total Orden</label>
                        <input
                            type="text"
                            id="total_orden"
                            value={`$${totalOrden}`}
                            className="bg-gray-300 outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            disabled
                            {...register('total_orden', { required:"Este campo es obligatorio" })}
                        />
                        <span className="text-white text-sm font-normal">Este campo no se puede modificar</span>
                        {errors.total_orden && <span className='text-white text-sm font-normal'>{String(errors.total_orden.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="direccion_envio" className="text-white mb-2">Direccion</label>
                        <input
                            type="text"
                            id="direccion_envio"
                            placeholder="ejemplo: calle falsa 123"
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            {...register('direccion_envio', { required: "Este campo es obligatorio" })}
                        />
                        {errors.direccion_envio?.message && <span className='text-white text-sm font-normal'>{String(errors.direccion_envio.message)}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="metodo_pago" className="text-white mb-2">Método de pago</label>
                        <select
                            id="metodo_pago"
                            className="bg-white outline-none rounded-md px-3 py-2 shadow-md focus:ring-2 focus:ring-indigo-950"
                            {...register('metodo_pago', { required: "Este campo es obligatorio" })}
                        >
                            <option value="tarjeta" selected>Tarjeta</option>
                            <option value="transferencia">Transferencia</option>
                            <option value="efectivo">Efectivo</option>
                        </select>
                        {errors.metodo_pago?.message && <span className='text-white text-sm font-normal'>{String(errors.metodo_pago.message)}</span>}
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

export default AddOrder