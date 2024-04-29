const form = document.querySelector('#form');
const input = document.querySelector('.input');
const api_key = 'fe47b1234c77601be2c5e9395c12f834'

form.onsubmit = submitHandler;
async function submitHandler(e){
    e.preventDefault();
    if(!input.value.trim()){
        alert('Enter city');
    }
    const cityName = input.value.trim();
    input.value = '';

    const cityInfo = await getGeo(cityName)

    const weatherInfo = await getWeather(cityInfo[0]['lat'], cityInfo[0]['lon']);

    console.log(weatherInfo.weather[0]['main'])

    if(!cityInfo.length) return


    const weatherData = {
        name: weatherInfo.name,
        temp: weatherInfo.main.temp,
        humidity: weatherInfo.main.humidity,
        speed: weatherInfo.wind.speed,
        main: weatherInfo.weather[0]['main']

    }
    renderWeatherData(weatherData)
}

async function getGeo(name){
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${api_key}`
    const response = await fetch(geoUrl);
    const data = await response.json();
    // console.log(data)
    return data
}

async function getWeather(lat, lon){
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`;
    const response = await fetch(weatherUrl);
    const data = await response.json();
    // console.log(data)
    return data
}

function renderWeatherData(data){

    document.querySelector('.weather_description').classList.remove('none');
    document.querySelector('.weather_details').classList.remove('none');


    const temp = document.querySelector(".weather_temp_details");
    const name = document.querySelector(".weather_city");
    const humidity = document.querySelector("#humidity");
    const speed = document.querySelector("#speed");
    const img = document.querySelector(".weather_image")

    temp.innerText = Math.round(data.temp);
    name.innerText = data.name;
    humidity.innerText = data.humidity;
    speed.innerText = data.speed;
    // img.src = data.main;

    const fileName = {
        'Clouds' : 'clouds',
        'Clear' : 'sunny',
        'Rain' : 'rain',
        'Few clouds': 'few_clouds',
        'Shower rain':'shower_rain',
        'Thunderstorm': 'thunderstorm',
        'Snow': 'snow',
        'Mist': 'mist'

    }
    if(fileName[data.main]){
        img.src = `./img/${fileName[data.main]}.png`;
    }



}














