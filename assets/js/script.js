let cityEl = document.getElementById("city-info");
let forecastEl = document.getElementById("5-day-info");
const searchBtn = document.getElementById("btn-search");
const searchInput = document.getElementById("search-query");
const presetBtn = document.querySelectorAll('.preset');
const WeatherAPIKey = "0fca900f3672fb4378271e787a4aa86c";

//  const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}`;

function dailyWeather(UrlArg) {
  fetch(UrlArg)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let city = data[0].name;
      let lon = data[0].lon;
      let lat = data[0].lat;
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // creating the daily info section
          console.log(data);
          cityEl.textContent = "";
          let dailyInfo = document.createElement("h3");
          dailyInfo.textContent = `${city} (${data.list[0].dt_txt.substring(
            0,
            10
          )})`;
          cityEl.appendChild(dailyInfo);
          let dailyTemp = document.createElement("p");
          dailyTemp.textContent = `Temp: ${data.list[0].main.temp}°F`;
          cityEl.appendChild(dailyTemp);
          let dailyWind = document.createElement("p");
          dailyWind.textContent = `Wind: ${data.list[0].wind.speed} MPH`;
          cityEl.appendChild(dailyWind);
          let dailyHum = document.createElement("p");
          dailyHum.textContent = `Humidity: ${data.list[0].main.humidity} %`;
          cityEl.appendChild(dailyHum);
          //creating 5-day forecast section
          let forecastHeader = document.createElement("h4");
          forecastHeader.textContent = '5-Day Forecast';
          forecastEl.appendChild(forecastHeader);
          for (let i = 0; i < 5; i++){
            let temp = data.list[i*8].main.temp;
            let hum = data.list[i*8].main.humidity;
            let wind = data.list[i*8].wind.speed;
            let card = document.createElement('div');
            card.classList.add('card', 'col-lg', 'col-md-6');
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = `(${data.list[i*8].dt_txt.substring(0,10)})`;
            cardBody.appendChild(cardTitle);
            let cardTemp = document.createElement('p');
            cardTemp.classList.add('card-text');
            cardTemp.textContent = `Temp: ${temp}°F`;
            cardBody.appendChild(cardTemp);
            let cardWind = document.createElement('p');
            cardWind.classList.add('card-text');
            cardWind.textContent = `Wind: ${wind} MPH`;
            cardBody.appendChild(cardWind);
            let cardHum = document.createElement('p');
            cardHum.classList.add('card-text');
            cardHum.textContent = `Humidity: ${hum}%`;
            cardBody.appendChild(cardHum);
            card.appendChild(cardBody);
            forecastEl.appendChild(card);
          }
        });
    });
}





searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&limit=5&appid=${WeatherAPIKey}`;
  dailyWeather(queryURL);
});

presetBtn.forEach(button => {
  button.addEventListener('click',function(){
    let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${button.textContent}&limit=5&appid=${WeatherAPIKey}`;
    dailyWeather(queryURL);
  })
})