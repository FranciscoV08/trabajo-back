import CartsModel from "../models/carts.model.js";

export const createCart = async (req, res) => {
    try {
        const newCart = await CartsModel.create({ products: [] });
        res.status(201).json({ status: "success", payload: newCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const getAllProductsId = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartsModel.findById(cid).lean();

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.json({ status: "success", payload: cart.products });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const addProductCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await CartsModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json({ status: "success", message: "Producto agregado al carrito", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await CartsModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();

        res.json({ status: "success", message: "Producto eliminado del carrito" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const cart = await CartsModel.findByIdAndUpdate(
            cid,
            { products },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.json({ status: "success", message: "Carrito actualizado", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await CartsModel.findById(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

        if (productIndex === -1) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();

        res.json({ status: "success", message: "Cantidad actualizada", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await CartsModel.findByIdAndUpdate(
            cid,
            { products: [] },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
        }

        res.json({ status: "success", message: "Carrito vaciado", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}