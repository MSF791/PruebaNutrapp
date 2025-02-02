import App from "./app"
import database from './database'
import dotenv from 'dotenv';

dotenv.config();

database()
const app = new App()
app.start();