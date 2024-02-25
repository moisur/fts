// Set the countdown time (in seconds)
const countdownTime = 60;

// Function to start the countdown
function startCountdown() {
  let countdownNumber = document.getElementById('countdown-number');
  let timeLeft = countdownTime;

  // Update the countdown every second
  let countdownInterval = setInterval(function() {
    timeLeft--;
    countdownNumber.textContent = timeLeft;

    // Stop the countdown if time runs out
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      countdownNumber.textContent = "0";
      // You can add additional actions when the countdown finishes here
    }
  }, 1000);
}

// Call the startCountdown function to begin the countdown
startCountdown();

// Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    // Date de fin du compte à rebours (à modifier selon vos besoins)
    const endDate = new Date('2024-03-01T00:00:00');

    // Date actuelle
    const now = new Date();

    // Calcul de la différence entre la date de fin et la date actuelle
    const timeDifference = endDate - now;

    // Vérification si le temps restant est positif
    if (timeDifference > 0) {
        // Conversion du temps restant en heures, minutes et secondes
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Mise à jour du contenu de la balise span
        document.getElementById('countdown-number').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // Actualisation toutes les secondes
        setTimeout(updateCountdown, 1000);
    } else {
        // Affichage d'un message lorsque le compte à rebours est terminé
        document.getElementById('countdown-number').textContent = 'EXPIRÉ';
    }
}

// Appel de la fonction pour initialiser le compte à rebours
updateCountdown();
