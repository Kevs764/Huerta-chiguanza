// Simular pronóstico del clima
const fakeWeatherData = {
  'Bogotá': ['Soleado', 'Lluvia', 'Nublado'],
  'Medellín': ['Lluvia', 'Parcialmente nublado', 'Soleado'],
  'Cali': ['Soleado', 'Tormenta', 'Nublado']
};

// Login básico
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

// Consulta del clima y luna
const weatherForm = document.getElementById('weather-form');
const weatherOutput = document.getElementById('weather');
const plantingAdvice = document.getElementById('planting-advice');
const lunarPhase = document.getElementById('lunar-phase');
const lunarImage = document.getElementById('lunar-image');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = document.getElementById('city').value;
  const dateString = document.getElementById('date').value;

  // Crear un nuevo objeto Date con la fecha seleccionada
  // Para evitar que la zona horaria cause un desfase, asegúrate de usar el formato adecuado.
  const dateParts = dateString.split('-'); // Obtener año, mes y día
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

  const weatherOptions = fakeWeatherData[city];
  const forecast = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
  
  // Mostrar el pronóstico del clima
  weatherOutput.textContent = `El clima en ${city} para el ${date.toLocaleDateString()} será: ${forecast}`;

  // Consejos de si es buen día para sembrar o no
  if (forecast.includes('Lluvia') || forecast.includes('Tormenta')) {
    plantingAdvice.textContent = 'No es recomendable sembrar ese día.';
  } else {
    plantingAdvice.textContent = 'Buen día para sembrar.';
  }

  // Determinar la fase lunar
  const phase = getLunarPhase(date);
  lunarPhase.textContent = `Fase lunar: ${phase}`;
  lunarImage.src = getLunarImageSrc(phase);
  lunarImage.alt = phase;
});

// Reloj en tiempo real
const clock = document.getElementById('clock');
function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Funciones de cálculo de fase lunar
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