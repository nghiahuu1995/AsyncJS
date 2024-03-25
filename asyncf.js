const API_KEY = "Enter your API key here";

const container = document.createElement("div");
const button = document.createElement("button");
const cities = ["New York", "France", "Tokyo", "Ha Noi", "London"];

const countryCodes = {
  "United States of America": { icon: "🗽", code: "us" },
  France: { icon: "🗼", code: "fr" },
  Japan: { icon: "🗾", code: "jp" },
  Vietnam: { icon: "⭐", code: "vn" },
  "United Kingdom": { icon: "🏢", code: "gb-eng" },
};
container.className = "container";
document.body.appendChild(container);
const getCountryCode = (country) => {
  const { icon, code } = countryCodes[country] || { icon: "", code: "" };
  return { countryIcon: icon, countryCode: code };
};
const getCondition = (condition) => {
  let weatherIcon;
  if (condition === "Clear") weatherIcon = "😎";
  if (condition === "Sunny") weatherIcon = "🌞";
  if (condition === "Cloudy") weatherIcon = "🌥️";
  if (condition === "Partly cloudy") weatherIcon = "🌥️";
  if (condition === "Raining") weatherIcon = "🌧️";
  if (condition === "Mist") weatherIcon = "😶‍🌫️";
  return weatherIcon;
};
async function fetchAPI(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
  );

  if (!response.ok) throw new Error("Failed to fetch API");
  const data = await response.json();
  return data;
}

button.textContent = "Fetch Weather";
document.body.appendChild(button);
button.addEventListener("click", () => {
  container.innerHTML = "";
  const promises = cities.map((city) => fetchAPI(city));
  Promise.any(promises)
    .then((data) => {
      const country = document.createElement("p");
      const weather = document.createElement("p");
      const temp = document.createElement("p");
      const image = document.createElement("img");
      const wind = document.createElement("p");
      const humidity = document.createElement("p");
      let imgSrc;
      const iconAndCountryCode = getCountryCode(data.location.country);
      const { countryIcon, countryCode } = iconAndCountryCode;
      console.log(countryCode, iconAndCountryCode);
      const condition = getCondition(data.current.condition.text);

      imgSrc = data.location.country;
      console.log(data, countryCode);
      image.src = `https://flagcdn.com/w160/${countryCode}.png`;
      country.textContent = `Country:${countryIcon} ${data.location.country}`;

      weather.textContent = `Weather: ${condition} ${data.current.condition.text}`;
      temp.textContent = `Temp: ${data.current.temp_f} F ${
        data.current.temp_f > 90 ? "🔥" : "❄️"
      }`;
      wind.textContent = `Wind 🌬️: ${data.current.wind_mph}mph`;
      humidity.textContent = `Humidity 💧: ${data.current.humidity}`;
      container.appendChild(country);
      container.appendChild(image);
      container.appendChild(weather);
      container.appendChild(temp);
      container.appendChild(wind);
      container.appendChild(humidity);

      document.body.appendChild(container);
    })
    .catch((err) => console.error(err.message));
});
// Styling
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.alignItems = "center";
container.style.padding = "20px";
container.style.width = "400px";

container.style.backgroundColor = "##fffdda";
container.style.margin = "auto";

button.style.padding = "12px";
button.style.position = "absolute";
button.style.left = "20px";
button.style.top = "20px";
button.style.borderRadius = "6px";
