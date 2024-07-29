let dailySessions = [];
let programData = JSON.parse(localStorage.getItem('programData')) || [];
function startSession() {
    const startTime = new Date().toLocaleTimeString();
    dailySessions.push({ start: startTime });
    alert('Séance démarrée à ' + startTime);
}

function endSession() {
    if (dailySessions.length === 0 || dailySessions[dailySessions.length - 1].end) {
        alert('Veuillez démarrer une séance avant de la terminer.');
        return;
    }
    const endTime = new Date().toLocaleTimeString();
    dailySessions[dailySessions.length - 1].end = endTime;
    alert('Séance terminée à ' + endTime);
}

function saveDailyData() {
    const dailyWeight = parseFloat(document.getElementById('dailyWeight').value);
    const sessionCount = parseInt(document.getElementById('sessions').value);

    const dailyData = {
        date: new Date().toLocaleDateString(),
        weight: dailyWeight,
        sessions: sessionCount,
        details: dailySessions
    };

    programData.push(dailyData);
    localStorage.setItem('programData', JSON.stringify(programData));

    dailySessions = []; // Reset sessions for the next day
    alert('Données du jour enregistrées.');
}

function showProgram() {
    const programDetails = document.getElementById('programDetails');
    programDetails.innerHTML = '<h3>Mon Programme</h3>';
    programData.forEach(day => {
        const dayDiv = document.createElement('div');
        dayDiv.innerHTML = `
            <p>Date: ${day.date}</p>
            <p>Poids: ${day.weight} kg</p>
            <p>Nombre de séances: ${day.sessions}</p>
            <p>Détails des séances:</p>
            <ul>
                ${day.details.map(session => `<li>Début: ${session.start}, Fin: ${session.end}</li>`).join('')}
            </ul>
            <hr>
        `;
        programDetails.appendChild(dayDiv);
    });
}

function calculateBMR() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const sex = document.getElementById('sex').value;
    const equation = document.getElementById('equation').value;
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);
    const goalWeight = parseFloat(document.getElementById('goalWeight').value);
    const timeFrame = parseInt(document.getElementById('timeFrame').value);

    let bmr = 0;

    switch (equation) {
        case 'harris-benedict':
            if (sex === 'male') {
                bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
            } else {
                bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
            }
            break;
        case 'harris-benedict-roza':
            if (sex === 'male') {
                bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
            } else {
                bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
            }
            break;
        case 'mifflin':
            if (sex === 'male') {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
            break;
        case 'black':
            if (sex === 'male') {
                bmr = 293 - (3.8 * age) + (456.4 * (weight / height));
            } else {
                bmr = 248 - (2.7 * age) + (401.5 * (weight / height));
            }
            break;
        case 'schofield':
            if (sex === 'male') {
                bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
            } else {
                bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
            }
            break;
        case 'oxford':
            if (sex === 'male') {
                bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
            } else {
                bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
            }
            break;
        case 'cunningham1980':
            bmr = 500 + (22 * weight);
            break;
        case 'cunningham1991':
            bmr = 500 + (22 * weight);
            break;
        case 'lorenzo':
            if (sex === 'male') {
                bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
            } else {
                bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
            }
            break;
        case 'ten-haaf-lean':
            bmr = 370 + (21.6 * weight);
            break;
        case 'ten-haaf-weight':
            bmr = 370 + (21.6 * weight);
            break;
        case 'tinsley-lean':
            bmr = 370 + (21.6 * weight);
            break;
        case 'tinsley-weight':
            bmr = 370 + (21.6 * weight);
            break;
    }

    const tdee = bmr * activityLevel;

    const weeklyCaloricDeficit = (weight - goalWeight) * 7700 / timeFrame;
    const dailyCaloricIntake = tdee - weeklyCaloricDeficit / 7;

    document.getElementById('bmrResult').textContent = `BMR: ${bmr.toFixed(2)} kcal/jour`;
    document.getElementById('tdeeResult').textContent = `TDEE: ${tdee.toFixed(2)} kcal/jour`;
    document.getElementById('goalCalories').textContent = `Calories journalières pour atteindre l'objectif: ${dailyCaloricIntake.toFixed(2)} kcal/jour`;

    generatePlan(dailyCaloricIntake, timeFrame);
    calculateIdealWeight(weight, height, sex);

}
function calculateIdealWeight(weight, height, sex) {
    const heightInCm = height;
    const heightInM = height / 100;
    const heightInInches = height * 0.393701;

    const idealWeightPeterson = sex === 'male' ? 52 + 1.9 * ((heightInInches - 60) / 2.54) : 49 + 1.7 * ((heightInInches - 60) / 2.54);
    const idealWeightRobinson = sex === 'male' ? 52 + 1.9 * (heightInInches - 60) : 49 + 1.7 * (heightInInches - 60);
    const idealWeightMiller = sex === 'male' ? 56.2 + 1.41 * (heightInInches - 60) : 53.1 + 1.36 * (heightInInches - 60);
    const idealWeightDevine = sex === 'male' ? 50 + 2.3 * (heightInInches - 60) : 45.5 + 2.3 * (heightInInches - 60);
    const idealWeightLorentz = sex === 'male' ? heightInCm - 100 - ((heightInCm - 150) / 4) : heightInCm - 100 - ((heightInCm - 150) / 2);

    const weights = [
        idealWeightPeterson,
        idealWeightRobinson,
        idealWeightMiller,
        idealWeightDevine,
        idealWeightLorentz,
        weight // Current weight
    ];

    const labels = [
        'Peterson', 'Robinson', 'Miller', 'Devine', 'Lorentz', 'Votre poids actuel'
    ];

    displayIdealWeightChart(labels, weights);
}

function displayIdealWeightChart(labels, data) {
    const ctx = document.getElementById('idealWeightChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Poids (kg)',
                data: data,
                backgroundColor: [
                    '#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#ffcc00', '#ff6600', '#ff0000'
                ]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Poids idéal selon différentes formules'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function generatePlan(dailyCaloricIntake, timeFrame) {
    const nutritionPlan = `
        Pour atteindre votre objectif de poids en ${timeFrame} semaines, suivez ce plan de nutrition:
        - Mangez ${dailyCaloricIntake.toFixed(2)} kcal par jour.
        - Assurez-vous de consommer un équilibre de protéines, de glucides et de lipides.
        - Buvez beaucoup d'eau.
    `;

    const trainingPlan = `
        Plan d'entraînement recommandé:
        - Faites de l'exercice au moins ${Math.min(3, timeFrame)} fois par semaine.
        - Combinez des exercices de cardio et de musculation.
        - Incluez des jours de repos pour permettre la récupération.
    `;

    document.getElementById('nutritionDetails').textContent = nutritionPlan;
    document.getElementById('trainingDetails').textContent = trainingPlan;
}
