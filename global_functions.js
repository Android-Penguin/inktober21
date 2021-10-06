function toggleMenu() {
    document.getElementById("menu-icon").classList.toggle("active");
    document.getElementById("menu-container").style.transition = "transform 0.3s ease-in-out";
    document.getElementById("menu-container").classList.toggle("expanded");
}