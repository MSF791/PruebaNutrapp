import { UserData } from "./UserData";

export interface Order {
    _id: string;
    usuario: UserData;
    productos: {
        producto: string;
        cantidad: number;
        precio: number;
        total: number;
    }[];
    total_orden: number;
    estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
    direccion_envio: string;
    fecha_creacion: string; 
    metodo_pago: 'tarjeta' | 'transferencia' | 'efectivo';
}

export interface AddOrder {
    usuario: String;
    productos: {
        producto: string;
        cantidad: number;
        precio: number;
        total: number;
    }[];
    total_orden: number;
    direccion_envio: string;
    metodo_pago: 'tarjeta' | 'transferencia' | 'efectivo';
}

export interface DetailOrder {
    _id: string;
    usuario: { nombre: string };
    productos: Array<{ producto: { nombre:string }; cantidad: number; precio: number; total: number }>;
    total_orden: number;
    estado: string;
    direccion_envio: string;
    fecha_creacion: string;
    metodo_pago: string;
}
