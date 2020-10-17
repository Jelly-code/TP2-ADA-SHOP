// ** FILTRO POR BUSQUEDA **

const busquedaProducto = document.getElementById("busqueda-input")
const productos = document.querySelectorAll(".producto")


busquedaProducto.oninput = () => {
    for (let producto of productos) {
        const nombre = producto.dataset.name.toLowerCase();
        const busquedaUsuario = busquedaProducto.value.toLowerCase();
        if (nombre.includes(busquedaUsuario)) {
            producto.classList.remove('hidden')
        }
        else {
            producto.classList.add('hidden')
        }
    }
}

// ** FILTRO POR CATEGORIA **

const filtroCategoria = document.querySelectorAll(".filtro-categoria")
console.log(filtroCategoria)
for (let checkbox of filtroCategoria) {
    checkbox.oninput = () => {
        filtrarProductos();
    }
}

const haypuntajeeleccionado = () => {
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            return true
        }
    }
}

const coincideCheckboxYProducto = producto => {
    const category = producto.dataset.category;
    for (let checkbox of filtroCategoria) {
        if (checkbox.value === category && checkbox.checked) {
            return true
        }
    }
}

const filtrarProductos = () => {
    for (let producto of productos) {
        producto.classList.add('hidden')
        if (haypuntajeeleccionado()) {
            if (coincideCheckboxYProducto(producto)) {
                producto.classList.remove('hidden')
            }
        }
        else {
            producto.classList.remove('hidden')
        }
    }
}

// ** FILTRO POR PUNTAJE **

const filtroPuntaje = document.querySelectorAll(".filtro-review")
console.log(filtroPuntaje)
for (let puntaje of filtroPuntaje) {
    puntaje.oninput = () => {
        filtrarPuntaje();
    }
}

const hayPuntajeSeleccionado = () => {
    for (let puntaje of filtroPuntaje) {
        if (puntaje.checked) {
            return true
        }
    }
}

const coincidePuntajeYProducto = producto => {
    const review = producto.dataset.review;
    for (let puntaje of filtroPuntaje) {
        if (puntaje.value === review && puntaje.checked) {
            return true
        }
    }
}

const filtrarPuntaje = () => {
    for (let producto of productos) {
        producto.classList.add('hidden')
        if (hayPuntajeSeleccionado()) {
            if (coincidePuntajeYProducto(producto)) {
                producto.classList.remove('hidden')
            }
        }
        else {
            producto.classList.remove('hidden')
        }
    }
}