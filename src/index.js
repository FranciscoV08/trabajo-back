// inicializador del server

import server from "./app.js"

const port = 8080 || process.env.PORT;

server.listen(port, () =>{
    console.log(`-----> Servidor funcionando en el puerto: http://localhost:${port}/api/`)
})
