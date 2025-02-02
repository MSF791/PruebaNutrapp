export interface Product {
    _id: string;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
    fecha_creacion: string; 
}

export interface AddProduct {
    _id: string;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
}

export interface EditProduct {
    _id: string;
    nombre: string;
    descripcion: string;
    stock: number;
    precio: number;
}

