import { Product } from "./Product";

export interface AddProductProps {
    close: () => void;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export interface DetailsProduct {
    close: () => void;
    id:string;
}

export interface EditProductProps {
    close: () => void;
    id:string;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export interface DeleteProductProps {
    close: () => void;
    id:string;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    nombre:string;
}