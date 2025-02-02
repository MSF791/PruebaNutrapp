import { createContext,useContext, useState, useEffect } from "react";
import { AuthContextType } from "../interfaces/AuthTypes";
import { DecodeToken } from "../api/users";
import { useNavigate } from "react-router-dom";
import { success } from "./Modals";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children:React.ReactNode }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [role, setRole] = useState<string | null>(null)
    const [idUser, setIduser] = useState<string | null>(null)


    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login")
        success("Sesión cerrada con éxito")
    };

    const getRole = async () => {
        if (token) {
            try {
                const response = await DecodeToken(token);
                setRole(response.data.usuario.user.role)
                setIduser(response.data.usuario.user.id)
            } catch (error) {
                console.error("Error fetching role:", error);
                setRole(null); 
            }
        }
    };

    useEffect(() => {
        if (token){
            getRole();
        }else {
            setRole(null)
        }
    }, [token])

    return (
        <AuthContext.Provider value={{ token, role, idUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("error")
    }
    return context
}