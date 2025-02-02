import axios from "axios";
import { URL } from "../constants/constants";
import { UserData, UserLoginData } from "../interfaces/UserData";

const users = axios.create({
  baseURL: `${URL}`,
});

export const SaveUser = (data:UserData) => users.post("/auth/register", data);

export const GetToken = (data:UserLoginData) => users.post("/auth/login", data)

export const DecodeToken = (token:string) =>  users.post('/auth/check/token', {token})