import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        default: []
    }
});

cartSchema.pre('findOne', function() {
    this.populate('products.product');
});

const CartsModel = mongoose.model("carts", cartSchema);

export default CartsModel;
