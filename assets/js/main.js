

// ! API Key
const apiKey = "874ce9c13ce43fc2440816a921167ac0";
// ! Bindings
const cityInput = document.getElementById("city");
const checkBtn = document.getElementById("button");
const resetBtn = document.getElementById("reset");
const cityLocation = document.getElementById("location");
const weatherIcon = document.getElementById("weatherIcon");
const weatherSection = document.getElementById("weatherIcon");
const obtained = document.getElementById("obtained");
const localTimeArticle = document.getElementById("localTime");
const windArticle = document.getElementById("wind");
const cloudArticle = document.getElementById("cloudiness");
const pressureArticle = document.getElementById("pressure");
const humidityArticle = document.getElementById("humidity");
const sunriseArticle = document.getElementById("sunrise");
const sunsetArticle = document.getElementById("sunset");
const geoArticle = document.getElementById("geoCoords");
const info = document.querySelector("info");
let clickCount = 0;

// ! Wind Power Function
const beaufortSkala = (value) => {
    if(value >= 0 && value <= 0.2)
        return `Windstille bei ${value} m/s, Windstärke: 0`;
    if(value >= 0.3 && value <= 1.5)
        return `Leiser Zug bei ${value} m/s, Windstärke: 1`;
    if(value >= 1.6 && value <= 3.3)
        return `Leichte Brise bei ${value} m/s, Windstärke: 2`;
    if(value >= 3.4 && value <= 5.4)
        return `Schwacher Wind bei ${value} m/s, Windstärke: 3`;
    if(value >= 5.5 && value <= 7.9)
        return `Mäßige Brise, mäßiger Wind ${value} m/s, Windstärke: 4`;
    if(value >= 8.0 && value <= 10.7)
        return `Frische Brise, frischer Wind ${value} m/s, Windstärke: 5`;
    if(value >= 10.8 && value <= 13.8)
        return `Starker Wind ${value} m/s, Windstärke: 6`;
    if(value >= 13.9 && value <= 17.1)
        return `Steifer Wind ${value} m/s, Windstärke: 7`;
    if(value >= 17.2 && value <= 20.7)
        return `Stürmischer Wind ${value} m/s, Windstärke: 8`;
    if(value >= 20.8 && value <= 24.4)
        return `Sturm ${value} m/s, Windstärke: 9`;
    if(value >= 24.5 && value <= 28.4)
        return `Schwerer Sturm ${value} m/s, [Windstärke: 0`;
    if(value >= 28.5 && value <= 32.6)
        return `Orkanartiger Sturm ${value} m/s, [Windstärke: 1`;
    if(value >= 32.7)
        return `Orkan ${value} m/s, [Windstärke: 2`;
    }
    
// ! Wind direction Funktion
    const directionDeg = (deg) => {
        if(deg >= 20 && deg <= 69.99)
            return `North East (${deg}°)`;
        if(deg >= 70 && deg <= 109.99)
            return `East (${deg}°)`;
        if(deg >= 110 && deg <= 159.99)
            return `South East (${deg}°)`;
        if(deg >= 160 && deg <= 199.99)
            return `South (${deg}°)`;
        if(deg >= 200 && deg <= 249.99)
            return `South West (${deg}°)`;
        if(deg >= 250 && deg <= 289.99)
            return `West (${deg}°)`;
        if(deg >= 290 && deg <= 339.99)
            return `North West (${deg}°)`;
        if(deg >= 340)
            return `North (${deg}°)`;
        if(deg <= 19.99)
            return `North (${deg}°)`;
    }

    //! Click Function

