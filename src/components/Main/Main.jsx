// Main.jsx
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        {/* TO DO: ADD THE CARDS */}
      </section>
    </main>
  );
}
// WeatherCard
//clothing items >> wrap ItemCard component into the unordered list
// and use the filter() and app() methods

export default Main;
