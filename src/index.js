function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayofweek = days[now.getDay()];
  let monthofweek = months[now.getMonth()];

  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currenttime = `${hours}:${minutes}`;

  return `${dayofweek}, ${date} ${monthofweek}, ${currenttime}`;
}

function displayWeatherCondition(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#weather-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
    iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "2e514710b27ee466557a5ca2f62973ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchcity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  if (city) {
    search(city);
  } else {
    alert("Enter city");
  }
}

let currentday = document.querySelector("#currentday");
let now = new Date();

currentday.innerHTML = formatDate();

let h1 = document.querySelector("h1");
let form = document.querySelector("#entercity");
let temp = document.querySelector("#temp");
let weatherDescr = document.querySelector("#weather-description");
let weatherHum = document.querySelector("#weather-humidity");
let weatherWind = document.querySelector("#weather-wind");
let iconElement = document.querySelector("#icon");

form.addEventListener("submit", searchcity);


function showcurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let country = response.data.sys.country;
  let weatherDes = response.data.weather[0].description;
  let weatherhumidity = response.data.main.humidity;
  let weatherwind = Math.round(response.data.wind.speed);
  console.log(city);
  h1.innerHTML = `${city}, ${country}`;
  temp.innerHTML = `${temperature}`;
  weatherDescr.innerHTML = `${weatherDes}`;
  weatherHum.innerHTML = `${weatherhumidity}`;
  weatherWind.innerHTML = `${weatherwind}`;
  console.log(response);
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let apiKey = "2e514710b27ee466557a5ca2f62973ac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showcurrentTemp);
}

function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonCurrent = document.querySelector("#currentcity");
buttonCurrent.addEventListener("submit", retrievePosition);

search("Odesa");
