import { Router } from "express";
import fs from 'fs';

const router = Router();
const ruta = "./src/db-JSON/products.json";

router.get("/", (req, res) => {
    const contenido = fs.readFileSync(ruta, "utf-8");
    const products = JSON.parse(contenido);
    res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;
