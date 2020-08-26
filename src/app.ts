import express from "express";
import morgan from 'morgan'
//import exphbs from 'express-handlebars'
class Application {
    app: express.Application
    constructor(){
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    start = () => {
        this.app.listen(3000, () => {
            console.log('Server running');
        })
    }

    settings = () => {
    
    }

    middlewares = () => {
        this.app.use(morgan('dev'))
    }

    routes = () => {
    
    }
}

export default Application