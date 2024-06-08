import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import { log, error } from 'console'
import morgan from 'morgan'

const { json, urlencoded } = express

//routes import
import postRoutes from './routes/postsRoute.js'

//config
dotenv.config()
const app = express()

//middlewares
app.use(json({
    limit : '30mb', extended: true
}))
app.use(urlencoded({
    limit : '30mb', extended: true
}))
app.use(morgan('common'))
app.use(cors())



//route use
app.use('/posts', postRoutes)


const port = process.env.PORT

app.listen(process.env.PORT, (err) => {
    connectDB()

    !err ? log(`Server started at port ${port}`) : error(err.message)
})
