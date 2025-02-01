const body = document.querySelector("body");
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const cantidadArticulos = document.querySelector("#numArticulos");
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCurso);
  document
    .querySelector("#img-carrito")
    .addEventListener("click", mostrarOcultarCarrito);

  contenedorCarrito.addEventListener("click", eliminarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

/* Mis funciones */

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    let curso = e.target.closest(".card");
    leerCurso(curso);
  }
}

function leerCurso(curso) {
  let infoCurso = {
    img: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso
      .querySelector(".precio")
      .childNodes[0].textContent.replace("$", "")
      .trim(),
    descuento: curso
      .querySelector(".precio span")
      .textContent.replace("$", "")
      .trim(),
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    articulosCarrito = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        return { ...curso, cantidad: curso.cantidad + 1 };
      } else {
        return curso;
      }
    });
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHtml();
  numeroArticulos();
  calcularTotal();
}

function carritoHtml() {
  limpiarHtml();

  articulosCarrito.forEach((curso) => {
    const { img, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${img}" width="100"></td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td><a href="#!" class="borrar-curso" data-id="${id}">X</a></td>
    `;
    contenedorCarrito.appendChild(row);
  });
}

function limpiarHtml() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function numeroArticulos() {
  cantidadArticulos.textContent = articulosCarrito.length;
}

function mostrarOcultarCarrito() {
  carrito.classList.toggle("mostrarCarrito");
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    let idCurso = parseInt(e.target.getAttribute("data-id"));
    let curso = e.target.closest("tr");
    let cantidad = parseInt(curso.querySelectorAll("td")[3].textContent);

    if (cantidad > 1) {
      articulosCarrito = articulosCarrito.map((curso) => {
        if (curso.id == idCurso) {
          return { ...curso, cantidad: curso.cantidad - 1 };
        } else {
          return curso;
        }
      });
    } else {
      articulosCarrito = articulosCarrito.filter(
        (curso) => curso.id != idCurso
      );
    }

    carritoHtml();
    numeroArticulos();
    calcularTotal();
  }
}

function vaciarCarrito() {
  articulosCarrito = [];
  carritoHtml();
  numeroArticulos();
  mostrarOcultarCarrito();
}

function calcularTotal() {
  let total = articulosCarrito.reduce(
    (total, item) =>
      parseFloat(total) + parseFloat(item.precio) * parseFloat(item.cantidad),
    0
  );
  document.querySelector("#montoTotal").textContent = `$${total.toFixed(2)}`;
}
