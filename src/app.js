// Configuraciones del servidor
import express, { json } from "express"
import 'dotenv/config'
import routerProducts from "./routes/products.routes.js";
import routerCarts from "./routes/carts.routes.js";
import { connectDB } from "./config/db.js";


const app = express();
// conectamos la db de mongo 
    // connectDB() --> descomentar si se quiere usar mongoDB
// utiliza json 
app.use(json())
// enrutador que comienza con api
app.use('/api/', routerProducts)
app.use('/api/', routerCarts)



export default app;