import { Schema, model } from "mongoose";

const productSchema = new Schema({
    nombre: { type:String, require:true },
    descripcion: { type:String, require:true },
    stock: { type:Number, require:true, default:0 },
    precio: { type:Number, require:true },
    fecha_creacion: { type:Date, default:Date.now }
})

export default model("Product", productSchema)