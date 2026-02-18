import Products from "../models/products.model.js";

// Trae todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const productos = await Products.find()
        console.log(productos)
        res.json(productos)
    } catch (error) {
        console.log(error)
    }
}
// Agrega un producto
export const addProduct = async (req, res) => {

    try {
        const producto = req.body;
        const newProduct = await Products.create(producto);

        console.log(newProduct)
    } catch (error) {
        console.log(error)

    }


}
// Trae producto por id
export const getIdProduct = async (req, res) => {
    try {
        // Obtenemos el params del path
        const params = req.params.id;

        // buscamos por id
        const productId = await Products.findOne({ _id: params })
        // console.log(productId)

        res.json(productId)
    } catch (error) {
        console.log(error)

    }
}
// Eliminar el producto
export const deleteProduct = async (req, res) => {
    try {
        // Obtenemos el params del path
        const params = req.params.id;

        // buscamos por id
        const productId = await Products.deleteOne({ _id: params })
        // console.log(productId)
        res.json({
            message: "Producto eliminado",
            product: productId
        })
    } catch (error) {
        console.log(error)

    }
}
// Actualizar usuario
export const updateProduct = async (req, res) => {
    try {
        // Obtenemos el params del path
        const {id} = req.params;
        const productForm = req.body;
        console.log(id)

        // buscamos por id
        const userDb = await Products.findOne({_id: id})
        // validamos
        if(!userDb){
            console.log(userDb)
            return res.json({message:"el producto no existe"})
        }
        // actualizamos
        const newProduct = await Products.findByIdAndUpdate(id, productForm,{new:true})
        console.log(newProduct)
        
        res.json({
            message: "Producto actualizado",
            product: newProduct
        })
    } catch (error) {
        console.log(error)

    }
}