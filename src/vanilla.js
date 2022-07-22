function formatDate(){
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
    
      let day = days[date.getDay()];
      let month = months[date.getMonth()];
      let currentdate = date.getDate();
        let hours = date.getHours();
        if (hours<10){
        hours = `0${hours}`;
        }
        let minutes = date.getMinutes();
        if (minutes<10){
        minutes = `0${minutes}`;
        }

      return `${day}, ${currentdate} ${month}, ${hours}:${minutes}`
      
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[day];
}

function displayForecast(response){
  console.log(response.data.data);
  let forecast = response.data.data;

    let forecastElement = document.querySelector("#forecast");
    
    // let days = ["Mon", "Tue", "Wed","Thu","Fri"];
    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
      let celsiusTempmax = forecastDay.max_temp;
      let celsiusTempmin = forecastDay.min_temp;
      if (index < 6 && index > 0 ){
        forecastHTML = 
        forecastHTML + 
        `
            <div class="col">        
            <div class="weather-forecast-day" >${formatDay(forecastDay.ts)}</div> 
            <img src="https://www.weatherbit.io/static/img/icons/${forecastDay.weather.icon}.png" alt="https://www.weatherbit.io/static/img/icons/${forecastDay.weather.description}.png" width="45"/>
            <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">${Math.round(celsiusTempmax)}°</span>/<span class="weather-forecast-temp-min">${Math.round(celsiusTempmin)}°</span>
            </div> 
            </div> 
        `;
      }
    })
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  // console.log(coordinates);
  let apiKey = "cb95f1d4c61a4b8897e33eeb2cc78c45";
  let apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}`;
    // console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
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

  function search(city) {
    let apiKey = "cb95f1d4c61a4b8897e33eeb2cc78c45";
    let apiUrl = `https://api.weatherbit.io/v2.0/current?&city=${city}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeatherCondition);
  }

  function displayWeatherCondition(response) {
    document.querySelector("h1").innerHTML = `${response.data.data[0].city_name} ${response.data.data[0].country_code}`;
    celsiusTemp = response.data.data[0].app_temp;
    document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);
    document.querySelector("#weather-precipitation").innerHTML = Math.round(response.data.data[0].precip);
    document.querySelector("#weather-humidity").innerHTML =response.data.data[0].rh;
    document.querySelector("#weather-wind").innerHTML = Math.round(response.data.data[0].wind_spd);
    document.querySelector("#weather-description").innerHTML =response.data.data[0].weather.description;
    
    iconElement.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${response.data.data[0].weather.icon}.png`);
    iconElement.setAttribute("alt", response.data.data[0].weather.description);
    // console.log(response.data.data[0]);
    getForecast(response.data.data[0]);
  }

  function retrievePosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
    let apiKey = "cb95f1d4c61a4b8897e33eeb2cc78c45";
    let apiUrl = `https://api.weatherbit.io/v2.0/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}`;

    axios.get(apiUrl).then(showcurrentTemp);
  }

  function showcurrentTemp(response) {
    celsiusTemp = response.data.data[0].app_temp;
    let temperature = Math.round(celsiusTemp);
    let city = response.data.data[0].city_name;
    let country = response.data.data[0].country_code;
    let weatherDes = response.data.data[0].weather.description;
    let precipitation = response.data.data[0].precip;
    let weatherhumidity = response.data.data[0].rh;
    let weatherwind = Math.round(response.data.data[0].wind_spd);

    h1.innerHTML = `${city} ${country}`;
    temp.innerHTML = `${temperature}`;
    weatherDescr.innerHTML = `${weatherDes}`;
    precip.innerHTML = `${precipitation}`;
    weatherHum.innerHTML = `${weatherhumidity}`;
    weatherWind.innerHTML = `${weatherwind}`;
    iconElement.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${response.data.data[0].weather.icon}.png`);
    iconElement.setAttribute("alt", response.data.data[0].weather.description);

    getForecast(response.data.data[0]);
  }

let date = new Date();
let currentday = document.querySelector("#currentday");
currentday.innerHTML = formatDate();

let h1 = document.querySelector("h1");
let form = document.querySelector("#entercity");
let temp = document.querySelector("#temp");
let weatherDescr = document.querySelector("#weather-description");
let precip = document.querySelector("#weather-precipitation")
let weatherHum = document.querySelector("#weather-humidity");
let weatherWind = document.querySelector("#weather-wind");
let iconElement = document.querySelector("#icon");

form.addEventListener("submit", searchcity);

let buttonCurrent = document.querySelector("#currentcity");
buttonCurrent.addEventListener("submit", retrievePosition);

search("Odesa");
