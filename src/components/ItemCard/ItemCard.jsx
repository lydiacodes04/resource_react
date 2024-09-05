import "./ItemCard.css";
import cardHeart from "../../assets/heart-default.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
  };

  // The likes array should be an array of ids
  const likes = {};
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const cardHeartClassName = `card__heart ${
    isLiked ? "card__heart_visible" : "card__heart_hidden"
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      {/* item.name */}
      <img
        className={cardHeartClassName}
        onClick={handleLike}
        src={cardHeart}
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
