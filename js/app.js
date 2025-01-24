const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

cargarEventListener();

function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCurso);
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    let curso = e.target.closest(".card")
    leerCurso(curso)
  }
}

function leerCurso(curso){
    console.log(curso)
}
