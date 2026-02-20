import { Router } from "express";
import { addProductCart, createCart, getAllProductsId } from "../controllers/carts.controllers.js";

const router = Router();

router.post("/carts", createCart)
router.get("/carts/:cid", getAllProductsId)
router.post("/carts/:cid/product/:pid", addProductCart)


export default router