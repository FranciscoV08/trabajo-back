import mongoose, { Schema } from "mongoose";

const productsSchema = new Schema({
    title: { type: String },
    description: { type: String },
    code: { type: String },
    price: { type: Number },
    status: { type: Boolean },
    stock: { type: Number },
    category: { type: String },
    thumbnails: {
        type: String,
        default: '[]'
    },
})
// creamos en la db  le especificamos el schema
const ProductsModel = mongoose.model('products', productsSchema);
// exportamos el schema
export default ProductsModel; 