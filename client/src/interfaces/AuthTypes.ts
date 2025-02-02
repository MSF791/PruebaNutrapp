export interface AuthContextType {
    token: string | null;
    role: string | null;
    idUser: string | null;
    login: (token: string) => void;
    logout: () => void;
}