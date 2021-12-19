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
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName}`;
  let temp = document.querySelector("#city-temp");
  temp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let condition = response.data.weather[0].main;
  let conditionDisplay = document.querySelector(".condition");
  conditionDisplay.innerHTML = `  ${condition}`;
  let humidity = response.data.main.humidity;
  let humidityDisplay = document.querySelector(".humidity");
  humidityDisplay.innerHTML = `  ${humidity}%`;
  let windSpeed = response.data.wind.speed;
  let windSpeedDisplay = document.querySelector(".windSpeed");
  windSpeedDisplay.innerHTML = `  ${windSpeed} mph`;
  let iconDisplay = document.querySelector("#weather-icon");
  celsiusTemp = response.data.main.temp;
  iconDisplay.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconDisplay.setAttribute("alt", response.data.weather[0].main);
}

function searchCity(city) {
  let apiKey = "d9a38fa8f4d32b712cf64ddc1036eed5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

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

//Farhenheit Conversion
function showFahrenheitTemp(event) {
  event.preventDefault;
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temp = document.querySelector("#city-temp");
  temp.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}

//Celsius Conversion
function showCelsiusTemp(event) {
  event.preventDefault;
  let temp = document.querySelector("#city-temp");
  temp.innerHTML = `${Math.round(celsiusTemp)}°C`;
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Hong Kong");
