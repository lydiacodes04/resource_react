import "./WeatherCard.css";
import rectangle from "../../assets/rectangle.png";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {weatherData.temp.F} &deg; {currentTemperatureUnit}{" "}
      </p>
      <img
        src={rectangle}
        alt="weather background image"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
