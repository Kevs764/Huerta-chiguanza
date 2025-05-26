// Simular pronóstico del clima
const fakeWeatherData = {
  'Bogotá': ['Soleado', 'Lluvia', 'Nublado'],
  'Medellín': ['Lluvia', 'Parcialmente nublado', 'Soleado'],
  'Cali': ['Soleado', 'Tormenta', 'Nublado']
};

const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const logoutButton = document.getElementById('logout-button');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.setItem('loggedIn', true);
  loginSection.classList.add('hidden');
  appSection.classList.remove('hidden');
});

logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedIn');
  loginSection.classList.remove('hidden');
  appSection.classList.add('hidden');
});

if (localStorage.getItem('loggedIn')) {
  loginSection.classList.add('hidden');
  appSection.classList.remove('hidden');
}

const weatherForm = document.getElementById('weather-form');
const weatherOutput = document.getElementById('weather');
const plantingAdvice = document.getElementById('planting-advice');
const lunarPhase = document.getElementById('lunar-phase');
const lunarImage = document.getElementById('lunar-image');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  const dateString = document.getElementById('date').value;

  const dateParts = dateString.split('-');
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  const weatherOptions = fakeWeatherData[city];
  const forecast = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];

  weatherOutput.textContent = `El clima en ${city} para el ${date.toLocaleDateString()} será: ${forecast}`;

  if (forecast.includes('Lluvia') || forecast.includes('Tormenta')) {
    plantingAdvice.textContent = 'No es recomendable sembrar ese día.';
  } else {
    plantingAdvice.textContent = 'Buen día para sembrar.';
  }

  const phase = getLunarPhase(date);
  lunarPhase.textContent = `Fase lunar: ${phase}`;
  lunarImage.src = getLunarImageSrc(phase);
  lunarImage.alt = phase;
});

const clock = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

function getLunarPhase(date) {
  const lp = 2551443;
  const new_moon = new Date(1970, 0, 7, 20, 35, 0);
  const phase = ((date.getTime() - new_moon.getTime()) / 1000) % lp;
  const days = Math.floor(phase / (24 * 3600));

  if (days < 1) return "Luna nueva";
  else if (days < 7) return "Cuarto creciente";
  else if (days < 15) return "Luna llena";
  else if (days < 22) return "Cuarto menguante";
  else return "Luna nueva";
}

function getLunarImageSrc(phase) {
  switch (phase) {
    case "Luna nueva":
      return "https://img.icons8.com/color/96/000000/new-moon.png";
    case "Cuarto creciente":
      return "https://img.icons8.com/color/96/000000/first-quarter.png";
    case "Luna llena":
      return "https://img.icons8.com/color/96/000000/full-moon.png";
    case "Cuarto menguante":
      return "https://img.icons8.com/color/96/000000/last-quarter.png";
    default:
      return "https://img.icons8.com/color/96/000000/crescent-moon.png";
  }
}
