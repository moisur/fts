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
    // Date de fin (1er mars)
    const endDate = new Date('2024-03-01T00:00:00');
  
    // Date actuelle
    const now = new Date();
  
    // Calcul de la différence entre la date de fin et la date actuelle
    const difference = endDate - now;
  
    // Calcul des jours, heures, minutes et secondes restantes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    // Mise à jour de l'affichage du compte à rebours
    const countdownElement = document.getElementById('countdown-number');
    countdownElement.textContent = days + " jours, " + hours + " heures, " + minutes + " minutes, " + seconds + " secondes";
}

// Appeler la fonction updateCountdown pour mettre à jour le compte à rebours
updateCountdown();

// Mettre à jour le compte à rebours chaque seconde
setInterval(updateCountdown, 1000);
