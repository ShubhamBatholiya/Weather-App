const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const cityname = document.querySelector('.cityname');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");


async function checkWeather(city) {
    const api_key = '8a23bf7f2aeb460b9beddf21de159166';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    // if user enters a wrong location
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = 'flex';

    cityname.innerHTML = city;
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "images/cloud.svg";
            break;
        case 'Clear':
            weather_img.src = "images/clear.svg";
            break;
        case 'Rain':
            weather_img.src = "images/rain.svg";
            break;
        case 'Mist':
            weather_img.src = "images/mist.svg";
            break;
        case 'Snow':
            weather_img.src = "images/snow.svg";
            break;
        case 'Smoke':
            weather_img.src = "images/smoke.svg";
            break;
        case 'Haze':
            weather_img.src = "images/haze.svg";
            break;
        case 'Drizzle':
            weather_img.src = "images/drizzle.svg";
            break;
    }
}

checkWeather("delhi");

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});

// when user press the Enter key after typing the cityname in input field
inputBox.addEventListener("keyup", function(event) {
    if (event.key == "Enter" && inputBox.value != "") {
        searchBtn.click();
        //checkWeather(inputBox.value);
    }
  });