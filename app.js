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















////
