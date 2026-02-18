import { Router } from "express";

import { addProduct, deleteProduct, getAllProducts, getIdProduct, updateProduct } from "../controllers/products.controllers.js";

const router = Router();

router.get("/products", getAllProducts)
router.get("/products/:id",getIdProduct)
router.post("/products", addProduct)
router.delete("/products/:id", deleteProduct)
router.put("/products/:id", updateProduct)

export default router