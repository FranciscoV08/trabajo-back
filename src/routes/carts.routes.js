import { Router } from "express";
import { 
    addProductCart, 
    createCart, 
    getAllProductsId, 
    deleteProductFromCart, 
    updateCart, 
    updateProductQuantity, 
    clearCart 
} from "../controllers/carts.controllers.js";

const router = Router();

router.post("/carts", createCart);
router.get("/carts/:cid", getAllProductsId);
router.post("/carts/:cid/product/:pid", addProductCart);

// Nuevos endpoints
router.delete("/carts/:cid/products/:pid", deleteProductFromCart);
router.put("/carts/:cid", updateCart);
router.put("/carts/:cid/products/:pid", updateProductQuantity);
router.delete("/carts/:cid", clearCart);

export default router;