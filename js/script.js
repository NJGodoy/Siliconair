const productos = [
    {
      imagen: "../img/espaldera_principal.JPG",
      titulo: "Espaldera",
      descripcion: "Su estructura permite realizar estiramientos que alivian tensiones, especialmente en la espalda y las piernas. Ideal para combatir dolores por malas posturas o trabajo sedentario.",
      precio: "$40.00",
    },
    {
      imagen: "../img/muñequera_libre.JPG",
      titulo: "Muñequera libre",
      descripcion: "¿Sientes molestias en la muñeca o necesitas un soporte extra para tus actividades diarias? Nuestra muñequera libre es la solución perfecta para quienes buscan aliviar el dolor y proteger sus articulaciones sin perder movilidad.",
      precio: "$20.00",
    },
    {
      imagen: "../img/muñequera_res.JPG",
      titulo: "Muñequera restrictiva",
      descripcion: "Su diseño limita el rango de movimiento de la muñeca, brindando una protección esencial en casos de lesiones, esguinces o tendinitis, ayudando a prevenir movimientos que puedan agravar la lesión.",
      precio: "$25.00",
    },
    {
      imagen: "../img/zapatilla_principal.JPG",
      titulo: "Calzado Siliconair",
      descripcion: "Descubre la libertad de movimiento y el confort superior con Siliconair, un calzado diseñado para quienes buscan bienestar y estilo en todo momento.",
      precio: "$50.00",
    },
];

document.addEventListener("DOMContentLoaded", () => {
const productSection = document.getElementById("product-section");

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

    // Botón +info
    const boton = document.createElement("button");
    boton.textContent = "+info";
    boton.classList.add("btn-info");
    boton.addEventListener("click", () => expandirProducto(index));

    // Agregar elementos al contenido
    content.appendChild(titulo);
    content.appendChild(boton);

    // Agregar contenido a la tarjeta
    card.appendChild(content);

    // Agregar tarjeta al contenedor principal
    productSection.appendChild(card);
    });
}

function expandirProducto(index) {
    const producto = productos[index];

    renderProductos(productos);

    // Seleccionar la tarjeta a expandir
    const card = document.querySelector(`.card[data-index="${index}"]`);
    card.classList.add("expanded");

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
    precio.textContent = `Precio: ${producto.precio}`;

    // Botón -info
    const boton = document.createElement("button");
    boton.textContent = "-info";
    boton.style.margin = "10px";
    boton.classList.add("btn-info");
    boton.addEventListener("click", () => {
        card.classList.remove("expanded");
        renderProductos(productos);
    });

    // Agregar elementos a los detalles
    details.appendChild(titulo);
    details.appendChild(descripcion);
    details.appendChild(precio);
    details.appendChild(boton);

    // Agregar imagen y detalles al contenedor expandido
    expanded.appendChild(imageContainer);
    expanded.appendChild(details);

    // Limpiar el contenido de la tarjeta expandida y agregar el contenedor
    card.innerHTML = ''; 
    card.appendChild(expanded);
}

// Inicializar renderizado
renderProductos(productos);
});