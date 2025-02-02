import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    usuario: { type:Schema.Types.ObjectId, ref:'User', require:true },
    productos: [
        {
            producto:{
                _id:false,
                type:Schema.Types.ObjectId,
                ref:'Product',
                require:true
            }
        }
    ],
    total_orden: { type:Number, require:true },
    estado: { type:String, enum:['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'], default:'pendiente' },
    fecha_creacion: { type:Date, default:Date.now },
    direccion_envio: { type:String, require:true },
    metodo_pago: { type:String, enum:['tarjeta', 'transferencia', 'efectivo'], require:true }

})

export default model("Order", orderSchema)