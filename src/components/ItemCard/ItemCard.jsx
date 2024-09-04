import "./ItemCard.css";
import cardHeart from "../../assets/heart-default.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__heart"
        onClick={handleLike}
        src={cardHeart}
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
