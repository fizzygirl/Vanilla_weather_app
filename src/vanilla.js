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

let date = new Date();
let currentday = document.querySelector("#currentday");
currentday.innerHTML = formatDate();





