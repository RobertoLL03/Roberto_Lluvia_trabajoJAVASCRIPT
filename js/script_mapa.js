let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    alert('Los servicios de geolocalización no están disponibles.');
}

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('map', {
        center: [latitude, longitude],
        zoom: 17
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Definir iconos

    let inicio = L.icon({
        iconUrl: '/images/leaf-green.png',
        shadowUrl: '/images/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -90]
    })

    let final = L.icon({
        iconUrl: '/images/leaf-red.png',
        shadowUrl: '/images/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -90]
    })

    let track = L.icon({
        iconUrl: '/images/leaf-orange.png',
        shadowUrl: '/images/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -90]
    })

    // Calcular ruta

    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(40.959834, -5.657975)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps) {
            switch(i) {
                case 0:
                    return L.marker(wp.latLng, {icon: inicio, draggable: true}).bindPopup('Inicio (estoy aquí)');
                case nWps - 1:
                    return L.marker(wp.latLng, {icon: final, draggable: true}).bindPopup('Destino');
                default:
                    return L.marker(wp.latLng, {icon: track, draggable: true}).bindPopup('Paso intermedio');
            }
        }
    }).addTo(map);
}

function error() {
    let map = L.map('map', {
        center: [40.959834, -5.657975],
        zoom: 17
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}