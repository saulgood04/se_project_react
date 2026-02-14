import ItemCard from "../ItemCard/ItemCard";
import "./WeatherCard.css";
import sunny from "../../assets/sunny.png";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData, onCardLike, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type,
  );
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} ° {currentTemperatureUnit}
      </p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
      <div className="weather-card__items">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardLike={onCardLike} />
        ))}
      </div>
    </section>
  );
}

export default WeatherCard;
