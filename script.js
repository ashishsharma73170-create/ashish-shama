const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

async function getWeather(city){

    document.getElementById("message").innerText="";

    try{

        // Get City Coordinates
        const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if(!geoData.results){
            throw new Error("City not found");
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        // Weather API
        const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        document.getElementById("cityName").innerText = geoData.results[0].name;

        document.getElementById("temp").innerText =
        weatherData.current.temperature_2m;

        document.getElementById("wind").innerText =
        weatherData.current.wind_speed_10m;

    }

    catch(error){

        document.getElementById("message").innerText = error.message;

    }

}

searchBtn.addEventListener("click",function(){

    const city = cityInput.value.trim();

    if(city===""){
        alert("Please enter city name");
        return;
    }

    getWeather(city);

});