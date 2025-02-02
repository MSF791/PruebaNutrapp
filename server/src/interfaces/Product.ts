import mongoose from "mongoose";

export interface Producto {
    producto: mongoose.Types.ObjectId; 
    cantidad: number;
    precio: number;
    total: number;
}