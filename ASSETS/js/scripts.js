// assets/js/scripts.js


document.addEventListener("DOMContentLoaded", () => {
    loadComics();
    loadBestSellingComics(); // Agregar esta línea para cargar los cómics más vendidos
});

async function loadBestSellingComics() {
    try {
        const response = await fetch('/api/best-sellers');
        const data = await response.json();
        displayBestSellingComics(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayBestSellingComics(comics) {
    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = ''; // Limpiar el contenido del carrusel

    comics.forEach((comic, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active'); // Hacer que el primer ítem sea activo

        carouselItem.innerHTML = `
            <img src="${comic.image.medium_url}" class="d-block w-100" alt="${comic.name}">
            <div class="carousel-caption d-none d-md-block">
                <h5>${comic.name}</h5>
                <p>${comic.volume.name} - Issue #${comic.issue_number}</p>
            </div>
        `;
        carouselInner.appendChild(carouselItem);
    });
}
async function loadComics() {
    try {
        const response = await fetch('/api/issues');
        const data = await response.json();
        displayComics(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function displayComics(comics) {
    const comicsContainer = document.getElementById('comics-container');
    comicsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los cómics

    comics.forEach(comic => {
        const comicElement = document.createElement('div');
        comicElement.classList.add('col-md-4');
        comicElement.innerHTML = `
            <div class="card mb-4">
            <img src="${comic.image.medium_url}" class="card-img-top" alt="${comic.name}">
            <div class="card-body">
                <h5 class="card-title">${comic.name}</h5>
                <p class="card-text">Volume: ${comic.volume.name}</p>
                <p class="card-text">Issue Number: ${comic.issue_number}</p>
                <p class="card-text">Publish Date: ${comic.cover_date}</p>
                <p class="producto" data-nombre="COMIC" data-precio="20000" data-stock="5">
            Comic - $20.000 
            <button class="agregar">Agregar al carrito</button>
            </div>
            </div>
            </div>`;
    
        
    comicsContainer.appendChild(comicElement);
    });



    async function loadMangas() {
    try {
        const response = await fetch('/api/mangas');
        const data = await response.json();
        displayMangas(data.results);
    } catch (error) {
        console.error('Error fetching manga data:', error);
    }
}

function displayMangas(mangas) {
    const comicsContainer = document.getElementById('comics-container');
    comicsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los mangas

    mangas.forEach(manga => {
        const mangaElement = document.createElement('div');
        mangaElement.classList.add('col-md-4');
        mangaElement.innerHTML = `
            <div class="card mb-4">
                <img src="${manga.image_url}" class="card-img-top" alt="${manga.title}">
                <div class="card-body">
                    <h5 class="card-title">${manga.title}</h5>
                    <p class="card-text">Score: ${manga.score}</p>
                    <p class="card-text">Chapters: ${manga.chapters}</p>
                    <p class="card-text">Volumes: ${manga.volumes}</p>
                </div>
            </div>
        `;
        comicsContainer.appendChild(mangaElement);
    });
}
async function loadMangas() {
    try {
        const response = await fetch('/api/mangas');
        const data = await response.json();
        displayMangas(data.results);
    } catch (error) {
        console.error('Error fetching manga data:', error);
    }
}

function displayMangas(mangas) {
    const comicsContainer = document.getElementById('comics-container');
    comicsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los mangas

    mangas.forEach(manga => {
        const mangaElement = document.createElement('div');
        mangaElement.classList.add('col-md-4');
        mangaElement.innerHTML = `
            <div class="card mb-4">
                <img src="${manga.image_url}" class="card-img-top" alt="${manga.title}">
                <div class="card-body">
                    <h5 class="card-title">${manga.title}</h5>
                    <p class="card-text">Score: ${manga.score}</p>
                    <p class="card-text">Chapters: ${manga.chapters}</p>
                    <p class="card-text">Volumes: ${manga.volumes}</p>
                </div>
            </div>
        `;
        comicsContainer.appendChild(mangaElement);
    });
}
const carrito = [];

document.querySelectorAll('.agregar').forEach(button => {
    button.addEventListener('click', agregarAlCarrito);
});

function agregarAlCarrito(event) {
    const producto = event.target.parentElement;
    const nombre = producto.dataset.nombre;
    const precio = parseFloat(producto.dataset.precio);
    const stock = parseInt(producto.dataset.stock);

    if (stock > 0) {
        carrito.push({ nombre, precio });
        producto.dataset.stock = stock - 1;
        actualizarCarrito();
    } else {
        alert('¡Producto agotado!');
    }
}

function eliminarDelCarrito(index) {
    const producto = carrito[index];
    const productos = document.querySelectorAll('.producto');
    const productoHTML = Array.from(productos).find(p => p.dataset.nombre === producto.nombre);
    productoHTML.dataset.stock = parseInt(productoHTML.dataset.stock) + 1;

    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoElemento = document.getElementById('carrito');
    carritoElemento.innerHTML = '';

    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));
        li.appendChild(botonEliminar);
        carritoElemento.appendChild(li);
    });
}
}
