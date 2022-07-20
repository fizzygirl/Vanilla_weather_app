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
    console.log(response);
    document.querySelector(
      "h1"
    ).innerHTML = `${response.data.data[0].city_name}, ${response.data.data[0].country_code}`;
    document.querySelector("#temp").innerHTML = Math.round(
      response.data.data[0].app_temp
    );
    document.querySelector("#weather-precipitation").innerHTML = Math.round(
        response.data.data[0].precip
      );
    document.querySelector("#weather-humidity").innerHTML =
      response.data.data[0].rh;
    document.querySelector("#weather-wind").innerHTML = Math.round(
      response.data.data[0].wind_spd
    );
    document.querySelector("#weather-description").innerHTML =
      response.data.data[0].weather.description;
      iconElement.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${response.data.data[0].weather.icon}.png`);
      iconElement.setAttribute("alt", response.data.data[0].weather.description);
  }

let date = new Date();
let currentday = document.querySelector("#currentday");
currentday.innerHTML = formatDate();

let h1 = document.querySelector("h1");
let form = document.querySelector("#entercity");
let temp = document.querySelector("#temp");
let weatherDescr = document.querySelector("#weather-description");
let weatherHum = document.querySelector("#weather-humidity");
let weatherWind = document.querySelector("#weather-wind");
let iconElement = document.querySelector("#icon");

form.addEventListener("submit", searchcity);

search("Odesa");





