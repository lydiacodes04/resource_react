import "./ItemCard.css";
import cardHeartDefault from "../../assets/heart-default.svg";
import cardHeartLiked from "../../assets/heart-liked.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (currentUser._id === item.owner) {
      onCardLike(item._id, isLiked);
    } else {
      console.log("Not your item");
    }
  };

  const isLiked = item.likes
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const cardHeartClassName = `card__heart`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className={cardHeartClassName}
        onClick={handleLike}
        src={isLiked ? cardHeartLiked : cardHeartDefault}
        alt="card like button"
      />
      <img
        className="card__image"
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
