import React from 'react'
import { success, load, closeModal, errorModal } from '../../hooks/Modals'
import { DeleteProductProps } from '../../interfaces/ProductProps'
import { DeleteProductData } from '../../api/products'

const DeleteProduct: React.FC<DeleteProductProps> = ({ close, id, setProducts, nombre }) => {
    const confirmDeleteProduct = async (id_producto:string) => {
        try{
            load('Eliminando producto...')
            await DeleteProductData(id_producto)
            setProducts(prevProducts => prevProducts.filter(p => p._id !== id_producto))
            closeModal()
            close()
            success('Producto eliminado con éxito')
        }catch{
            closeModal()
            errorModal('Ha ocurrido un error al eliminar el producto')
        }
    }
    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50 shadow-xl shadow-black p-2">
            <div className="bg-indigo-600 p-6 rounded-lg shadow-lg w-full max-w-[600px] max-h-full text-white overflow-y-auto">
                <h1 className='font-semibold text-center text-lg mb-4'>¿Estas seguro que deseas eliminar el producto "{nombre}"</h1>
                <p className='mb-4 text-center text-md'>Esta acción no se puede deshacer</p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={close}
                        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => confirmDeleteProduct(id)}
                        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteProduct