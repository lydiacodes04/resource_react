import "./ItemCard.css";
import cardHeartDefault from "../../assets/heart-default.svg";
import cardHeartLiked from "../../assets/heart-liked.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // console.log(currentUser);
  // here current user is undefined
  // console.log(item);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
    //pass ({id, token})
  };

  // The likes array should be an array of ids
  // const likes = {};

  // console.log(currentUser);
  // here current user is undefined

  // const currentUser = { currentUser };
  //this causes errors

  const isLiked = item.likes
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  // const isLiked = item.likes
  // ? item.likes.some((id) => id === currentUser._id)
  // : false;

  // const cardHeartClassName = `card__heart ${
  //   isLiked ? "card__heart_liked" : "card__heart_default"
  // }`;

  const cardHeartClassName = `card__heart`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {/* item.name */}
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
        // item.imageUrl
        alt={item.name}
        // item.name
      />
    </li>
  );
}

export default ItemCard;
