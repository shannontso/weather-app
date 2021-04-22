let now = new Date();

function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
  return formattedDate;
}
let presentTime = document.querySelector(".current-time");
presentTime.innerHTML = formatDate(now);

// -----temperature----- //

function degreesInCelsius() {
  let temperature = document.querySelector(".degrees");
  temperature.innerHTML = 13;
}
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", degreesInCelsius);

function degreesInFah() {
  let temperatureElement = document.querySelector(".degrees");
  temperatureElement.innerHTML = 55;
}
let fah = document.querySelector(".fah");
fah.addEventListener("click", degreesInFah);

// -----weather data----- //

function showTemp(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].description;
}
// -----search----- //

function search(city) {
  let apiKey = "159a9f8ff294f264def02ae4cac4278a";
  let apiSite = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  let apiUrl = `${apiSite}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".findCity").value;
  search(city);
}

let form = document.querySelector(".search");
form.addEventListener("submit", searchCity);

search("Tokyo");

// -----get current location----- //

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "159a9f8ff294f264def02ae4cac4278a";
  let apiSite = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiSite}lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector(".current-location");
button.addEventListener("click", showCurrentPosition);
