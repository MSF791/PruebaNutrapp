import { Order } from "./Orders";

export interface AddOrderProps{
    close: () => void;
    setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export interface DetailProps{
    close:() => void;
    id:string;
}