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
