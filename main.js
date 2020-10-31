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
// ** ACTUALIZAR PRODUCTOS FILTRADOS **
const productosMostrados = document.querySelector('.productos-mostrados')

const filtrarProductosMostrados = () => {
    let numeroProductosMostrados = 0
    for (let producto of productos) {
        if (pasaFiltros(producto)) {
            numeroProductosMostrados++
        }
    }
    productosMostrados.textContent = `Mostrando ${numeroProductosMostrados} producto(s) de ${productos.length}`
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

// ** SECCION CARRITO **

// ABRIR CARRITO

const botonAbrirCarrito = document.getElementById('abrir-carrito-btn')
const botonCerrarCarrito = document.getElementById('cerrar-carrito-btn')
const overlayCarrito = document.querySelector('.overlay-carrito')
const carrito = document.querySelector('.carrito')
const body = document.body

botonAbrirCarrito.onclick = () => {
    carrito.classList.remove('hidden')
    overlayCarrito.classList.remove('hidden')
    body.classList.add('no-scroll')
}

// CERRAR CARRITO

botonCerrarCarrito.onclick = () => {
    carrito.classList.add('hidden')
    overlayCarrito.classList.add('hidden')
    body.classList.remove('no-scroll')
}

// ** BOTON COMPRAR - VACIAR CARRITO **

const overlay = document.querySelector('.overlay')

const botonComprarCarrito = document.querySelector('.comprar-carrito-btn')
const botonVaciarCarrito = document.querySelector('.vaciar-carrito-btn')

const dialogoVaciarCarrito = document.querySelector('.vaciar-carrito-modal')
const confirmarVaciarCarritoBtn = document.querySelector('.confirmar-vaciar-btn')
const cancelarVaciarCarritoBtn = document.querySelector('.cancelar-vaciar-btn')

const checkoutCarrito = document.querySelector('.checkout')
const botonSeguirComprando = document.querySelector('.seguir-comprando-btn')
const finalizarCompra = document.querySelector('.finalizar-compra-btn')

// VACIAR CARRITO 
botonVaciarCarrito.onclick = () => {
    dialogoVaciarCarrito.classList.remove('hidden')
    overlay.classList.remove('hidden')
    checkoutCarrito.classList.add('hidden')
}

// CANCELAR VACIAR CARRITO
cancelarVaciarCarritoBtn.onclick = () => {
    dialogoVaciarCarrito.classList.add('hidden')
    overlay.classList.add('hidden')    
}

// CONFIRMAR VACIAR CARRITO
confirmarVaciarCarritoBtn.onclick = () => {
    dialogoVaciarCarrito.classList.add('hiddden')
    overlay.classList.add('hidden')
    carrito.classList.add('hidden')
    overlayCarrito.classList.add('hidden')
    body.classList.remove('no-scroll')
}

// COMPRAR PRODUCTOS
botonComprarCarrito.onclick = () => {
    overlay.classList.remove('hidden')
    checkoutCarrito.classList.remove('hidden')
    dialogoVaciarCarrito.classList.add('hidden')
}

// SEGUIR COMPRANDO
botonSeguirComprando.onclick = () => {
    overlay.classList.add('hidden')
    dialogoVaciarCarrito.classList.add('hidden')
}

// ** CHECKOUT **
const valorDescuento = document.querySelector('.valor-descuento-carrito')
const valorDelivery = document.querySelector('.valor-delivery-carrito')
const valorRecargo = document.querySelector('.valor-recargo-carrito')
const totalCarrito = document.querySelector('.valor-total-carrito')
const subtotalCarrito = document.querySelector('.valor-subtotal-carrito')

const productoCarrito = document.querySelectorAll('.producto-agregado')

// SUBTOTAL
const valorSubtotalCarrito = 83000

subtotalCarrito.textContent = (`${'$'}${valorSubtotalCarrito}`) 
totalCarrito.textContent = (`${'$'}${valorSubtotalCarrito}`)

// PAGO CON TARJETA CREDITO
const parrafoCredito = document.querySelector('.recargo-carrito')

const recargoCredito = (valorSubtotalCarrito) => {
    let recargo = valorSubtotalCarrito * 01
    return valorSubtotalCarrito + recargo
}

//RECARGO DE ENVIO
const parrafoDelivery = document.querySelector('.delivery-carrito')

const gastoEnvio = (valorSubtotalCarrito) => {
    return valorSubtotalCarrito + 300
}

//DESCUENTO
const parrafoDescuento = document.querySelector('.descuento-carrito')

const tieneDescuento = (valorSubtotalCarrito) => {
    let valorDescuento = valorSubtotalCarrito * 0.05
    return valorSubtotalCarrito - valorDescuento
}

// CHECKBOX - RADIO CHECKOUT
const radioEfectivo = document.querySelector('.efectivo')
const radioCredito = document.querySelector('.credito')
const checkboxEnvio = document.querySelector('.envio')
const checkboxDescuento = document.querySelector('.descuento')

radioEfectivo.oninput = () => {
    subtotalCarrito.textContent = (`${'$'}${valorSubtotalCarrito}`) 
    totalCarrito.textContent = obtenerTotal(valorSubtotalCarrito)
}

radioCredito.oninput = () => {
    parrafoCredito.classList.remove('hidden')
    valorRecargo.textContent = (recargoCredito(valorSubtotalCarrito) - valorSubtotalCarrito).toFixed(2)
    totalCarrito.textContent = (obtenerTotal(valorSubtotalCarrito)).toFixed(2)
}

checkboxDescuento.oninput = () => {
    parrafoDescuento.classList.toggle('hidden')
    valorDescuento.textContent = (valorSubtotalCarrito - tieneDescuento(valorSubtotalCarrito)).toFixed(2)
    totalCarrito.textContent = (obtenerTotal(valorSubtotalCarrito)).toFixed(2)
}

checkboxEnvio.oninput = () => {
    parrafoDelivery.classList.toggle('hidden')
    valorDescuento.textContent = 300
    totalCarrito.textContent = (obtenerTotal(valorSubtotalCarrito)).toFixed(2)
}

//TOTAL

const obtenerTotal = (valorSubtotalCarrito) => {
    let descuentoFinal = 0
    let recargoFinal = 0
    let envioFinal = 0

    if (checkboxDescuento.checked) {
        descuentoFinal = tieneDescuento(valorSubtotalCarrito) - valorSubtotalCarrito
    }
    if (radioCredito.checked) {
        recargoFinal = recargoCredito(valorSubtotalCarrito) - valorSubtotalCarrito
    }
    else {
        parrafoCredito.classList.add('hidden')
    }
    if (checkboxEnvio.checked) {
        envioFinal = gastoEnvio(valorSubtotalCarrito) - valorSubtotalCarrito
    }
    return valorSubtotalCarrito + descuentoFinal + recargoFinal + envioFinal
}