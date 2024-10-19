const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const botones = document.querySelectorAll("#boton-comprar");
const cart = document.querySelector(".cart");
const cerrarCarrito = document.querySelector("#cerrar-carrito");
const borrarProductos = document.querySelectorAll("#borrar-producto");

const acumuladorDePrecios = [];
const carrito = [];
//funcion para crear productos
const products = [
  { nombre: "Chamarra", precio: 1000, imagen: "img/black_shirt.jpg" },
  { nombre: "Camisa Azul", precio: 2500, imagen: "img/blue_shirt.jpg" },
  { nombre: "Hoodie", precio: 3500, imagen: "img/brown_hoddie.jpg" },
];

// Funcion para obtener un producto aleatorio del array original
function obtenerProductoAleatorio() {
  const indiceAleatorio = Math.floor(Math.random() * products.length);
  return products[indiceAleatorio];
}
//creacion de un array con 10 productos aleatorios
const productosAleatorios = [];
for (let i = 0; i < 10; i++) {
  productosAleatorios.push(obtenerProductoAleatorio());
}
//funcion para agregar un elemento al grid de productos
const productosContainer = document.querySelector("#products");
productosAleatorios.forEach((producto) => {
  const template = document.getElementById("grid-product");
  const article = template.content.cloneNode(true);

  article.querySelector(".products__img").src = producto.imagen;
  article.querySelector(".products__h3").textContent = producto.nombre;
  article.querySelector(".products__img").alt = producto.nombre;
  article.querySelector(".products__p").textContent = `$${producto.precio}`;

  productosContainer.appendChild(article);
});

// funcion para agregar un ID unico a cada elemento del productosContainer

//funcion para agregar un event listener a los botones del carrito y obtener la informacion
productosContainer.addEventListener("click", (event) => {
  if (event.target.id === "boton-comprar") {
    console.log("Se agrego un producto al carrito");

    // Obtener el identificador unico del elemento
    const uniqueId = crypto.randomUUID().slice(0, 10);
    console.log("uniqueId:", uniqueId);
    const article = event.target.parentNode;
    const productName = article.querySelector(".products__h3").textContent;
    const productPrice = article.querySelector(".products__p").textContent;
    const productImage = article.querySelector(".products__img").src;
    const productObject = {
      nombre: productName,
      precio: productPrice,
      imagen: productImage,
      id: uniqueId,
    };

    console.log(productObject);
    agregarAlCarrito(productObject);
  }
});

// funcion para agregar un elemento dentro del carrito
function agregarAlCarrito(product) {
  const template = document.getElementById("cart-product-template");
  const cartContent = template.content.cloneNode(true);
  cartContent.querySelector("#nombre-producto").textContent = product.nombre;
  // colocar el precio en string
  cartContent.querySelector(
    "#precio-producto"
  ).textContent = `${product.precio}`;
  cartContent.querySelector(".cart__img").src = product.imagen;
  carrito.push(product);

  cart.appendChild(cartContent);
  feather.replace();
}

function sumarPrecios(carrito) {
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// funcion para cerrar el carrito
cerrarCarrito.addEventListener("click", () => {
  const cart = document.querySelector(".cart");
  cart.classList.remove("show");
});

// funcion para mostrar el carrito
cartIcon.addEventListener("click", () => {
  const cart = document.querySelector(".cart");
  cart.classList.toggle("show");
});
