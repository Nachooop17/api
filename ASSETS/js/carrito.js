console.log("Esta funcionando");
const carrito = [];

document.querySelectorAll('.agregar-al-carrito').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(event) {
    const comic = event.target.parentElement;
    const nombre = comic.querySelector('.card-title').textContent;
    const precio = parseFloat(comic.querySelector('.precio').textContent);
    const stock = parseInt(comic.querySelector('.stock').textContent);

    if (stock > 0) {
        carrito.push({ nombre, precio });
        comic.querySelector('.stock').textContent = stock - 1;
        actualizarCarrito();
    } else {
        alert('¡Producto agotado!');
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';

    carrito.forEach((comic, index) => {
        const li = document.createElement('li');
        li.textContent = `${comic.nombre} - $${comic.precio}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));
        li.appendChild(botonEliminar);
        carritoElemento.appendChild(li);
    });
}
