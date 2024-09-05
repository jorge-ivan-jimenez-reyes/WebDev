// Función para mostrar/ocultar el menú lateral
const Mostrarmenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle); // Botón de menú
  const nav = document.getElementById(navbarId); // Menú lateral (sidebar)

  // Verifica si ambos elementos existen antes de agregar el evento
  if (toggleBtn && nav) {
    toggleBtn.addEventListener("click", () => {
      nav.classList.toggle("show-menu"); // Mostrar/ocultar el menú
      toggleBtn.classList.toggle("bx-x"); // Cambia el ícono del menú cuando se activa/desactiva
    });
  }
};

// Ejecutar la función para controlar el menú
Mostrarmenu("header-toggle", "navbar");

// Cambiar el color activo de los enlaces del menú
const linkcolor = document.querySelectorAll(".nav__link"); // Selecciona todos los enlaces del menú

function colorLink() {
  // Elimina la clase 'active' de todos los enlaces
  linkcolor.forEach((item) => item.classList.remove("active"));
  
  // Agrega la clase 'active' al enlace clicado
  this.classList.add("active");
}

// Añade el evento 'click' a cada enlace para activar el color cuando se hace clic
linkcolor.forEach((item) => item.addEventListener("click", colorLink));
