let apiKey = "bafdfac4d6d7b1fc3d3952df39f393b7";
let apiBaseURL = `https://api.openweathermap.org/data/2.5/weather?`;

let cityNameH1 = document.querySelector("h1");
let cityNameInput = document.querySelector("#city-input");
let fTemp = document.querySelector("#fahrenheit");
let cTemp = document.querySelector("#celsius");
let temp = document.querySelector("#tempNum");
let humEl = document.querySelector("#humidity");
let windEl = document.querySelector("#wind");
let weatherSummary = document.querySelector("#weather-summary");

function showWeatherInfo(weather) {
  let city = weather.data.name;
  let summary = weather.data.weather[0].description;
  let tempInF = Math.round(weather.data.main.temp);
  let humidity = Math.round(weather.data.main.humidity);
  let wind = Math.round(weather.data.wind.speed);
  cityNameH1.innerHTML = city;
  temp.innerHTML = tempInF;
  humEl.innerHTML = humidity;
  windEl.innerHTML = wind;
  weatherSummary.innerHTML = summary;
}

function searchByCity(city) {
  let searchByCityURL = `q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiBaseURL}${searchByCityURL}`).then(showWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = cityNameInput.value;
  searchByCity(city);
  cityNameInput.value = "";
}

let cityForm = document.querySelector(".city-form");
cityForm.addEventListener("submit", handleSubmit);

function locate(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let searchByLocationURL = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiBaseURL}${searchByLocationURL}`).then(showWeatherInfo);
}

function searchByLocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locate);
}

let locateBtn = document.querySelector("#locate");
locateBtn.addEventListener("click", searchByLocate);

function updateDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let time = `${hour}:${min}`;
  return `${day} ${time}${hour < 12 ? " AM" : " PM"}`;
}

let dateLi = document.querySelector("#date");
let currDate = new Date();
dateLi.innerHTML = updateDate(currDate);

function fClick(event) {
  event.preventDefault();
  temp.innerHTML = 19;
}

function cClick(event) {
  event.preventDefault();
  temp.innerHTML = Math.round((Number(temp.innerHTML) * 9) / 5 + 32);
}

fTemp.addEventListener("click", fClick);
cTemp.addEventListener("click", cClick);
