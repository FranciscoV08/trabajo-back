import { Router } from "express";
import ProductsModel from "../models/products.model.js";
import CartsModel from "../models/carts.model.js";

const router = Router();

router.get("/products", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filter = {};
        if (query) {
            if (query === 'available') {
                filter.status = true;
            } else if (query === 'unavailable') {
                filter.status = false;
            } else {
                filter.category = query;
            }
        }

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
            lean: true
        };

        const result = await ProductsModel.paginate(filter, options);

        res.render("products", {
            products: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null
        });
    } catch (error) {
        res.status(500).render("error", { message: error.message });
    }
});

router.get("/products/:pid", async (req, res) => {
    try {
        const product = await ProductsModel.findById(req.params.pid).lean();
        if (!product) {
            return res.status(404).render("error", { message: "Producto no encontrado" });
        }
        res.render("productDetail", { product });
    } catch (error) {
        res.status(500).render("error", { message: error.message });
    }
});

router.get("/carts/:cid", async (req, res) => {
    try {
        const cart = await CartsModel.findById(req.params.cid).populate('products.product').lean();
        if (!cart) {
            return res.status(404).render("error", { message: "Carrito no encontrado" });
        }
        res.render("cart", { cart });
    } catch (error) {
        res.status(500).render("error", { message: error.message });
    }
});

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");
});

export default router;
