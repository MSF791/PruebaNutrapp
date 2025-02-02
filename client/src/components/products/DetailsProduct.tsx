import React, { useEffect, useState } from "react";
import { DetailsProduct } from "../../interfaces/ProductProps";
import { GetProduct } from "../../api/products";

const DetailsProduct: React.FC<DetailsProduct> = ({ close, id }) => {
    const [product, setProduct] = useState<any>(null);
    useEffect(() => {
        async function loadProduct() {
            const res = await GetProduct(id)
            setProduct(res.data.producto)
        }

        loadProduct()
    }, [id])

    if(!product){
        return <div className="font-semibold text-center bg-indigo-600 text-white p-6 rounded-md">Cargando...</div>
    }
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 shadow-xl shadow-black p-2">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-[600px] max-h-full text-white overflow-y-auto">

                <div>
                    <h1 className="font-semibold text-center text-xl">Detalles del Producto</h1>
                    <p><strong>Nombre:</strong> {product.nombre}</p>
                    <p><strong>Descripción:</strong> {product.descripcion}</p>
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Precio:</strong> ${product.precio}</p>
                    <p><strong>Fecha Creación:</strong> {new Date(product.fecha_creacion).toLocaleDateString()}</p>
                </div>

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

export default DetailsProduct