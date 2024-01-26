var menuToggle = document.getElementById("menu-toggle");
        
// Attache un gestionnaire d'événements au clic de cet élément
menuToggle.addEventListener("click", function (e) {
    // Empêche le comportement par défaut de l'événement de clic
    e.preventDefault();

    // Sélectionne l'élément avec l'ID "wrapper"
    var wrapper = document.getElementById("wrapper");

    // Alterne la classe "toggled" sur cet élément
    if (wrapper.classList.contains("toggled")) {
        wrapper.classList.remove("toggled");
    } else {
        wrapper.classList.add("toggled");
    }
});
