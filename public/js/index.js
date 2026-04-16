const socket = io();

const productsContainer = document.getElementById('real-time-products');
const productForm = document.getElementById('product-form');

// Escuchar actualización de productos
socket.on('updateProducts', (products) => {
    productsContainer.innerHTML = '';
    products.forEach(prod => {
        const div = document.createElement('div');
        div.classList.add('product-card');
        div.innerHTML = `
            <h3>${prod.title}</h3>
            <p>${prod.description}</p>
            <p>Precio: $${prod.price}</p>
            <p>Código: ${prod.code}</p>
            <button onclick="deleteProduct('${prod.id}')">Eliminar</button>
        `;
        productsContainer.appendChild(div);
    });
});

// Enviar nuevo producto
productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: Number(document.getElementById('price').value),
        code: document.getElementById('code').value,
        stock: Number(document.getElementById('stock').value),
        category: document.getElementById('category').value,
        status: true
    };
    
    // Podemos enviarlo via fetch a la API y que la API emita el socket,
    // o enviarlo directamente por socket.
    // La consigna sugiere: "Para que el contenido se envíe desde websockets y no HTTP"
    // Sin embargo, también dice: "Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST"
    
    // Usaremos Socket para la creación directamente como sugiere la opción simple
    socket.emit('addProduct', product);
    productForm.reset();
});

// Función para eliminar producto
window.deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
};
