import React, { useState } from "react";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");

  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let apiKey = "0eb6de8e155714745cc3ba77875938d2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  function displayTemperature(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(Math.round(response.data.main.humidity));
    setWind(Math.round(response.data.wind.speed));
    setIcon(response.data.weather[0].icon);
    setCity(response.data.name);
  }
  function HandleSearch(event) {
    event.preventDefault();
    axios.get(url).then(displayTemperature);
  }
  function UpdateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }
  let form = (
    <div className="WatherSearch">
      <form onSubmit={HandleSearch}>
        <input type="text" placeholder="Type a city" onChange={UpdateCity} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
  if (!temperature) {
    return <div>{form}</div>;
  } else {
    return (
      <div className="WatherSearch">
        {form}
        <ul>
          <li>{city}</li>
          <li>Temperature: {temperature}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind}km/h</li>
          <li>
            <img src={iconUrl} alt={description} />
          </li>
        </ul>
      </div>
    );
  }
}
