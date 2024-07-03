const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherbox = document.querySelector(".weather-box");
const weatherdetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
    const APIKey = "020302f88f2f7a49593cd2dc83281050";
    const city = document.querySelector(".search-box input").value;
    if (city === "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
    )
    .then((response) => response.json())
    .then((json) => {
        if(json.cod == "404"){
            container.style.height = "400px";
            weatherbox.classList.remove("active");
            weatherdetails.classList.remove("active");
            error404.classList.add("active");
            return;
        }else{
            container.style.height = "555px";
            weatherbox.classList.add("active");
            weatherdetails.classList.add("active");
            error404.classList.remove("active");
        }


        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main) {
            case "Clear":
                image.src = "https://cdn.icon-icons.com/icons2/3349/PNG/256/cloudy_weather_sun_cloud_icon_210228.png";
                break;
            case "Rain":
                image.src = "https://cdn.icon-icons.com/icons2/33/PNG/96/weather_storms_storm_rain_thunder_2783.png";
                break;
            case "Snow":
                image.src = "https://cdn.icon-icons.com/icons2/33/PNG/96/snow_cloud_weather_2787.png";
                break;
            case "Clouds":
                image.src = "https://cdn.icon-icons.com/icons2/624/PNG/96/Cloud-80_icon-icons.com_57352.png";
                break;
            case "Mist":
                image.src = "https://cdn.icon-icons.com/icons2/3000/PNG/96/mist_weather_foggy_cloud_icon_187700.png";
                break;
            case "Haze":
                image.src = "https://cdn.icon-icons.com/icons2/3255/PNG/96/haze_weather_icon_205765.png";
                break;
            default:
                image.src = "https://cdn.icon-icons.com/icons2/3349/PNG/256/cloudy_weather_sun_cloud_icon_210228.png";
        }

        temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span></span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

        weatherbox.style.display = "";
        weatherdetails.style.display = "";
    });
});
