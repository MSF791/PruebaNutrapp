import React, { useEffect, useState } from "react";
import { GetProducts } from "../api/products";
import { Product } from "../interfaces/Product";
import AddProduct from "../components/products/AddProduct";
import { useAuth } from "../hooks/TokenContext";
import DetailsProduct from "../components/products/DetailsProduct";
import EditProduct from "../components/products/EditProduct";
import DeleteProduct from "../components/products/DeleteProduct";

const Products: React.FC = () => {
    const { role } = useAuth();
    const [open, setOpenModal] = useState(false)
    const [detalles, setOpenDetalles] = useState(false)
    const [editar, setOpenEditar] = useState(false)
    const [eliminar, setOpenEliminar] = useState(false)
    const [id, setId] = useState('')
    const [nombre_producto, setNombre] = useState('')
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function LoadProducts() {
            const res = await GetProducts()
            setProducts(res.data.productos)
        }

        LoadProducts()
    }, [])

    const DetallesClick = (id: string) => {
        setOpenDetalles(true)
        setId(id)
    }

    const EditarClick = (id:string) => {
        setOpenEditar(true)
        setId(id)
    }

    const EliminarClick = (id:string, nombre:string) => {
        setOpenEliminar(true)
        setId(id)
        setNombre(nombre)
    }
    return (
        <section className="flex flex-col justify-center items-center max-w-full">
            <h1 className='text-indigo-600 text-2xl font-semibold mb-4'>Productos</h1>
            {role === 'admin' &&
                <button
                    onClick={() => setOpenModal(true)}
                    className="bg-indigo-600 px-4 py-2 text-white rounded-lg transition duration-300 ease-in-out hover:bg-indigo-800 cursor-pointer mb-4"
                >
                    Crear Producto
                </button>
            }
            <div className="overflow-x-auto">
                <table className="max-w-full bg-white border text-indigo-500">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Nombre</th>
                            <th className="px-4 py-2 border">Precio</th>
                            <th className="px-4 py-2 border">Fecha de Creación</th>
                            <th className="px-4 py-2 border">Detalles</th>
                            {role === 'admin' && <>
                                <th className="px-4 py-2 border">Editar</th>
                                <th className="px-4 py-2 border">Eliminar</th>
                            </>
                            }
                        </tr>
                    </thead>
                    <tbody className="text-black">
                        {products.length === 0 &&
                            <tr>
                                <td className="font-semibold text-md text-center">No hay Productos para mostrar</td>
                            </tr>
                        }
                        {products.map((product, index) => (
                            <tr key={product._id} className="text-center">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{product.nombre}</td>
                                <td className="px-4 py-2 border">${product.precio}</td>
                                <td className="px-4 py-2 border">
                                    {new Date(product.fecha_creacion).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => DetallesClick(product._id)}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-700"
                                    >
                                        Detalles
                                    </button>
                                </td>
                                {role === 'admin' && <>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => EditarClick(product._id)} 
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-700"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            onClick={() => EliminarClick(product._id, product.nombre)} 
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-indigo-700"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </>
                                }

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {open === true && <AddProduct close={() => setOpenModal(false)} setProducts={setProducts}/>}
            {detalles === true && <DetailsProduct close={() => setOpenDetalles(false)} id={id} />}
            {editar === true && <EditProduct close={() => setOpenEditar(false)} id={id} setProducts={setProducts}/>}
            {eliminar === true && <DeleteProduct close={() => setOpenEliminar(false)} id={id} setProducts={setProducts} nombre={nombre_producto}/>}
        </section>
    )
}

export default Products 