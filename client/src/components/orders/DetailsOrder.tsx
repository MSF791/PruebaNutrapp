import React, { useEffect, useState } from "react";
import { DetailProps } from "../../interfaces/OrderProps";
import { GetOrder } from "../../api/orders";
import { DetailOrder } from "../../interfaces/Orders";

const DetailOrder: React.FC<DetailProps> = ({ close, id }) => {
    const [orders, setOrder] = useState<DetailOrder[]>([])

    useEffect(() => {
        async function LoadOrder() {
            const res = await GetOrder(id)
            setOrder(res.data.order)
            console.log(res.data.order)
        }

        LoadOrder()
    }, [])
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 shadow-xl shadow-black p-2">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-[600px] max-h-full text-white overflow-y-auto">
                <h2 className="text-lg font-semibold text-center">Detalles orden</h2>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id}>
                            <p><strong>Usuario:</strong> {order.usuario?.nombre}</p>
                            <p><strong>Productos:</strong>
                                {order.productos.map((item, index) => (
                                    <div key={index}>
                                        Producto: {item.producto.nombre}
                                    </div>
                                ))}
                            </p>
                            <p><strong>Total Orden:</strong> {order.total_orden}</p>
                            <p><strong>Estado:</strong> {order.estado}</p>
                            <p><strong>Dirección:</strong> {order.direccion_envio}</p>
                            <p><strong>Fecha creación:</strong> {new Date(order.fecha_creacion).toLocaleDateString()}</p>
                            <p><strong>Método de pago:</strong> {order.metodo_pago}</p>
                        </div>
                    ))
                ) : (
                    <p>Cargando...</p>
                )}
                <button
                    onClick={close}
                    className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}

export default DetailOrder