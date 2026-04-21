const socket = io();

const productsContainer = document.getElementById('real-time-products');
const productForm = document.getElementById('product-form');

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
            <button onclick="deleteProduct('${prod._id}')">Eliminar</button>
        `;
        productsContainer.appendChild(div);
    });
});

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
    
    socket.emit('addProduct', product);
    productForm.reset();
});

window.deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
};
