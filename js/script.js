const productos = [
    {
      imagen: "../img/espaldera_principal.JPG",
      titulo: "Espaldera",
      descripcion: "Su estructura permite realizar estiramientos que alivian tensiones, especialmente en la espalda y las piernas. Ideal para combatir dolores por malas posturas o trabajo sedentario.",
      precio: 40.00,
    },
    {
      imagen: "../img/muñequera_libre.JPG",
      titulo: "Muñequera libre",
      descripcion: "¿Sientes molestias en la muñeca o necesitas un soporte extra para tus actividades diarias? Nuestra muñequera libre es la solución perfecta para quienes buscan aliviar el dolor y proteger sus articulaciones sin perder movilidad.",
      precio: 20.00,
    },
    {
      imagen: "../img/muñequera_res.JPG",
      titulo: "Muñequera restrictiva",
      descripcion: "Su diseño limita el rango de movimiento de la muñeca, brindando una protección esencial en casos de lesiones, esguinces o tendinitis, ayudando a prevenir movimientos que puedan agravar la lesión.",
      precio: 25.00,
    },
    {
      imagen: "../img/zapatilla_principal.JPG",
      titulo: "Calzado Siliconair",
      descripcion: "Descubre la libertad de movimiento y el confort superior con Siliconair, un calzado diseñado para quienes buscan bienestar y estilo en todo momento.",
      precio: 50.00,
    },
];

const IVA = 0.21;
const IMPUESTOS = IVA;

