import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="clothes-section-items">
        <p>Your items</p>
        <button className="clothes-btn">+ Add new</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            //TO DO: pass onCardClick
            //   onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
