import express, { json } from "express"
import 'dotenv/config'
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import routerProducts from "./routes/products.routes.js";
import routerCarts from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import { connectDB } from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'view'));

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', viewsRouter);
app.use('/api', routerProducts);
app.use('/api', routerCarts);

export default app;