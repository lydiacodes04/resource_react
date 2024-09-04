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
      <h2 className="card__name">{item}</h2>
      {/* item.name */}
      <img
        className="card__heart"
        onClick={handleLike}
        src={cardHeart}
        alt="card like button"
      />
      <img
        className="card__image"
        onClick={handleCardClick}
        src={item}
        // item.imageUrl
        alt={item}
        // item.name
      />
    </li>
  );
}

export default ItemCard;
