import axios from "axios";
import { URL } from "../constants/constants"; 
import { AddOrder } from "../interfaces/Orders";

const orders = axios.create({
    baseURL: `${URL}`,
  });

export const GetOrdersUser = (id:string | null) => orders.get(`/orders/user/${id}`)

export const SaveOrder = (data:AddOrder) => orders.post("/orders", data)

export const GetOrder = (id:string | null) => orders.get(`/orders/order/${id}`)

export const GetAllOrders = () => orders.get("/orders/all")