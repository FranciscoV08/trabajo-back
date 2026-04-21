import ProductsModel from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
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
        const status = result ? "success" : "error";

        const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;
        const buildPrevLink = result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;
        const buildNextLink = result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}` : null;

        res.json({
            status,
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: buildPrevLink,
            nextLink: buildNextLink
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const getIdProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductsModel.findById(id).lean();

        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        res.json({ status: "success", payload: product });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const addProduct = async (req, res) => {
    try {
        const producto = req.body;
        const newProduct = await ProductsModel.create(producto);

        const io = req.app.get('socketio');
        if (io) {
            const allProducts = await ProductsModel.find().lean();
            io.emit('updateProducts', allProducts);
        }

        res.status(201).json({ status: "success", payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await ProductsModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }

        const io = req.app.get('socketio');
        if (io) {
            const allProducts = await ProductsModel.find().lean();
            io.emit('updateProducts', allProducts);
        }

        res.json({ status: "success", message: "Producto eliminado", payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productForm = req.body;

        const updatedProduct = await ProductsModel.findByIdAndUpdate(id, productForm, { new: true, lean: true });
        if (!updatedProduct) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", message: "Producto actualizado", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
}