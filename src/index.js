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

function showWeatherInfo(weather) {
  let city = weather.data.name;
  let summary = weather.data.weather[0].description;
  let tempInF = Math.round(weather.data.main.temp);
  fahTemp = Math.round(weather.data.main.temp);
  let humidity = Math.round(weather.data.main.humidity);
  let wind = Math.round(weather.data.wind.speed);
  let icon = weather.data.weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

  cityNameH1.innerHTML = city;
  temp.innerHTML = tempInF;
  humEl.innerHTML = humidity;
  windEl.innerHTML = wind;
  weatherSummary.innerHTML = summary;
  weatherIcon.setAttribute('src', iconURL)
  weatherIcon.setAttribute('alt', summary)
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

let cityForm = document.querySelector("#city-form");
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

function get5dayForecast () {
  let forecastElement = document.querySelector("#five-day-forecast")
  let dailyWeatherHTML = `<div class="row">`;
  let days = ['mon', 'tues', 'wed', 'thurs', 'fri'];

  days.forEach((day)=> {
    dailyWeatherHTML = dailyWeatherHTML +
        `<div class="col">
          <h3 id="title-day1">${day}</h3>
          <img src="" alt="no image" id="weather-icon" class="float-left" />
          <div class="future-temp">
            <span class="future-high">72°</span>
            |
            <span class="future-low">45°</span>
          </div>
        </div>`;
    displayWeatherHTML = dailyWeatherHTML + `</div>`
  })


  forecastElement.innerHTML = dailyWeatherHTML

}

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
  cTemp.classList.remove('active')
  fTemp.classList.add('active')
  temp.innerHTML = fahTemp;
}

function cClick(event) {
  event.preventDefault();
  fTemp.classList.remove('active')
  cTemp.classList.add('active')
  temp.innerHTML = Math.round(((fahTemp - 32) * 5/9));
}

fTemp.addEventListener("click", fClick);
cTemp.addEventListener("click", cClick);

searchByCity("New York");
get5dayForecast();