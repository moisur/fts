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

// mouvement de la petite flèche des FAQ
document.addEventListener('DOMContentLoaded', function () {
    var faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(faqQuestion) {
        faqQuestion.addEventListener('click', function () {
            var arrowIcon = this.querySelector('.arrow-icon');
            var rotated = arrowIcon.classList.contains('rotated');

            if (rotated) {
                arrowIcon.style.transform = 'rotateX(180deg)'; // Rotation vers le haut
            } else {
                arrowIcon.style.transform = 'rotateY(180deg)'; // Rotation vers le bas
            }

            arrowIcon.classList.toggle('rotated'); // Inverser la classe rotated
        });
    });
});

// EMPECHER LA DOUBLE LECTURE DE VIDEO
    document.addEventListener('DOMContentLoaded', function() {
        const videos = document.querySelectorAll('video');

        videos.forEach(video => {
            video.addEventListener('play', function(event) {
                // Pause toutes les autres vidéos sauf celle qui est en cours de lecture
                videos.forEach(v => {
                    if (v !== event.target) {
                        v.pause();
                    }
                });
            });
        });
    });

