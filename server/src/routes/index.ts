import mongoose from 'mongoose';
import { Router, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import User from '../models/User';
import generateToken, { DecodeToken } from '../utils/jwt';
import Product from '../models/Product';
import { Types } from 'mongoose';
import Order from '../models/Order';

const router = Router();

router.post('/auth/register', async (req:Request, res:Response) => {
    try{
        const { nombre, email, password } = req.body;
        const emailExist = await User.findOne(({email}));
        if (emailExist){
            res.status(400).json({ mensaje: 'El email ya está registrado' });
        }else{
            const saltRounds = 10;
            const handlePassword = await bcrypt.hash(password, saltRounds)
            
            const newUser = new User({ nombre, email, password:handlePassword });
            await newUser.save();
            res.status(201).json({mensaje:"Usuario creado con exito"})
        }
    }catch{
        res.status(500).json({mensaje:"Ha ocurrido un error"})
    }

})

router.post('/auth/check/token', async (req:Request, res:Response) => {
    try{
        const { token } = req.body
        if (!token){
            res.status(400).json({error:"Token no proporcionado"})
        }
        const userData = DecodeToken(token)
        if (userData){
            res.status(200).json({usuario:userData})
        }
    }catch{

    }
})

router.post('/auth/login', async (req:Request, res:Response) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email:email});
        if(!user || !user.password){
            res.status(404).json({ error:"Credenciales Invalidas" });
        }else{
            const checkPassword = await bcrypt.compare(password ?? '', user.password);
            if(!checkPassword){
                res.status(404).json({ error:"Credenciales Invalidas" });
            }else{
                const payload = {"id":user.id, "role":user.role};
                const token_generado = generateToken(payload);
                res.status(200).json({token:token_generado});
            }
        }
    }catch{
        res.status(500).json({mensaje:"Ha ocurrido un error"})
    }

})

router.post('/products', async (req:Request, res:Response) => {
    try{
        const newProduct = new Product({...req.body});
        const savedProduct = await newProduct.save();
        res.status(201).json({mensaje:"Se ha creado con exito el producto", producto:savedProduct});
    }catch{
        res.status(500).json({mensaje:"Ha ocurrido un error"});
    }
})

router.get('/products', async (req:Request, res:Response) => {
    try{
        const products = await Product.find();
        res.status(200).json({productos:products});
    }catch{
        res.status(500).json({mensaje:"No se pudo recuperar los productos"});
    }
})

router.get('/products/:id', async (req:Request, res:Response) => {
    try{
        const { id } = req.params;
        const product = await Product.findOne({_id:new Types.ObjectId(id)});
        if(!product){
            res.status(404).json({error:`No se encuentra el producto con id ${id}`})
        }else{
            res.status(200).json({producto:product});
        }
        
    }catch{
        res.status(500).json({mensaje:"No se pudo recuperar el producto"});
    }
})

router.put('/products/:id', async (req:Request, res:Response) => {
    try{
        const { id } = req.params
        const updateProduct = await Product.findByIdAndUpdate(
            new Types.ObjectId(id),
            req.body,
            { new:true }
            );
        if (updateProduct) {
            res.status(200).json({ producto: updateProduct });
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado"});
        }
    }catch{
        res.status(500).json({mensaje:"No se pudo recuperar el producto"});
    }
})

router.delete('/products/:id', async (req:Request, res:Response) => {
    try{
        const { id } = req.params
        const deleteProduct = await Product.findByIdAndDelete(
            new Types.ObjectId(id),
            );
        if (deleteProduct) {
            res.status(200).json({ producto: "producto eliminado con exito" });
        } else {
            res.status(404).json({ mensaje: "Producto no encontrado" });
        }
    }catch{
        res.status(500).json({mensaje:"No se pudo recuperar el producto"});
    }
})

router.post('/orders', async (req:Request, res:Response) => {
    try{
        const productos = req.body.productos.map((id: string) => ({
            producto: new mongoose.Types.ObjectId(id),   
        }));
        const newOrder = new Order({
            usuario: req.body.usuario,
            productos: productos,
            total_orden: req.body.total_orden,
            direccion_envio: req.body.direccion_envio,
            metodo_pago: req.body.metodo_pago
        });
        const savedOrder = await newOrder.save();
        const populatedOrder = await savedOrder.populate('usuario', 'nombre');
        res.status(201).json({mensaje:"Orden Creado con exito", order:populatedOrder})
    }catch(error){
        console.log(error)
        res.status(500).json({mensaje:"Ha ocurrido un error al crear la orden"})
    }
})

router.get('/orders/all', async (req:Request, res:Response) => {
    try{
        const orders = await Order.find().lean().populate('usuario', 'nombre');
        res.status(200).json({orders:orders})
    }catch{
        res.status(500).json({mensaje:"Ha ocurrido un error al cargar las ordenes"})
    }
})

router.get('/orders/user/:id_user', async (req:Request, res:Response) => {
    try{
        const { id_user } = req.params
        const ordersUser = await Order.find({usuario:new Types.ObjectId(id_user)}).populate('usuario', 'nombre')
        if(!ordersUser){
            res.status(404).json({message:"No se han podido recuperar las ordenes"})
        }else{
            res.status(200).json({orders:ordersUser})
        }
    }catch{
        res.status(500).json({message:"Ha ocurrido un error al recuperar las ordenes"})
    }
})

router.get('/orders/order/:id_order', async (req:Request, res:Response) => {
    try{
        const { id_order } = req.params
        const orderDetail = await Order.find({_id:new Types.ObjectId(id_order)})
        .populate('usuario', 'nombre')
        .populate('productos.producto', 'nombre');
        if(!orderDetail){
            res.status(404).json({message:"No se ha podido recuperar la orden"})
        }else{
            res.status(200).json({order:orderDetail})
        }
    }catch{
        res.status(500).json({message:"Ha ocurrido un error al recuperar la orden"})
    }
})

export default router