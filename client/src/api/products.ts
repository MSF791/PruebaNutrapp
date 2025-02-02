import axios from "axios";
import { URL } from "../constants/constants";
import { AddProduct, EditProduct } from "../interfaces/Product";

const products = axios.create({
    baseURL: `${URL}`,
  });

export const GetProducts = () => products.get("/products")

export const GetProduct = (id:string) => products.get(`/products/${id}`)

export const SaveProduct = (data:AddProduct) => products.post("/products", data)

export const EditProductData = (id:string, data:EditProduct) => products.put(`/products/${id}`, data)

export const DeleteProductData = (id:string) => products.delete(`/products/${id}`)
