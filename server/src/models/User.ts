import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nombre: { type:String, require:true },
    email: { type:String, require:true },
    password: { type:String, require:true },
    role: { type:String, require:false, default:'cliente' }
})

export default model("User", userSchema)