import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from '../interfaces/User';
import { TokenPayload } from '../interfaces/Token';

const generateToken = (user: UserPayload): string => {
    return jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: '1d' 
    });
};

export const DecodeToken = (token:string): TokenPayload | null | undefined => {
    if(process.env.JWT_SECRET){
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload as TokenPayload;
        console.log("Token decodificado", decoded)
        return decoded
    }

}

export default generateToken;
