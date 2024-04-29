document.addEventListener("DOMContentLoaded", function () {

  fetch("https://restcountries.com/v3/all")
    .then((response) => response.json())
    .then((data) => {
     
      displayCountryCards(data);
    })
    .catch((error) => console.log("Error fetching countries:", error));

 
  function displayCountryCards(countriesData) {
   
    const countryCardsContainer = document.getElementById("countryCards");

    countriesData.forEach((country) => {
    
      const col = document.createElement("div");
      col.classList.add("col-lg-4", "col-sm-12", "mb-4");

      const card = document.createElement("div");
      card.classList.add("card");

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = country.name.common;

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerHTML = `
        <strong>Capital:</strong> ${country.capital}<br>
        <strong>Region:</strong> ${country.region}<br>
        <strong>Latitude:</strong> ${country.latlng[0]}<br>
        <strong>Longitude:</strong> ${country.latlng[1]}<br>
        <strong>Flag:</strong> <img src="${country.flags.png}" alt="${country.name.common} Flag" style="width: 50px;"><br>
        <strong>Country Codes:</strong> ${country.cca2}, ${country.cca3}<br>
      `;

      const button = document.createElement("button");
      button.classList.add("btn", "btn-primary");
      button.textContent = "Click for Weather";
      button.addEventListener("click", function () {
        fetchWeatherData(country);
      });

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(button);

      card.appendChild(cardBody);

      col.appendChild(card);

      countryCardsContainer.appendChild(col);
    });
  }

  function fetchWeatherData(country) {
    const { latlng } = country;
    const [lat, lng] = latlng;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=YOUR_API_KEY&units=metric`
    )
      .then((response) => response.json())
      .then((weatherData) => {
        displayWeatherModal(country, weatherData);
      })
      .catch((error) => console.log("Error fetching weather data:", error));
  }

  function displayWeatherModal(country, weatherData) {
    const { main, weather } = weatherData;
    const { temp, humidity } = main;
    const { description } = weather[0];

    alert(
      `Weather in ${country.name.common}:\nTemperature: ${temp}°C\nHumidity: ${humidity}%\nDescription: ${description}`
    );
  }
});
