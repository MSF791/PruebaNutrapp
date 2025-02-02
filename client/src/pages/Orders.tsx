import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/TokenContext"
import { Order } from "../interfaces/Orders";
import { GetAllOrders, GetOrdersUser } from "../api/orders";
import AddOrder from "../components/orders/AddOrder";
import DetailOrder from "../components/orders/DetailsOrder";

const Orders:React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [open, setOpenModal] = useState(false)
    const [detalles, setDetallesModal] = useState(false)
    const [id, setId] = useState('')
    const { role, idUser } = useAuth();

    useEffect(() => {
        async function LoadOrdersUser() {
            const res = await GetOrdersUser(idUser);
            setOrders(res.data.orders)
        }

        async function LoadAllOrders() {
            const res = await GetAllOrders();
            setOrders(res.data.orders)
        }

        if(role === 'cliente'){
            LoadOrdersUser()
        }
        if(role === 'admin'){
            LoadAllOrders()
        }
    }, [role, idUser])

    const DetallesClick = (id:string) => {
        setDetallesModal(true)
        setId(id)
    }
    return (
        <section className="flex flex-col justify-center items-center max-w-full">
            <h1 className='text-indigo-600 text-2xl font-semibold mb-4'>Órdenes</h1>
            {role === 'cliente' &&
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-indigo-600 px-4 py-2 text-white rounded-lg transition duration-300 ease-in-out hover:bg-indigo-800 cursor-pointer mb-4"
                >
                    Crear orden de compra
                </button>
            }
            <div className="overflow-x-auto">
                <table className="max-w-full bg-white border text-indigo-500">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Usuario</th>
                            <th className="px-4 py-2 border">Total</th>
                            <th className="px-4 py-2 border">Fecha de Creación</th>
                            <th className="px-4 py-2 border">Detalles</th>
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {orders.length === 0 &&
                            <tr>
                                <td className="font-semibold text-md text-center">No hay Productos para mostrar</td>
                            </tr>
                        }
                        {orders.map((order, index) => (
                            <tr key={order._id} className="text-center">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{order.usuario.nombre}</td>
                                <td className="px-4 py-2 border">${order.total_orden}</td>
                                <td className="px-4 py-2 border">
                                    {new Date(order.fecha_creacion).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => DetallesClick(order._id)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-700"
                                    >
                                        Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {open === true && <AddOrder close={() => setOpenModal(false)} setOrders={setOrders}/>}
            {detalles === true && <DetailOrder close={() => setDetallesModal(false)} id={id}/>}
        </section>
    )
}

export default Orders