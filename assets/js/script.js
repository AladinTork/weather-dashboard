const cityEl = document.getElementById('city-info');
const searchBtn = document.getElementById('btn-search');
const searchInput = document.getElementById('search-query');
const WeatherAPIKey = "0fca900f3672fb4378271e787a4aa86c";

let city;
let lon;
let lat;

const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WeatherAPIKey}`;

function getApi(UrlArg) {
  fetch(queryURL).then(function (response) {
    return response.json();
  }).then(function(data){
    console.log(data);
  });
}

searchBtn.addEventListener('click', function(event){
  event.preventDefault();
  console.log(searchInput.value);
})



