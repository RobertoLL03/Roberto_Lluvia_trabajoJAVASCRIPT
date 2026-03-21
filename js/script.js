// Extraer noticias del archivo JSON

fetch('../data/noticias.json')
  .then(respuesta => respuesta.json())
  .then(datosJSON => {
    const divNoticias = document.getElementById('noticias');

    datosJSON.forEach(noticia => {
      const h1 = document.createElement('h1');
      h1.textContent = noticia.titulo;

      const p = document.createElement('p');
      p.textContent = noticia.subtitulo;

      divNoticias.appendChild(h1);
      divNoticias.appendChild(p);
    });
  });

// Formulario

let formulario = document.getElementById('presupuesto');

let inputNombre = document.getElementById('nombre');
let inputApellidos = document.getElementById('apellidos');
let inputTelefono = document.getElementById('telefono');
let inputCorreo = document.getElementById('correoElect');
let checkAlfombrilla = document.getElementById('alfombrilla');
let checkToallitas = document.getElementById('toallitas');
let checkPasta = document.getElementById('pasta');

// Introducimos los requisitos y limitaciones de cada campo

// Caracteres únicamente permitidos en el nombre

inputNombre.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g, '');
});

// Máximo de caracteres del nombre

inputNombre.maxLength = 15;

// Caracteres únicamente permitidos en los apellidos

inputApellidos.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]/g, '');
});

// Máximo de caracteres de los apellidos

inputApellidos.maxLength = 40;

// Caracteres (números) únicamente permitidos en el número de teléfono

inputTelefono.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9\s]/g, '');
});

// Máximo de caracteres del número

inputTelefono.maxLength = 9;

// Asignar elementos del DOM en variables para notificar errores

let errorNombre = document.getElementById('errorNombre');
let errorApellidos = document.getElementById('errorApellidos');
let errorTelefono = document.getElementById('errorTelefono');
let errorCorreo = document.getElementById('errorCorreo');

// Comprobar inputs y notificar sus respectivos errores en caso de tenerlos

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Limpiar errores anteriores

    errorNombre.textContent = '';
    errorApellidos.textContent = '';
    errorTelefono.textContent = '';
    errorCorreo.textContent = '';

    inputNombre.classList.remove('input-error');
    inputApellidos.classList.remove('input-error');
    inputTelefono.classList.remove('input-error');
    inputCorreo.classList.remove('input-error');

    let valido = true;

    // Validar nombre

    if (inputNombre.value.trim().length < 2) {
      errorNombre.textContent = 'Debe tener al menos 2 letras.';
      inputNombre.classList.add('input-error');
      valido = false;
    }

    // Validar apellidos

    if (inputApellidos.value.trim().length < 2) {
      errorApellidos.textContent = 'Debe tener al menos 2 letras.';
      inputApellidos.classList.add('input-error');
      valido = false;
    }

    // Validar teléfono

    if (!/^[0-9]{9}$/.test(inputTelefono.value.trim())) {
      errorTelefono.textContent = 'Debe tener exactamente 9 números.';
      inputTelefono.classList.add('input-error');
      valido = false;
    }

    // Validar correo

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputCorreo.value.trim())) {
      errorCorreo.textContent = 'Introduce un correo válido.';
      inputCorreo.classList.add('input-error');
      valido = false;
    }

    // Enviar formulario si cumple todos los requisitos anteriores

    if (valido) {
      formulario.submit();
    }
});

// Cálculo del presupuesto total

// Precios de productos

const preciosProductos = {
    teclado: 35,
    raton: 28,
    monitor: 240
};

// Precios de extras

const preciosExtras = {
    alfombrilla: 5,
    toallitas: 3,
    pasta: 7
};

// Elementos

const selectProducto = document.getElementById('productos');
const plazoInput = document.getElementById('plazo');
const extras = document.querySelectorAll('.extra');
const presupTotal = document.getElementById('presupTotal');
const errorExtras = document.getElementById('errorExtras');

// Función para calcular presupuesto

function calcularPresupuesto() {

    let total = 0;

    // Producto

    const productoSeleccionado = selectProducto.value;
    total += preciosProductos[productoSeleccionado];

    // Extras

    let extrasSeleccionados = 0;

    extras.forEach(extra => {
        if (extra.checked) {
            total += preciosExtras[extra.id];
            extrasSeleccionados++;
        }
    });

    // Descuento por plazo

    const dias = parseInt(plazoInput.value);

    if (!isNaN(dias)) {
        let descuento = 0;

        if (dias >= 4 && dias <= 7) {
            descuento = 0.05;
        } else if (dias >= 8) {
            descuento = 0.10;
        }

        total = total - (total * descuento);
    }

    // Mostrar total

    presupTotal.textContent = total.toFixed(2) + " €";
}

// Eventos

selectProducto.addEventListener('change', calcularPresupuesto);
plazoInput.addEventListener('input', calcularPresupuesto);
extras.forEach(extra => {
    extra.addEventListener('change', calcularPresupuesto);
});
