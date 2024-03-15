document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            this.parentNode.classList.toggle("active");
        });
    });
});

window.addEventListener('scroll', function () {
    // Sélectionnez toutes les sections avec la classe .container
    var containers = document.querySelectorAll('.container');

    // Parcourez chaque section
    containers.forEach(function(container) {
        // Calculez la position de chaque section par rapport au haut de la fenêtre
        var positionFromTop = container.getBoundingClientRect().top;
        var screenHeight = window.innerHeight;

        // Ajoutez la classe .show si la section est dans la fenêtre visible
        if (positionFromTop - screenHeight <= 0) {
            container.classList.add('show');
        }
    });
});
