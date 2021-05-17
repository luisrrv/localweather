window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector (".temperature-description");
  let temperatureDegree = document.querySelector (".temperature-degree");
  let locationTimezone = document.querySelector (".location-timezone");
  let weatherIcon = document.querySelector (".icon");
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2c96026c2b75c25b82c3b490fab4f751&units=imperial`;
      


      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        const {temp, name} = data.main;
        const {description, icon} = data.weather[0];
        //Set DOM Elements from API
        temperatureDegree.textContent = Math.floor(temp);
        temperatureDescription.textContent = description;
        locationTimezone.textContent = data.name;
        //FORMULA FOR CELSIUS
        let celsius = (temp - 32) * (5 / 9);
        //Set Icon
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="">`;

        // Change temp to celsius/farenheit
        temperatureSection.addEventListener('click', ()=> {
          if(temperatureSpan.textContent === "F"){
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
          }else {
            temperatureSpan.textContent = "F";
            temperatureDegree.textContent = Math.floor(temp);
          }
        });

      });
    });
  }

  
});
