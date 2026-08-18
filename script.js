AOS.init({
  duration: 800,   
  once: true,      
  offset: 100        
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);


const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert('¡Te has unido al club! Atento a tu bandeja de entrada', 'light')
        document.getElementById("forms-news").reset();
    })
}

// ==================================================
// CARRITO
// ==================================================

let carrito = [];


// Elementos
const botonesComprar = document.querySelectorAll(".btn-comprar");
const btnCarrito = document.querySelector("#btn-carrito");
const btnCerrarCarrito = document.querySelector("#btn-cerrar-carrito");

const cartPanel = document.querySelector("#cart-panel");
const cartOverlay = document.querySelector("#cart-overlay");

const cartItems = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");


// ==================================================
// AGREGAR PRODUCTO
// ==================================================

botonesComprar.forEach((boton) => {

    boton.addEventListener("click", () => {
        const producto = {
            id: boton.dataset.id,
            nombre: boton.dataset.nombre,
            precio: Number(boton.dataset.precio),
            imagen: boton.dataset.imagen,
            cantidad: 1
        };
        agregarAlCarrito(producto);
    });

});


// ==================================================
// AGREGAR AL CARRITO
// ==================================================
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(
        item => item.id === producto.id
    );
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push(producto);
    }
    actualizarCarrito();
    abrirCarrito();
}


// ==================================================
// ACTUALIZAR CARRITO
// ==================================================

function actualizarCarrito() {
    cartItems.innerHTML = "";
    if (carrito.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                Tu carrito está vacío.
            </div>
        `;
        cartCount.textContent = "0";
        cartTotal.textContent = "$0";
        return;
    }


    let cantidadTotal = 0;
    let total = 0;
    carrito.forEach((producto) => {
        cantidadTotal += producto.cantidad;
        total += producto.precio * producto.cantidad;
        const item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="cart-item__image"
            >

            <div>

                <p class="cart-item__name">
                    ${producto.nombre}
                </p>

                <p class="cart-item__price">
                    $${formatearPrecio(producto.precio)}
                </p>

                <div class="cart-item__quantity">

                    <button
                        type="button"
                        onclick="cambiarCantidad('${producto.id}', -1)"
                    >
                        −
                    </button>

                    <span>
                        ${producto.cantidad}
                    </span>

                    <button
                        type="button"
                        onclick="cambiarCantidad('${producto.id}', 1)"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                type="button"
                class="cart-item__remove"
                onclick="eliminarProducto('${producto.id}')"
            >
                <img src="./img/eliminar.png" alt="eliminar" width="15px" height="15px">
            </button>

        `;
        cartItems.appendChild(item);
    });
    cartCount.textContent = cantidadTotal;
    cartTotal.textContent = `$${formatearPrecio(total)}`;
}


// ==================================================
// CAMBIAR CANTIDAD
// ==================================================

function cambiarCantidad(id, cambio) {
    const producto = carrito.find(
        item => item.id === id
    );
    if (!producto) return;
    producto.cantidad += cambio;
    if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }
    actualizarCarrito();
}


// ==================================================
// ELIMINAR PRODUCTO
// ==================================================

function eliminarProducto(id) {
    carrito = carrito.filter(
        producto => producto.id !== id
    );
    actualizarCarrito();
}


// ==================================================
// ABRIR CARRITO
// ==================================================

function abrirCarrito() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
    cartPanel.setAttribute("aria-hidden", "false");
}


// ==================================================
// CERRAR CARRITO
// ==================================================

function cerrarCarrito() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
    cartPanel.setAttribute("aria-hidden", "true");
}


// ==================================================
// EVENTOS DEL CARRITO
// ==================================================

btnCarrito.addEventListener("click", abrirCarrito);
btnCerrarCarrito.addEventListener("click", cerrarCarrito);
cartOverlay.addEventListener("click", cerrarCarrito);


// ==================================================
// FORMATO DE PRECIOS
// ==================================================

function formatearPrecio(precio) {
    return precio.toLocaleString("es-MX");
}


// ==================================================
// FINALIZAR COMPRA
// ==================================================

document
    .querySelector("#btn-finalizar")
    .addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }
        alert("Compra simulada. Aquí posteriormente iría el proceso de checkout.");
    });
// Inicializar
actualizarCarrito();