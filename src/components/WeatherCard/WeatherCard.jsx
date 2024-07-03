// WeatherCard.jsx
import "./WeatherCard.css";
import rectangle from "../../assets/rectangle.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp"> {weatherData.temp.F} &deg; F</p>
      <img src={rectangle} alt="" className="weather-card__image" />
    </section>
  );
}

//The WeatherCard receives data from its parent (props chain example: App → Main → WeatherCard).
//We only need the temperature to render in the card
//Fahrenheit

export default WeatherCard;
