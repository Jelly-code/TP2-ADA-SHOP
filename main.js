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

const hayCheckboxSeleccionado = () => {
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
        if (hayCheckboxSeleccionado()) {
            if (coincideCheckboxYProducto(producto)) {
                producto.classList.remove('hidden')
            }
        }
        else {
            producto.classList.remove('hidden')
        }
    }
}