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

// -----forecast data----- //

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector(".weather-forecast");
  let days = ["Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
  <div class="forecast-day">${day}</div>
  <img
  src="http://openweathermap.org/img/wn/50d@2x.png"
  alt=""
  width="40"
  />
  <div class="forecast-temperature">
  <span class="forecast-temp-max">18° </span>
  <span class="forecast-temp-min">12°</span>
  </div>
  </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// -----weather data----- //

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "159a9f8ff294f264def02ae4cac4278a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemp(response) {
  console.log(response.data);
  celsiusTemp = response.data.main.temp;
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".humidity").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
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

// -------unit conversion------- //

let celsiusTemp = null;

function showCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheitConversion(event) {
  event.preventDefault();
  let temp = document.querySelector(".temperature");
  let fahTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahTemp);
}

let celsiusUnit = document.querySelector(".celsius");
celsiusUnit.addEventListener("click", showCelsiusTemp);

let fahrenheitUnit = document.querySelector(".fah");
fahrenheitUnit.addEventListener("click", showFahrenheitConversion);

search("Tokyo");
