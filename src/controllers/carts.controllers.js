import { generatorID } from "../utils/index.js"
import fs from "fs";


// Crea un carrito json
export const createCart = (req, res) => {

    const ruta = "./src/db-JSON/carts.json"

    // Generador de CID
    const cid = generatorID()


    const contenido = fs.readFileSync(ruta, "utf-8");
    const carts = JSON.parse(contenido)

    const newCart = {
        id: cid,
        products: []
    }

    carts.push(newCart)


    fs.writeFileSync(ruta, JSON.stringify(carts, null, 2))
}
// obtenemos los productos del carrito
export const getAllProductsId = (req, res) => {
    const cid = req.params.cid;

    const ruta = "./src/db-JSON/carts.json"

    const contenido = fs.readFileSync(ruta, "utf-8");
    const carts = JSON.parse(contenido)
    const cartDb = carts.find(cart => cart.id === cid);

    // console.log(cartDb.products)
    res.json(cartDb.products)
}

export const addProductCart = (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const ruta = "./src/db-JSON/carts.json"

    // leemos
    const contenido = fs.readFileSync(ruta, "utf-8");
    // convertimos
    const carts = JSON.parse(contenido)

    // buscamos el carrito 
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) {
        res.json("carrito no encontrado")
    }

    // buscar producto dentro del carrito
    const existingProduct = cart.products.find(p => p.product === pid);

    // validamos
    if (existingProduct) {
        // sumar cantidad
        existingProduct.quantity += 1;
    } else {
        // de lo contrario agregamos
        cart.products.push({
            product: pid,
            quantity: 1
        });
    }

    fs.writeFileSync(ruta, JSON.stringify(carts, null, 2))

}

// FUNCIONALIDADES USANDO MONGODB
// --