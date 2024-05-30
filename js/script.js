document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;

  /**
   * Toggle del menú responsive.
   */
  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  /**
   * Cierra el menú al hacer clic en un enlace del menú.
   */
  document.querySelectorAll(".menu a").forEach((item) => {
    item.addEventListener("click", function () {
      menu.classList.remove("show");
    });
  });

  /**
   * Toggle del tema claro/oscuro.
   */
  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark");
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