document.addEventListener("DOMContentLoaded", () => {
  const productSection = document.getElementById("product-section");
  actualizarContadorCarrito();

  const carritoIcono = document.getElementById("cart-icon");
  const carritoVentana = document.getElementById("cart-dropdown");
  const carritoContador = document.getElementById("cart-count");
  // Alternar la visibilidad del carrito
  carritoIcono.addEventListener("click", (event) => {
      event.stopPropagation();
      carritoVentana.classList.toggle("visible");
      carritoContador.classList.toggle("hidden");
  });

  // Cerrar el carrito al hacer clic fuera
  carritoVentana.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  document.addEventListener("click", () => {
    carritoVentana.classList.remove("visible");
    carritoContador.classList.remove("hidden");
  });

  function actualizarContadorCarrito() {
    const cartCount = document.getElementById("cart-count");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    cartCount.textContent = carrito.length;
    cartCount.classList.add("updated");
    actualizarVentanaCarrito();
    setTimeout(() => cartCount.classList.remove("updated"), 500);
  }

  function actualizarVentanaCarrito() {
    const items = document.getElementById("cart-items");
    const totalVentana = document.getElementById("cart-total");
    items.innerHTML = ""; // Limpiar contenido previo
    let total = 0;
  
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.forEach(producto => {
      const item = document.createElement("div");
      item.classList.add("cart-item");
  
      // Título del producto con cantidad
      const titulo = document.createElement("span");
      titulo.textContent = `${producto.titulo} (x${producto.cantidad})`;
  
      // Precio del producto
      const precio = document.createElement("span");
      total += producto.precio * producto.cantidad;
      precio.textContent = `$${(producto.precio * producto.cantidad).toFixed(2)}`;
  
      // Botón para incrementar la cantidad
      const incrementar = document.createElement("button");
      incrementar.textContent = "+";
      incrementar.classList.add("quantity-btn");
      incrementar.addEventListener("click", () => {
        producto.cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarVentanaCarrito();
      });
  
      // Botón para disminuir la cantidad
      const disminuir = document.createElement("button");
      disminuir.textContent = "-";
      disminuir.classList.add("quantity-btn");
      disminuir.addEventListener("click", () => {
        if (producto.cantidad > 1) {
          producto.cantidad -= 1;
        } else {
          carrito.splice(carrito.indexOf(producto), 1);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarVentanaCarrito();
      });
  
      // Botón de eliminar
      const boton = document.createElement("button");
      boton.innerHTML = '<i class="fas fa-times"></i>';
      boton.classList.add("remove-item-btn");
      boton.addEventListener("click", () => {
        carrito.splice(carrito.indexOf(producto), 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarVentanaCarrito();
        actualizarContadorCarrito();
      });
  
      // Agregar elementos al item
      item.appendChild(titulo);
      item.appendChild(precio);
      item.appendChild(incrementar);
      item.appendChild(disminuir);
      item.appendChild(boton);
  
      // Agregar item al contenedor del carrito
      items.appendChild(item);
    });
  
    totalVentana.textContent = `Total: $${total.toFixed(2)}`;
  }

  function agregarAlCarrito(index) {
    const producto = productos[index];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existente = carrito.find(item => item.titulo === producto.titulo);
  
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarVentanaCarrito();
    actualizarContadorCarrito();
  }

  function limpiarCarrito() {
    localStorage.removeItem("carrito");
    actualizarContadorCarrito();
  }
  const limpiar = document.getElementById("cart-clear");
  limpiar.addEventListener("click", () => {
    limpiarCarrito();
  });

  function actualizarResumenCheckout() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const itemList = document.getElementById("item-list");
    const modalSubtotal = document.getElementById("modal-subtotal");
    const modalTaxes = document.getElementById("modal-taxes");
    const modalTotal = document.getElementById("modal-total");
    const modal = document.getElementById("checkout-modal");

    if (carrito.length == 0) {
      alert("¡El carrito está vacío!");
      return;
    }

    itemList.innerHTML = "";
    let subtotal = 0;

    modal.classList.remove("hidden");
    
    carrito.forEach(producto => {
      const itemRow = document.createElement("div");
      itemRow.classList.add("item-row");
      itemRow.innerHTML = `
        <span>${producto.titulo} (x${producto.cantidad})</span>
        <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
      `;
      itemList.appendChild(itemRow);
      subtotal += producto.precio * producto.cantidad;
    });

    const impuestos = subtotal * IMPUESTOS;
    const total = subtotal + impuestos;

    modalSubtotal.innerHTML = `<span class="label">Subtotal:</span><span class="value">$${subtotal.toFixed(2)}</span>`;
    modalTaxes.innerHTML = `<span class="label">IVA + impuestos:</span><span class="value">$${impuestos.toFixed(2)}</span>`;
    modalTotal.innerHTML = `<span class="label">Total:</span><span class="value">$${total.toFixed(2)}</span>`;
  }

  function crearModal() {
    const checkoutButton = document.getElementById("cart-checkout");
    const modal = document.getElementById("checkout-modal");
    const closeModalButton = document.querySelector(".close-modal");
    const confirmCheckoutButton = document.getElementById("confirm-checkout");
    const cancelCheckoutButton = document.getElementById("cancel-checkout");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Abrir el modal al hacer clic en "Checkout"
    checkoutButton.addEventListener("click", () => {
      actualizarResumenCheckout();
    });
  
    // Cerrar el modal al hacer clic en la "x"
    closeModalButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    // Cerrar el modal al hacer clic en "Cancelar"
    cancelCheckoutButton.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    // Confirmar el checkout
    confirmCheckoutButton.addEventListener("click", () => {
      alert("¡Gracias por su compra!");
      limpiarCarrito();
      modal.classList.add("hidden");
    });
  
    // Cerrar el modal al hacer clic fuera de él
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
  }
  crearModal();

  function renderProductos(productos) {
      productSection.innerHTML = ""; // Limpiar contenido previo
      productos.forEach((producto, index) => {
        // Crear el contenedor principal
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.index = index; // Asociar índice del producto

        // Imagen de fondo
        card.style.backgroundImage = `url('${producto.imagen}')`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";

        // Contenido interno
        const content = document.createElement("div");
        content.classList.add("product-content");

        // Título
        const titulo = document.createElement("h2");
        titulo.textContent = producto.titulo;

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        // Botón +info
        const boton = document.createElement("button");
        boton.textContent = "+info";
        boton.classList.add("btn-product");
        boton.addEventListener("click", () => expandirProducto(index));

        // Botón agregar al carrito
        const botonCarrito = document.createElement("button");
        const iconoCarrito = document.createElement("span");
        iconoCarrito.innerHTML = '+ <i class="fas fa-shopping-cart"></i>';
        botonCarrito.appendChild(iconoCarrito);
        botonCarrito.classList.add("btn-product");
        botonCarrito.addEventListener("click", () => agregarAlCarrito(index));

        // Crear div de botones
        buttons.appendChild(boton);
        buttons.appendChild(botonCarrito);

        // Agregar elementos al contenido
        content.appendChild(titulo);
        content.appendChild(buttons);

        // Agregar contenido a la tarjeta
        card.appendChild(content);

        // Agregar tarjeta al contenedor principal
        productSection.appendChild(card);
      });
  }

  function expandirProducto(index) {
    const producto = productos[index];

    // Limpiar y renderizar las tarjetas
    renderProductos(productos);

    // Seleccionar la tarjeta a expandir
    const card = document.querySelector(`.card[data-index="${index}"]`);
    card.classList.add("expanded");

    // Limpiar el contenido previo de la tarjeta
    card.innerHTML = "";
    card.style.backgroundImage = 'none';
    // Crear el contenedor expandido
    const expanded = document.createElement("div");
    expanded.classList.add("card-expanded");

    // Imagen a la izquierda
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    const img = document.createElement("img");
    img.src = producto.imagen;
    img.alt = producto.titulo;
    imageContainer.appendChild(img);

    // Detalles a la derecha
    const details = document.createElement("div");
    details.classList.add("details");
    const titulo = document.createElement("h2");
    titulo.textContent = producto.titulo;
    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio.toFixed(2)}`;

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.style.margin = "10px";

    // Botón -info
    const boton = document.createElement("button");
    boton.textContent = "-info";
    boton.classList.add("btn-product");
    boton.addEventListener("click", () => {
        card.classList.remove("expanded");
        renderProductos(productos);
    });

    // Botón agregar al carrito
    const botonCarrito = document.createElement("button");
    const iconoCarrito = document.createElement("span");
    iconoCarrito.innerHTML = '+ <i class="fas fa-shopping-cart"></i>';
    botonCarrito.appendChild(iconoCarrito);
    botonCarrito.classList.add("btn-product");
    botonCarrito.addEventListener("click", () => agregarAlCarrito(index));

    // Crear div de botones
    buttons.appendChild(boton);
    buttons.appendChild(botonCarrito);

    // Agregar elementos a los detalles
    details.appendChild(titulo);
    details.appendChild(descripcion);
    details.appendChild(precio);
    details.appendChild(buttons);

    // Agregar imagen y detalles al contenedor expandido
    expanded.appendChild(imageContainer);
    expanded.appendChild(details);

    // En lugar de limpiar todo el contenido, simplemente agrega el contenedor expandido
    card.appendChild(expanded);
  }

  // Inicializar renderizado
  renderProductos(productos);
});