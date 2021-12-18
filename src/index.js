//Formatted Date
let now = new Date();
let h2 = document.querySelector(".currentDateTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
h2.innerHTML = `${day} ${hours}:${minutes}`;

//Update city name and current temp of inputted city
function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(".condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector(
    ".humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector(".windSpeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}mph`;
}

function lookUpCity(city) {
  let apiKey = "d9a38fa8f4d32b712cf64ddc1036eed5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function submitInputs(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  lookUpCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitInputs);

//Current location temperature
function showWeatherCurrentLocation(response) {
  let currentCity = document.querySelector(".currentCity");
  let currentTemp = document.querySelector("#city-temp");
  let temperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}`;
  currentTemp.innerHTML = `${temperature}°`;
}

function retrievePosition(position) {
  let apiKey = "d9a38fa8f4d32b712cf64ddc1036eed5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeatherCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector(".currentButton");
button.addEventListener("click", getCurrentLocation);

//Farhenheit conversion
function showFarhenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#city-temp");
  let farhenheitTemp = 21 * 1.8 + 32;
  currentTemp.innerHTML = Math.round(farhenheitTemp);
}

let farhenheitSelector = document.querySelector("#farhenheit-conversion");
farhenheitSelector.addEventListener("click", showFarhenheitTemp);
