// Configuraciones del servidor
import express, { json } from "express"
import 'dotenv/config'
import router from "./routes/products.routes.js";
import { connectDB } from "./config/db.js";


const app = express();
// conectamos la db de mongo
connectDB()
// utiliza json 
app.use(json())
// enrutador que comienza con api
app.use('/api/', router)



export default app;