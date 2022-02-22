let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");

if (
  city === "paris" ||
  city === "tokyo" ||
  city === "lisbon" ||
  city === "san francisco" ||
  city === "moscow"
) {
  alert(
    `It is currently ${Math.round(weather[city].temp)}℃ (${Math.round(
      (weather[city].temp * 9) / 5 + 32
    )}℉) in ${city} with a humidity of ${weather[city].humidity}`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
let now = new Date();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let dayTime = document.querySelector("#daytime");
dayTime.innerHTML = `${day} , ${hour} : ${minute}`;

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  document.querySelector("#city-name").innerHTML = response.data.name;
}

function cityTemperature(event) {
  event.preventDefault();
  let cityName = document.querySelector("#citysearch").value;
  let cityEndResult = `${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(cityEndResult).then(showTemperature);
}

let apiKey = `ae2ec4b5c918b23f97601cbc84d57ecd`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

let entryForm = document.querySelector("#entry-form");
entryForm.addEventListener("submit", cityTemperature);

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let endGeoWeatherResult = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(endGeoWeatherResult).then(showTemperature);
}
function showCurrentCityWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentTemperature = document.querySelector("#current");
currentTemperature.addEventListener("click", showCurrentCityWeather);
