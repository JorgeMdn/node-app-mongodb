import express from "express";
import morgan from 'morgan' // middleware
import exphbs from 'express-handlebars'
import path from 'path'
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
// Routes
import indexRoutes from "./routes";
import  tasksRoutes from "./routes/tasks";
class Application {
    app: express.Application
    constructor(){
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    settings = () => {
        this.app.set('port', 3000)
        // unir o encontrar carpeta views en el proyecto
        this.app.set('views', path.join(__dirname, 'views'))
        // configuracion de plantillas 
        this.app.engine('hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs',
            handlebars: allowInsecurePrototypeAccess(Handlebars)
        }))
        this.app.set('view engine', '.hbs')
    }

    middlewares = () => {
        this.app.use(morgan('dev'))
        // Recibiendo cualquier tipo de dato
        this.app.use(express.json()) // recibir json - api
        this.app.use(express.urlencoded({extended: false})) // entender formulario
    }

    routes = () => {
        this.app.use(indexRoutes)
        this.app.use('/tasks',tasksRoutes)
        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    start = () => {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

export default Application
            
            