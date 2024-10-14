const header = document.querySelector("header");
const cartIcon = header.lastElementChild;
const botones = document.querySelectorAll("#boton-comprar");
const cart = document.querySelector(".cart");
const cerrarCarrito = document.querySelector("#cerrar-carrito");
const borrarProductos = document.querySelectorAll("#borrar-producto");

const acumuladorDePrecios = [];

//funcion para crear productos
const products = [
  { nombre: "Chamarra", precio: 1000, imagen: "img/black_shirt.jpg" },
  { nombre: "Camisa Azul", precio: 2500, imagen: "img/blue_shirt.jpg" },
  { nombre: "Hoodie", precio: 3500, imagen: "img/brown_hoddie.jpg" },
];

// Función para obtener un producto aleatorio del array original
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
  const article = document.createElement("article");
  article.innerHTML = `
    
      <img class="products__img" src="${producto.imagen}" alt="${producto.nombre}">
      <h3 class="products__h3">${producto.nombre}</h3>
      <p class="products__p">$${producto.precio}</p>
      <button id="boton-comprar">Comprar</button>
    `;
  productosContainer.appendChild(article);
});

//funcion para agregar un event listener a los botones del carrito y obtener la informacion
productosContainer.addEventListener("click", (event) => {
  if (event.target.id === "boton-comprar") {
    console.log("Se agregó un producto al carrito");
    const article = event.target.parentNode;
    const productName = article.querySelector(".products__h3").textContent;
    const productPrice = article.querySelector(".products__p").textContent;
    const productImage = article.querySelector(".products__img").src;
    const productObject = {
      nombre: productName,
      precio: productPrice,
      imagen: productImage,
    };
    agregarAlCarrito(productObject);
  }
});

// funcion para agregar un elemento dentro del carrito
function agregarAlCarrito(product) {
  const cart = document.querySelector(".cart");
  const cartContent = document.createElement("div");
  cartContent.innerHTML = ` 
    <div class="cart__div">
      <img class="cart__img" src="${product.imagen}" alt="${product.nombre}">
      <p class="cart__p">${product.nombre}</p>
      <p class="cart__p">$${product.precio}</p>
      <i class="cart__i" id="borrar-producto" data-feather="x"></i>
    </div>
    `;
  acumuladorDePrecios.push(parseFloat(product.precio.replace("$", ""))); // Elimina el símbolo de dólar y convierte a número  actualizarTotal();
  actualizarTotal();
  cart.appendChild(cartContent);
  feather.replace();
}

// funcion para borrar un elemento del carrito, la delegacion de enventos es genial
cart.addEventListener("click", (event) => {
  if (event.target.id === "borrar-producto") {
    const article = event.target.parentNode;
    article.remove();
  }
});

function actualizarTotal() {
  console.log("actualizarTotal llamada");
  console.log("acumuladorDePrecios:", acumuladorDePrecios);
  const total = acumuladorDePrecios.reduce((a, b) => a + parseInt(b, 10), 0);
  console.log("total:", total);
  const totalElement = document.querySelector(".total");
  console.log("totalElement:", totalElement);
  if (totalElement) {
    totalElement.textContent = `${total.toFixed(2)}`;
  } else {
    console.error("Elemento .total no encontrado");
  }
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
