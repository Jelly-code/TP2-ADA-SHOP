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