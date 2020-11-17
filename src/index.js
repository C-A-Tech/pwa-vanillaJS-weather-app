function formatDate(timestamp){
           
              let date = new Date(timestamp);
              
              let hours = date.getUTCHours();
              if (hours <= 9 ) {
                    hours = `0${hours}`;}
              let minutes = date.getUTCMinutes();
              if (minutes <= 9 ) {
                     minutes = `0${minutes}`;}
                  
              let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
              let day = days [date.getUTCDay()];
              
              return (`${day} ${hours}:${minutes}`);
            }


        
            
function searchCity (event){
              event.preventDefault();
              let searchInput = document.querySelector("#search-text");
              let h1 = document.querySelector("h1");
              h1.innerHTML = searchInput.value; 
              
              let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=`;
              let apiKey = `3761132c277b101af753d86b9dffa392`;
              axios.get(`${apiUrl}${searchInput.value}&units=metric&appid=${apiKey}`).then(showTemperature);
              
            }

function showTemperature (response) {
            
              let liveTemp = `${Math.round(response.data.main.temp)}`;
              let currentTemp= document.querySelector("#temp-number");
              currentTemp.innerHTML = liveTemp;
              
              let descriptionElement = document.querySelector("#description");
              descriptionElement.innerHTML = response.data.weather[0].description;

              let windSpeedElement = document.querySelector("#wind-speed");
              windSpeedElement.innerHTML = Math.round(response.data.wind.speed);

              let humidityElement = document.querySelector("#humidity");
              humidityElement.innerHTML = response.data.main.humidity;

              let h1 = document.querySelector("h1");
              h1.innerHTML = response.data.name;
              
              let date = document.querySelector("#date");
              let timezoneDifference = response.data.dt + response.data.timezone;
              date.innerHTML = formatDate(timezoneDifference * 1000); 
              
              let weatherIconElement = document.querySelector("#weather-icon");
              let iconAPI = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`;
              weatherIconElement.setAttribute("src", iconAPI);
console.log(response.data.weather[0].icon)

      function changeUnitC (event) {
              event.preventDefault();
              currentTemp.innerHTML = liveTemp;
              }

      function changeUnitF (event) {
              event.preventDefault();
              currentTemp.innerHTML = Math.round((liveTemp/5)*9 + 32);
              }


              let changeCelsius = document.querySelector("#celsius");
              let changeFahrenheit=document.querySelector("#fahrenheit");
              changeCelsius.addEventListener("click", changeUnitC);
              changeFahrenheit.addEventListener("click", changeUnitF);
          }

  let form =  document.querySelector("form.search");
  form.addEventListener("submit", searchCity);




  function showPosition(position) {
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?`;
      let apiKey = `3761132c277b101af753d86b9dffa392`;
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
           
      axios.get(`${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`).then(showTemperature);
          }

  function useMyLocation () {navigator.geolocation.getCurrentPosition(showPosition);}

  let currentLocation = document.querySelector(".geo-btn");
  currentLocation.addEventListener("click", useMyLocation);











 



