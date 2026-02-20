import Products from "../models/products.model.js";
import fs from 'fs'
import { generatorID } from "../utils/index.js";

// --------CONTROLADORES CON DB .JSON
// Trae todos los productos
export const getAllProducts = async (req, res) => {
    // ruta de json
    const ruta = "./src/db-JSON/products.json"

    // leemos
    const contenido = fs.readFileSync(ruta, "utf-8");
    // convertimos
    const products = JSON.parse(contenido)


    res.json(products)
}
// Trae producto por id
export const getIdProduct = async (req, res) => {
    const id = req.params.id;
   // ruta de json
    const ruta = "./src/db-JSON/products.json"
    // leemos
    const contenido = fs.readFileSync(ruta, "utf-8");
    // convertimos
    const products = JSON.parse(contenido)

    // buscamos el producto
    const existProduct = products.find( prod => prod.id === id )
    if(!existProduct){
        return res.json("producto no existe")
    }

    res.json(existProduct)

}

// Agrega un producto
export const addProduct = async (req, res) => {
    const {title, description, code, stock, category, thumbnails, price, status} = req.body
    
     // ruta de json
    const ruta = "./src/db-JSON/products.json"
    // leemos
    const contenido = fs.readFileSync(ruta, "utf-8");
    // convertimos / referencia
    const products = JSON.parse(contenido)

    products.push({
    id: generatorID(),
    title: title || "sin titulo",
    description: description || "no description",
    code: code,
    price: price,
    status: status,
    stock: stock,
    category: category,
    thumbnails:thumbnails
    })

    
    // console.log(products)
    fs.writeFileSync(ruta, JSON.stringify(products, null, 2))
    res.json(products)
}
// Eliminar el producto
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
   // ruta de json
    const ruta = "./src/db-JSON/products.json"
    // leemos
    const contenido = fs.readFileSync(ruta, "utf-8");
    // convertimos
    const products = JSON.parse(contenido)

    // buscamos el producto
    const deleteProduct = products.filter( prod => prod.id != id )

    // console.log(deleteProduct)
    fs.writeFileSync(ruta, JSON.stringify(deleteProduct, null, 2))
    res.json(deleteProduct)
}
// Actualizar producto
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const newProduct = req.body;
    
     // ruta de json
    const ruta = "./src/db-JSON/products.json"
    // leemos
    const contenido = fs.readFileSync(ruta, "utf-8");
    // convertimos / referencia
    const products = JSON.parse(contenido)
    // buscar el producto por index
    const index = products.findIndex(prod => prod.id === id);
    if(index === -1){
        return res.json("No se encontro el producto")
    }
    // mediante el index obtenemos el producto
    products[index] = {
        //copiamos 
        ...products[index],
        //esparcimos los datos del body, usamos spread
        ...newProduct,
        // Agregamos el id por si el usuario manda un id diferente.
        id
    }
 
    // console.log(products)
    fs.writeFileSync(ruta, JSON.stringify(products, null, 2))

    res.json(products)
}



// ----------CONTROLADORES CON DB MONGO-------------------

// // Trae todos los productos
// export const getAllProducts = async (req, res) => {
//     try {
//         const productos = await Products.find()
//         console.log(productos)
//         res.json(productos)
//     } catch (error) {
//         console.log(error)
//     }
// }
// // Agrega un producto
// export const addProduct = async (req, res) => {

//     try {
//         const producto = req.body;
//         const newProduct = await Products.create(producto);

//         console.log(newProduct)
//     } catch (error) {
//         console.log(error)

//     }


// }
// // Trae producto por id
// export const getIdProduct = async (req, res) => {
//     try {
//         // Obtenemos el params del path
//         const params = req.params.id;

//         // buscamos por id
//         const productId = await Products.findOne({ _id: params })
//         // console.log(productId)

//         res.json(productId)
//     } catch (error) {
//         console.log(error)

//     }
// }
// // Eliminar el producto
// export const deleteProduct = async (req, res) => {
//     try {
//         // Obtenemos el params del path
//         const params = req.params.id;

//         // buscamos por id
//         const productId = await Products.deleteOne({ _id: params })
//         // console.log(productId)
//         res.json({
//             message: "Producto eliminado",
//             product: productId
//         })
//     } catch (error) {
//         console.log(error)

//     }
// }
// // Actualizar 
// export const updateProduct = async (req, res) => {
//     try {
//         // Obtenemos el params del path
//         const {id} = req.params;
//         const productForm = req.body;
//         console.log(id)

//         // buscamos por id
//         const userDb = await Products.findOne({_id: id})
//         // validamos
//         if(!userDb){
//             console.log(userDb)
//             return res.json({message:"el producto no existe"})
//         }
//         // actualizamos
//         const newProduct = await Products.findByIdAndUpdate(id, productForm,{new:true})
//         console.log(newProduct)
        
//         res.json({
//             message: "Producto actualizado",
//             product: newProduct
//         })
//     } catch (error) {
//         console.log(error)

//     }
// }