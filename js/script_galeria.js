// Variables

const btnCierra = document.querySelector('#btn-de-cierre');
const btnAdelanta = document.querySelector('#btn-de-siguiente');
const btnRetrocede = document.querySelector('#btn-de-retroceso');
const imagenes = document.querySelectorAll('#galeria img');
const lightbox = document.querySelector('#contenedor-principal');
const imagenActiva = document.querySelector('#img-activa');
let indiceImagen = 0;

// Pulsar imagen (abre el lightbox)

const abreLightbox = (event) => {
    imagenActiva.src = event.target.src;
    indiceImagen = Array.from(imagenes).indexOf(event.target);
    lightbox.style.visibility = 'visible';
};

imagenes.forEach((imagen) => {
    imagen.addEventListener('click', abreLightbox);
});

// Cierra el lightbox

btnCierra.addEventListener('click', () => {
    lightbox.style.visibility = 'hidden';
});

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.visibility = 'hidden';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        lightbox.style.visibility = 'hidden';
    }
});

// Adelanta la imagen

const adelantaImagen = () => {
    indiceImagen = (indiceImagen + 1) % imagenes.length;
    imagenActiva.src = imagenes[indiceImagen].src;

}

btnAdelanta.addEventListener('click', adelantaImagen);

// Con flechas del teclado

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        adelantaImagen();
    };
});

// Retrocede la imagen

const retrocedeImagen = () => {
    indiceImagen = (indiceImagen - 1 + imagenes.length) % imagenes.length;
    imagenActiva.src = imagenes[indiceImagen].src;
}

btnRetrocede.addEventListener('click', retrocedeImagen);

// Con flechas del teclado

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        retrocedeImagen();
    };
});