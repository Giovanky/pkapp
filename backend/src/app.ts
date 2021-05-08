import express, {Application} from 'express' 
import morgan from 'morgan'
import routes from './routes'
import path from 'path'
import env from 'dotenv'
import cors from 'cors'

//initializations
const app: Application = express()
env.config()

//config
app.use(cors())
app.use(morgan('dev'))
app.set('port', process.env.PORT)
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//middlewares

//routes
app.use('/api', routes)

//static files
app.use(express.static(path.join(__dirname, '../public')))

export default app