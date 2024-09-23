function toggleMenu() {
    const menu = document.getElementById('menu');
    const menuIcon = document.querySelector('.menu-icon');

    // Alterna la clase active en el menú
    menu.classList.toggle('active');

    // Alterna el icono del menú en función de si el menú está activo o no
    if (menu.classList.contains('active')) {
        menuIcon.innerHTML = '✖'; // Cambia el icono a una "X" cuando el menú está abierto
    } else {
        menuIcon.innerHTML = '☰'; // Vuelve al icono de menú cuando está cerrado
    }
}
