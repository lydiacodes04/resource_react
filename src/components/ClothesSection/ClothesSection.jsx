import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  // // Checking if the current user is the owner of the current clothing item
  // const isOwn = selectedCard.owner === currentUser._id;

  // // Creating a variable which you'll then set in `className` for the button
  // const modalClothesBtnClassName = `clothes-btn ${
  //   isOwn ? "clothes-btn_visible" : "clothes-btn_hidden"
  // }`;

  return (
    <div className="clothes-section">
      <div className="clothes-section__items">
        {/* <p>Your items</p>
        <button
          className="modalClothesBtnClassName"
          onClick={handleAddClick}
          type="button"
        >
          + Add new
        </button> */}
      </div>
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
