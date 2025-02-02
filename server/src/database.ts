import mongoose from "mongoose";

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://huli:PmbFGHcsMFTS2DDR@cluster0.c4hlf.mongodb.net/nutraapp?retryWrites=true&w=majority&appName=Cluster0')
        console.log('conectado a la db')
    }catch{
        console.log('error al conectar a la db')
    }
}

export default connect