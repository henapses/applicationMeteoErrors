const loader = document.querySelector(".loader-container");
const errorInforamtion = document.querySelector(".error-information");
const button = document.querySelector("button");

async function getWeatherData() {
  try {
    const response = await fetch(
      "http://api.airvisual.com/v2/nearest_city?key=1771e9ca-1bd8-4d07-b8ff-493f419cdef5"
    );
    console.log(response.ok);

    if (!response.ok) {
      throw new Error(`erreur ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    const sortedData = {
      city: responseData.data.city,
      country: responseData.data.country,
      temperature: responseData.data.current.weather.tp,
      iconId: responseData.data.current.weather.ic,
    };

    populateUi(sortedData);
  } catch (error) {
    loader.classList.remove("active");
    errorInforamtion.textContent = error.message;
  }
}

button.addEventListener("click", (e) => {
  getWeatherData();
});

const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const temperature = document.querySelector(".temperature");
const infoIcon = document.querySelector(".info-icon");

console.log(temperature);

function populateUi(data) {
  cityName.textContent = data.city;
  countryName.textContent = data.country;
  temperature.textContent = `${data.temperature}°`;
  infoIcon.src = `ressources/icons/${data.iconId}.svg`;
  infoIcon.style.width = "150px";
  loader.classList.remove("active");

  console.log(data.temperature);
}
