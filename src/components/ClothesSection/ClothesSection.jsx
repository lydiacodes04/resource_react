import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function ClothesSection({ onCardClick, clothingItems, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__items"></div>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser._id;
          })
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