checkBtn.addEventListener('click', (event) =>{
    
    // clickCount++;
    // if (clickCount == 1) {
    //     checkBtn.style.display = "none"

    // }
    
    weatherIcon.childElementCount >= 1 ? weatherIcon.innerHTML = "" : "";
    obtained.childElementCount >= 1 ? obtained.innerHTML = "" : "";
    localTimeArticle.childElementCount >= 1 ? localTimeArticle.innerHTML = "" : "";
    windArticle.childElementCount >= 1 ? windArticle.innerHTML = "" : "";
    cloudArticle.childElementCount >= 1 ? cloudArticle.innerHTML = "" : "";
    pressureArticle.childElementCount >= 1 ? pressureArticle.innerHTML = "" : "";
    humidityArticle.childElementCount >= 1 ? humidityArticle.innerHTML = "" : "";
    sunriseArticle.childElementCount >= 1 ? sunriseArticle.innerHTML = "" : "";
    sunsetArticle.childElementCount >= 1 ? sunsetArticle.innerHTML = "" : "";
    geoArticle.childElementCount >= 1 ? geoArticle.innerHTML = "" : "";


    let cityName = cityInput.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        
        
        // ! City-location
        cityLocation.innerHTML = `Weather in ${data.name}, ${data.sys.country}`

        // ! Weather icon
        const alt = data.weather[0].description;
        const image = document.createElement("img")
        const imageText = document.createElement("h3")
        imageText.textContent = `${data.main.feels_like.toFixed()} °C`
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        image.setAttribute("src", icon)
        image.setAttribute("alt", alt)
        weatherSection.appendChild(image)
        weatherSection.appendChild(imageText)

        
        // ! Obtained Time
        const obtainedTime = new Date(data.dt * 1000)
        console.log(new Date(data.dt * 1000));
        let getHours = obtainedTime.getHours();
        let getMinutes = obtainedTime.getMinutes();
        let getDate = obtainedTime.getDate();
        
        if (getHours < 10) {
            getHours =`0${getHours}`
        }
        if (getMinutes < 10) {
            getMinutes =`0${getMinutes}`
        }
        if (getDate < 10) {
            getDate =`0${getDate}`
        }
        
        const obtainedTag = document.createElement("p")
        obtainedTag.textContent = `Obtained at ${getHours}:${getMinutes}, ${getDate} ${obtainedTime.toLocaleString('default', {month: 'short'})} ${obtainedTime.getFullYear()}`
        obtained.appendChild(obtainedTag)

        // ! Aktuelle Zeit - Local Time
        // - Zeitumrechnung
        const shiftInSeconds = data.timezone;
        const berlinTime = new Date();
        const berlinOffset = berlinTime.getTimezoneOffset() * 60; // Zeitverschiebung in Sekunden aufgrund der Berliner Zeitzone und der Standardzeit
        const utcTime = new Date();
        utcTime.setSeconds(utcTime.getSeconds() + shiftInSeconds + berlinOffset);
        console.log("Timezone: "+ utcTime);

        let getLocalHours = utcTime.getHours();
        let getLocalMinutes = utcTime.getMinutes();
        let getLocalDate = utcTime.getDate();
        
        if (getLocalHours < 10) {
            getLocalHours =`0${getLocalHours}`
        }
        if (getLocalMinutes < 10) {
            getLocalMinutes =`0${getLocalMinutes}`
        }
        if (getLocalDate < 10) {
            getLocalDate =`0${getLocalDate}`
        }
        // - Einbindung
        const localTimeText = document.createElement("p")
        const localTime = document.createElement("p")
        localTimeText.textContent = "Local Time:"
        localTime.textContent = `${getLocalHours}:${getLocalMinutes}, ${getLocalDate} ${utcTime.toLocaleString('default', {month: 'short'})} ${utcTime.getFullYear()}`
        localTimeArticle.appendChild(localTimeText)
        localTimeArticle.appendChild(localTime)
        
        // ! Wind Section
        // - Wind power
        let imgWind = document.createElement("img");
        imgWind.src = "https://media0.giphy.com/media/XmfjDw9rYnYhAbKtsa/giphy.gif?cid=ecf05e4796z17xqk2d2mt9xaqkwn62o6393xqzgsc4nj909z&rid=giphy.gif&ct=s";
        windArticle.appendChild(imgWind);
        const windTag = document.createElement("p")
        windTag.textContent = beaufortSkala(data.wind.speed);
        windArticle.appendChild(windTag)

        // - Wind direction   
        const degTag = document.createElement("p")
        degTag.textContent = directionDeg(data.wind.deg)
        windArticle.appendChild(degTag)

        // ! Cloudiness
        let imgCloud = document.createElement("img");
        imgCloud.src = "./assets/img/cloudy.gif";
        cloudArticle.appendChild(imgCloud);
        const cloudTag = document.createElement("p")
        cloudTag.textContent = data.weather[0].description
        cloudArticle.appendChild(cloudTag)

        // ! Pressure
        let imgPressure = document.createElement("img");
        imgPressure.src = "./assets/img/pressure.png";
        pressureArticle.appendChild(imgPressure);
        const pressureTag = document.createElement("p");
        pressureTag.textContent = `${data.main.pressure} hpa`;
        pressureArticle.appendChild(pressureTag)

         // ! Humidity
         let imgHumidity = document.createElement("img");
         imgHumidity.src = "./assets/img/drop.gif";
         humidityArticle.appendChild(imgHumidity);
         const humidityTag = document.createElement("p")
         humidityTag.textContent = `${data.main.humidity} %`;
         humidityArticle.appendChild(humidityTag)

         // ! Sunrise
        let getSunriseHours = new Date(data.sys.sunrise * 1000).getHours();
        let getSunriseMinutes = new Date(data.sys.sunrise * 1000).getMinutes();
        
        if (getSunriseHours < 10) {
            getSunriseHours =`0${getSunriseHours}`
        }
        if (getSunriseMinutes < 10) {
            getSunriseMinutes =`0${getSunriseMinutes}`
        }
         const sunrise = `${getSunriseHours}:${getSunriseMinutes}`;
         
         let imgSunrise = document.createElement("img");
         imgSunrise.src = "https://media4.giphy.com/media/hsgoFoHbqNDaXkcVG5/giphy.gif?cid=ecf05e4707h9wbej8ac5srihf541k6ikvkhc5j7esdrmdc5l&rid=giphy.gif&ct=s";
         sunriseArticle.appendChild(imgSunrise);
         const sunriseTag = document.createElement("p")
         sunriseTag.textContent = sunrise;
         sunriseArticle.appendChild(sunriseTag)

         // ! Sunset
        let getSunsetHours = new Date(data.sys.sunset * 1000).getHours();
        let getSunsetMinutes = new Date(data.sys.sunset * 1000).getMinutes();
        
        if (getSunsetHours < 10) {
            getSunsetHours =`0${getSunsetHours}`
        }
        if (getSunsetMinutes < 10) {
            getSunsetMinutes =`0${getSunsetMinutes}`
        }
         let imgSunset = document.createElement("img");
         imgSunset.src = "https://media4.giphy.com/media/SWOrko6ftbH1bO5Vml/giphy.gif?cid=ecf05e470977i01c9ah0w6r17qzggzf0umi8z30i2fkyex0h&rid=giphy.gif&ct=s";
         sunsetArticle.appendChild(imgSunset);
         const sunset = `${getSunsetHours}:${getSunsetMinutes}`;
         const sunsetTag = document.createElement("p")
         sunsetTag.textContent = sunset;
         sunsetArticle.appendChild(sunsetTag)
        
        // ! Coordinates
        let imgGeo = document.createElement("img");
        imgGeo.src = "./assets/img/gps.png";
        geoArticle.appendChild(imgGeo);
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;
        const geoTag = document.createElement("p")
        geoTag.textContent = `[${latitude.toFixed(2)}, ${longitude.toFixed(2)}]`;
        geoArticle.appendChild(geoTag)
        
    })

.catch((error) =>{
    console.log(error);
 })

})

resetBtn.addEventListener('click', () =>{
    weatherIcon.innerHTML = "";
    obtained.innerHTML = "";
    localTimeArticle.innerHTML = "";
    windArticle.innerHTML = "";
    cloudArticle.innerHTML = "";
    pressureArticle.innerHTML = "";
    humidityArticle.innerHTML = "";
    sunriseArticle.innerHTML = "";
    sunsetArticle.innerHTML = "";
    geoArticle.innerHTML = "";
   clickCount = 0;
    let imgReset = document.createElement("img");
    imgReset.src = "./assets/img/sun.gif";
    weatherIcon.appendChild(imgReset);
    imgReset.style.width = "100%"
    imgReset.style.borderRadius = "50px"
    localTimeArticle.style.display = "none"

})

