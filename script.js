const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiKey = "YOUR_API_KEY"; // https://openweathermap.org/

const input = document.getElementById("input");
const search = document.getElementById("search");
let cloudImage = document.getElementById("cloudImage");

async function weatherInfo(city) {
  const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
  let data = await response.json();

  if (data.cod != "404") {
    document.getElementById("temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.getElementById("city").innerHTML = data.name;
    document.getElementById("humidity").innerHTML = data.main.humidity + "%";
    document.getElementById("speed").innerHTML = data.wind.speed + " Km/hr";
    document.getElementById("CloudTemp").classList.remove("hidden");
    document.getElementById("humidityCard").classList.remove("hidden");
    document.getElementById("windCard").classList.remove("hidden");
  } else {
    document.getElementById("city").innerHTML = data.message
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    document.getElementById("temp").innerHTML = "--";
    document.getElementById("humidity").innerHTML = "--";
    document.getElementById("speed").innerHTML = "--";
  }

  if (data.weather[0].main == "Clouds") {
    cloudImage.src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    cloudImage.src = "images/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    cloudImage.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    cloudImage.src = "images/mist.png";
  } else if (data.weather[0].main == "Rain") {
    cloudImage.src = "images/rain.png";
  } else {
    cloudImage.src = "images/snow.png";
  }
}

search.addEventListener("click", () => {
  weatherInfo(input.value);
});

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
