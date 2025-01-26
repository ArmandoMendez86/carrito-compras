const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCurso);
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    let curso = e.target.closest(".card");
    leerCurso(curso);
  /*   carrito.classList.add("mostrar") */
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
