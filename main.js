// ** FILTRO POR BUSQUEDA **

const busquedaProducto = document.getElementById("busqueda-input")
const productos = document.querySelectorAll(".producto")


const busquedaUsuario = () => {
    if (busquedaProducto.value) {
        return true;
    } 
    
    else {
        return false;
    }
}

const pasaFiltroBusqueda = (producto) => {
    if (busquedaUsuario()) {
        if (coincideBusquedaConProducto(producto)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}

const coincideBusquedaConProducto = (producto) => {
    let nombre = producto.dataset.name;
    let busquedaInput = busquedaProducto.value.toLowerCase();

    if (nombre.includes(busquedaInput)) {
        return true;
    } 
    else {
        return false;
    }
}

// ** FILTRO POR CATEGORIA **

const filtroCategoria = document.querySelectorAll(".filtro-categoria")

for (let checkbox of filtroCategoria) {
    checkbox.oninput = () => {
        filtroProductos();
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

const filtroProductos = () => {
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

// ** FILTROS AL MISMO TIEMPO **

const ocultarProducto = (producto) => {
    return producto.classList.add("hidden");
  };
  
const mostrarProducto = (producto) => {
    return producto.classList.remove("hidden");
};

const pasaFiltros = (producto) => {
    if (pasaFiltroBusqueda(producto) &&
        filtrarPuntaje(producto) &&
        filtroProductos()
        ) {
        return true;        
    }
    else {
        return false;
    }
}

const filtroProductoFinal = () => {
    for (let producto of productos) {
      if (pasaFiltros(producto)) {
        mostrarProducto(producto);
      } else {
        ocultarProducto(producto);
      }
    }
  };

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
}

// ** ACTUALIZAR PRODUCTOS FILTRADOS **

// let cantidad = 0
// const cantidadProductosFiltrados = document.getElementsByClassName("productos-filtrados-cant")

// const actualizarCantidadProductosFiltrados = () => {
//     for (let producto of productos) {
//         if (pasaFiltros(producto)) {
//             cantidad++
//         }
//     }
//     cantidadProductosFiltrados.innerText = `Mostrando ${cantidad} producto(s) de ${productos.length}`
// }

// const actualizarProductosFiltrados = () => {
//     for (let producto of productos) {
//         if (pasaFiltros(producto)) {
//             producto.classList.remove('hidden')
//         }
//         else {
//             producto.classList.add('hidden')
//         }
//     }
// }

// const filtrarProductosFinal = () => {
//     actualizarProductosFiltrados()
//     actualizarCantidadProductosFiltrados();
// }