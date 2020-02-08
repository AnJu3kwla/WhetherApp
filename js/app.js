//api key: 4c665dc481mshdd4740c46d7228dp12ce8ajsn3cba72e9e0e6

//seleting elements
const iconElement = document.querySelector(".whether-icon");
const tempElement = document.querySelector(".temparature-value p");
const descElement = document.querySelector(".temparature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather ={};

weather.temparature = {
  unit : "celsius"
}

//App conts and variables
const KELVIN = 273;

//API key
const key = "82005d27a116c2880c8f0fcb866998a0";

//check if browser support Geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

//set user's position
function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude,longitude);
}

//show error if there is any issue with geolocation service
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
//get weather from API
function getWeather(latitude, longitude){
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);
  fetch(api)
            .then(function(response){
              let data = response.json();
              return data;
            })
            .then(function(data){
              weather.temparature.value=Math.floor(data.main.temp-KELVIN);
              weather.description = data.weather[0].description;
              weather.iconId = data.weather[0].icon;
              weather.city = data.name;
              weather.country = data.sys.country;
            })
            .then(function(){
              displayWeather();
            });
}
//display weather to UI
function displayWeather(){
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temparature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

//C to F function
function celciusToFarenheite(temparature){
  return (temparature * 9/5) + 32;
}

//when the user clicks on temparature
tempElement.addEventListener("click",function(){
  if(weather.temparature.value = "undefined") return;

  if(weather.temparature.unit = "celsius"){
    let faranheit = celciusToFarenheite(weather.temparature.value);
    faranheit = Math.floor(faranheit);
    tempElement.innerHTML = `${faranheit}°<span>F</span>`;
    weather.temparature.unit = "faranheit";
  }
  else{
    tempElement.innerHTML = `${weather.temparature.value}°<span>C</span>`;
    weather.temparature.unit = "celsius";
  }
});
