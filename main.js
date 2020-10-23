const busquedaProducto = document.getElementById("busqueda-input") //INPUT BUSQUEDA//
const productos = document.querySelectorAll(".producto") //LISTA DE PRODUCTOS
const filtroCategoria = document.querySelectorAll(".filtro-categoria") //LISTA DE CHECKBOX CATEGORIA
const filtroPuntaje = document.querySelectorAll(".filtro-review") //LISTA DE CHECKBOX PUNTAJE

// FILTROS RESPONSIVE

const botonFiltrosResponsive = document.getElementsByClassName('filtros-responsive-btn')

// FILTRO PRODUCTOS

const mostrarProductos = (producto) => {
    return producto.classList.remove('hidden')
}

const ocultarProductos = (producto) => {
    return producto.classList.add('hidden')
}

// ** FILTROS **

busquedaProducto.oninput = () => {
    filtrarProductos()
    filtrarProductosMostrados()
};

for (let checkbox of filtroCategoria) {
    checkbox.onclick = () => {
        filtrarProductos()
        filtrarProductosMostrados()
    }
};

for (let checkbox of filtroPuntaje) {
    checkbox.onclick = () => {
        filtrarProductos()
        filtrarProductosMostrados()
    }
};

const filtrarProductos = () => {
    for (let producto of productos) {
        if (pasaFiltros(producto)) {
            mostrarProductos(producto)
        }
        else {
            ocultarProductos(producto)
        }
    }
};

const pasaFiltros = (producto) => {
    if (
        pasaFiltroBusqueda(producto) &&
        pasaFiltroCategoria(producto) &&
        pasaFiltroPuntaje(producto)) {
        return true
    }
    else {
        return false
    }
};

// FILTRO BUSQUEDA

const pasaFiltroBusqueda = (producto) => {
    if (inputTieneBusqueda()) {
        if (busquedaCoincideConProducto(producto)) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return true
    }
}

const inputTieneBusqueda = () => {
    return Boolean(busquedaProducto.value)
}

const busquedaCoincideConProducto = (producto) => {
    if (producto.dataset.name.includes(busquedaProducto.value.toLowerCase())) {
        return true
    }
    else {
        return false
    }
}

// FILTRO CATEGEORIA

const pasaFiltroCategoria = (producto) => {
    if (checkboxCategoriaSeleccionado()) {
        if (coincideCategoriaConProducto(producto)) {
            return true
        }
        else {
            return false
        }
    }
    return true
}

const checkboxCategoriaSeleccionado = () => {
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            return true
        }
    }
}

const coincideCategoriaConProducto = (producto) => {
    const categoria = producto.dataset.category
    for (let checkbox of filtroCategoria) {
        if (checkbox.checked) {
            if (checkbox.value === categoria) {
                return true
            }
        }
    }
    return false
}


// FILTRO PUNTAJE 

const pasaFiltroPuntaje = (producto) => {
    if (checkboxPuntajeSeleccionado()) {
        if (coincidePuntajeConProducto(producto)) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return true
    }
    
}

const checkboxPuntajeSeleccionado = () => {
    for (let checkbox of filtroPuntaje) {
        if (checkbox.checked) {
            return true
        }
    }
}

const coincidePuntajeConProducto = (producto) => {
    const puntaje = producto.dataset.review
    for (let checkbox of filtroPuntaje) {
        if (checkbox.checked) {
            if(checkbox.value === puntaje) {
                return true
            }
        }
    }
    return false
}

const filtrarPuntaje = () => {
    for (let producto of productos) {
        producto.classList.add('hidden')
        if (checkboxSeleccionado()) {
            if (coincideCheckboxConProducto(producto)) {
                producto.classList.remove('hidden')
            }
        }
        else {
            producto.classList.remove('hidden')
        }
    }
}
// ACTUALIZAR PRODUCTOS FILTRADOS 

const productosTotales = document.getElementsByClassName('productos-total')
const productosMostrados = document.getElementsByClassName('productos-mostrados')
const productosOcultos = document.getElementsByClassName('productos hidden')

const filtrarProductosMostrados = () => {
    productosFiltrados = productos.length - productosOcultos.length
    productosMostrados.textContent = productosFiltrados
    productosTotales.textContent = productos.length
}


// ** LIMPIAR FILTROS ** 

const filtros = document.querySelectorAll(".filtro")
const limpiarFiltrosBtn = document.querySelector(".limpiar-filtros-btn")

limpiarFiltrosBtn.onclick = () => {
    busquedaProducto.value = ''
    for (let producto of productos) {
        producto.classList.remove('hidden');
    }
    for (let filtro of filtros) {
        filtro.checked = false;
    }
    filtrarProductosMostrados()
}

// ABRIR CARRITO 

const botonAbrirCarrito = document.getElementById('abrir-carrito-btn')
const botonCerrarCarrito = document.getElementById('cerrar-carrito-btn')
const overlaySidebar = document.getElementsByClassName('overlay-sidebar')
const carrito = document.querySelector('.carrito')
const body = document.body

botonAbrirCarrito.onclick = () => {
    carrito.classList.remove('hidden')
    overlaySidebar.classList.remove('hidden')
    body.classList.add('no-scroll')
}

botonCerrarCarrito.onclick = () => {
    carrito.classList.add('hidden')
    overlaySidebar.classList.remove('hidden')
    body.classList.remove('no-scroll')
}