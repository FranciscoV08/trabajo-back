// inicializador del server
import { Server } from "socket.io";
import http from "http";
import app from "./app.js"
import fs from 'fs';

const port = 8080 || process.env.PORT;

const server = http.createServer(app);
const io = new Server(server);

// Guardamos io en el app para usarlo en los controllers si es necesario
app.set('socketio', io);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    
    const ruta = "./src/db-JSON/products.json";

    // Función para leer y emitir productos
    const emitProducts = () => {
        const contenido = fs.readFileSync(ruta, "utf-8");
        const products = JSON.parse(contenido);
        io.emit("updateProducts", products);
    };

    // Al conectarse, enviamos la lista al cliente
    if (fs.existsSync(ruta)) {
        const contenido = fs.readFileSync(ruta, "utf-8");
        const products = JSON.parse(contenido);
        socket.emit("updateProducts", products);
    }

    // Manejar agregado desde socket
    socket.on("addProduct", (product) => {
        const contenido = fs.readFileSync(ruta, "utf-8");
        const products = JSON.parse(contenido);
        // Usamos una función simple para ID si no queremos importar utils
        const newProduct = { ...product, id: Date.now().toString() };
        products.push(newProduct);
        fs.writeFileSync(ruta, JSON.stringify(products, null, 2));
        emitProducts();
    });

    // Manejar eliminación desde socket
    socket.on("deleteProduct", (id) => {
        const contenido = fs.readFileSync(ruta, "utf-8");
        const products = JSON.parse(contenido);
        const filteredProducts = products.filter(p => p.id != id);
        fs.writeFileSync(ruta, JSON.stringify(filteredProducts, null, 2));
        emitProducts();
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});


server.listen(port, () =>{
    console.log(`-----> Servidor funcionando en el puerto: http://localhost:${port}/`)
})

