let apiKey = "bafdfac4d6d7b1fc3d3952df39f393b7";
let apiBaseURL = `https://api.openweathermap.org/data/2.5/weather?`;
let fahTemp = 0;
let feelsTemp = 0;
let fiveDayFahHighTemp = [];
let fiveDayFahLowTemp = [];
let theme = 'daytime';

let cityNameH1 = document.querySelector("h1");
let cityNameInput = document.querySelector("#city-input");
let fTemp = document.querySelector("#fahrenheit");
let cTemp = document.querySelector("#celsius");
let temp = document.querySelector("#tempNum");
let tempFeelsLike = document.querySelector("#feels-like")
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

function changeBackground(theme, weatherCode) {
  let htmlBody = document.querySelector('html')

  //thunderstorm
  if (weatherCode < 299) {
    theme === 'daytime' ?
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1620031616312-bfd7c67463a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80') no-repeat center center fixed`
    :
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1527572756213-1cda99a355c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80') no-repeat center center fixed`
  }
  //drizzle
  if (weatherCode >= 300 && weatherCode < 400) {
    theme === 'daytime' ?
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1527766833261-b09c3163a791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80') no-repeat center center fixed`
    :
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1527572756213-1cda99a355c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80') no-repeat center center fixed`;
  }
  // rain
  if (weatherCode >= 500 && weatherCode < 600) {
    theme === 'daytime' ?
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1523772721666-22ad3c3b6f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80') no-repeat center center fixed`
    :
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1518182170546-07661fd94144?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2487&q=80') no-repeat center center fixed`;
  }
  //snow
  if (weatherCode >= 600 && weatherCode < 700) {
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1506978520653-bb3accebb1a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2374&q=80') no-repeat center center fixed`;
  }
  // atmosphere/fog
  if (weatherCode >= 700 && weatherCode < 800) {
    theme === 'daytime' ?
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1487621167305-5d248087c724?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80') no-repeat center center fixed`
    :
    htmlBody.style.background = `url('    https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2443&q=80') no-repeat center center fixed`;
  }
  // clear
  if (weatherCode === 800) {
    theme === 'daytime' ?
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1623846736569-1d90cba76d65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80') no-repeat center center fixed`
    :
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1473596477327-988dba107d1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2372&q=80')no-repeat center center fixed`;
  }
  //clouds
  if (weatherCode >= 801 && weatherCode < 900) {
    theme === 'daytime' ?
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80') no-repeat center center fixed`
    :
    htmlBody.style.background = `url('https://images.unsplash.com/photo-1536183922588-166604504d5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80') no-repeat center center fixed`;
  }
}

function showWeatherInfo(weather) {
  let feelsLike = Math.round(weather.data.main.feels_like);
  feelsTemp = Math.round(weather.data.main.feels_like);
  let city = weather.data.name;
  let summary = weather.data.weather[0].description;
  let tempInF = Math.round(weather.data.main.temp);
  fahTemp = Math.round(weather.data.main.temp);
  let humidity = Math.round(weather.data.main.humidity);
  let wind = Math.round(weather.data.wind.speed);
  let icon = weather.data.weather[0].icon;
  let weatherCode = weather.data.weather[0].id;

  updateDate(weather.data.timezone, weatherCode)

  let iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
  let coord = weather.data.coord;
  get5DayForecast(coord)
  cityNameH1.innerHTML = city;
  temp.innerHTML = tempInF;
  humEl.innerHTML = humidity;
  windEl.innerHTML = wind;
  weatherSummary.innerHTML = summary;
  tempFeelsLike.innerHTML = feelsLike;
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

let dateLi = document.querySelector("#date");
let localDateLi = document.querySelector("#local-date");

function updateDate(timeZoneOffset, weatherCode) {
  let currentDate = new Date()

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let monthNum = currentDate.getMonth()
  let monthName = months[monthNum]
  let date = currentDate.getDate();
  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = currentDate.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let time = `${hour}:${min}`;
  let inputCityTimeZoneOffset = timeZoneOffset / 3600;
  let utcTime = currentDate.getUTCHours();
  let inputCityHour = utcTime + inputCityTimeZoneOffset

  if (inputCityHour < 1) {
    inputCityHour = `0${inputCityHour}`;
  }
  if (inputCityHour > 17 || inputCityHour < 6) {
    theme = 'nighttime'
  } else {
    theme = 'daytime'
  }
  if (inputCityHour >= 24) {
    inputCityHour = inputCityHour - 24
    day = days[currentDate.getDay() + 1];
    date = currentDate.getDate() + 1;
  }

  let formattedDate = `${day}, ${monthName} ${date},`
  let inputCityTime = `${inputCityHour}:${min}`;

  changeBackground(theme, weatherCode)

  dateLi.innerHTML = `${formattedDate} ${inputCityTime}${inputCityHour < 12 ? " AM" : " PM"}`
  localDateLi.innerHTML = `${time}${hour < 12 ? " AM" : " PM"}`
};



function fClick(event) {
  event.preventDefault();
  cTemp.classList.remove('active')
  fTemp.classList.add('active')
  temp.innerHTML = fahTemp;
  tempFeelsLike.innerHTML = feelsTemp;
  updateFiveDayTempCUnits()
};

function cClick(event) {
  event.preventDefault();
  fTemp.classList.remove('active')
  cTemp.classList.add('active')
  temp.innerHTML = Math.round(((fahTemp - 32) * 5/9));
  tempFeelsLike.innerHTML = Math.round(((feelsTemp - 32) * 5/9));
  updateFiveDayTempFUnits()
};

function updateFiveDayTempFUnits() {
  let dailyHighs = document.querySelectorAll('.future-high')
  dailyHighs.forEach(day => {
    fiveDayFahHighTemp.push(Number(day.innerHTML.replace('°', '')))
    let dailyTemp = Number(day.innerHTML.replace('°', ''))
    day.innerHTML = Math.round(((dailyTemp - 32) * 5/9))+ '°';
  })
  let dailyLows = document.querySelectorAll('.future-low')
  dailyLows.forEach(day => {
    fiveDayFahLowTemp.push(Number(day.innerHTML.replace('°', '')))
    let dailyTemp = Number(day.innerHTML.replace('°', ''))
    day.innerHTML = Math.round(((dailyTemp - 32) * 5/9)) + '°';
  })
}

function updateFiveDayTempCUnits () {
  let dailyHighs = document.querySelectorAll('.future-high')
  dailyHighs.forEach((day, index) => {
    day.innerHTML = fiveDayFahHighTemp[index]+ '°'
  })
  let dailyLows = document.querySelectorAll('.future-low')
  dailyLows.forEach((day, index) => {
    day.innerHTML = fiveDayFahLowTemp[index]+ '°'
  })
}

fTemp.addEventListener("click", fClick);
cTemp.addEventListener("click", cClick);

searchByCity("New York");
displayFutureForecast();