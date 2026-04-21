import { Server } from "socket.io";
import http from "http";
import app from "./app.js";
import ProductsModel from "./models/products.model.js";
import { connectDB } from "./config/db.js";

connectDB();

const port = 8080 || process.env.PORT;

const server = http.createServer(app);
const io = new Server(server);

app.set('socketio', io);

io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado");
    
    const emitProducts = async () => {
        const products = await ProductsModel.find().lean();
        io.emit("updateProducts", products);
    };

    try {
        const products = await ProductsModel.find().lean();
        socket.emit("updateProducts", products);
    } catch (error) {
        console.error(error);
    }

    socket.on("addProduct", async (product) => {
        try {
            await ProductsModel.create(product);
            await emitProducts();
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("deleteProduct", async (id) => {
        try {
            await ProductsModel.findByIdAndDelete(id);
            await emitProducts();
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});

server.listen(port, () => {
    console.log(`-----> Servidor funcionando en el puerto: http://localhost:${port}/`)
});
