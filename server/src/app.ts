import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

//Routes
import IndexRoutes from './routes';

class Application {

    app:express.Application;

    constructor(){
        this.app = express()
        this.middlewares()
        this.settings()
        this.routes()
    }

    settings(){
        this.app.set('port', 3000)
    }
    
    middlewares(){
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(cors({
            origin:"http://localhost:5173",
            methods:["GET", "POST", "PUT", "DELETE"],
            allowedHeaders:["Content-Type", "Authorization"]
        }))
    }

    routes(){
        this.app.use(IndexRoutes)
    }

    start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('server running on', this.app.get('port'));
        })
    }
}

export default Application