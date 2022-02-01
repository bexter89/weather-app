let apiKey = "bafdfac4d6d7b1fc3d3952df39f393b7";
let apiBaseURL = `https://api.openweathermap.org/data/2.5/weather?`;
let fahTemp = 0;

let cityNameH1 = document.querySelector("h1");
let cityNameInput = document.querySelector("#city-input");
let fTemp = document.querySelector("#fahrenheit");
let cTemp = document.querySelector("#celsius");
let temp = document.querySelector("#tempNum");
let humEl = document.querySelector("#humidity");
let windEl = document.querySelector("#wind");
let weatherSummary = document.querySelector("#weather-summary");
let weatherIcon = document.querySelector('#weather-icon')

function formatDate(timestamp) {
  let week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', "Sat"]
  let date = new Date(timestamp * 1000)
  let day = date.getDay();
  return week[day];
}

function showWeatherInfo(weather) {
  let city = weather.data.name;
  let summary = weather.data.weather[0].description;
  let tempInF = Math.round(weather.data.main.temp);
  fahTemp = Math.round(weather.data.main.temp);
  let humidity = Math.round(weather.data.main.humidity);
  let wind = Math.round(weather.data.wind.speed);
  let icon = weather.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
  let coord = weather.data.coord;
  get5DayForecast(coord)
  cityNameH1.innerHTML = city;
  temp.innerHTML = tempInF;
  humEl.innerHTML = humidity;
  windEl.innerHTML = wind;
  weatherSummary.innerHTML = summary;
  weatherIcon.setAttribute('src', iconURL)
  weatherIcon.setAttribute('alt', summary)
};

function displayFutureForecast (futureForecast) {
  let forecastElement = document.querySelector("#five-day-forecast")
  let dailyWeatherHTML = `<div class="row">`;
  let days = futureForecast.data.daily;
  days.splice(5);

  days.forEach((day)=> {
    dailyWeatherHTML =
      dailyWeatherHTML +
        `<div class="col mt-4 text-center">
          <h3 id="title-day">${formatDate(day.dt)}</h3>
          <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" id="weather-icon" width="50"/>
          <div class="future-temp-desc">${day.weather[0].description}</div>
          <div class="future-temp">
            <span class="future-high">${Math.round(day.temp.max)}°</span>
            |
            <span class="future-low">${Math.round(day.temp.min)}°</span>
          </div>
        </div>`;
    displayWeatherHTML = dailyWeatherHTML + `</div>`
  });

  forecastElement.innerHTML = dailyWeatherHTML

};


function get5DayForecast (coords) {
  let futureForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=alert,minutely,current,hourly&appid=${apiKey}&units=imperial`
  axios.get(futureForecastURL).then(displayFutureForecast)
};

function searchByCity(city) {
  let searchByCityURL = `q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiBaseURL}${searchByCityURL}`).then(showWeatherInfo);
};

function handleSubmit(event) {
  event.preventDefault();
  let city = cityNameInput.value;
  searchByCity(city);
  cityNameInput.value = "";
};

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);

function locate(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let searchByLocationURL = `lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiBaseURL}${searchByLocationURL}`).then(showWeatherInfo);
};

function searchByLocate(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locate);
};

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
};

let dateLi = document.querySelector("#date");
let currDate = new Date();
dateLi.innerHTML = updateDate(currDate);

function fClick(event) {
  event.preventDefault();
  cTemp.classList.remove('active')
  fTemp.classList.add('active')
  temp.innerHTML = fahTemp;
};

function cClick(event) {
  event.preventDefault();
  fTemp.classList.remove('active')
  cTemp.classList.add('active')
  temp.innerHTML = Math.round(((fahTemp - 32) * 5/9));
};

fTemp.addEventListener("click", fClick);
cTemp.addEventListener("click", cClick);

searchByCity("New York");
displayFutureForecast();