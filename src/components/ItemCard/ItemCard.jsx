import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (event) => {
    event.stopPropagation();
    const isLiked =
      item.likes && item.likes.some((id) => id === currentUser?._id);
    onCardLike({ id: item._id, isLiked: isLiked });
  };

  const isLiked =
    item.likes && item.likes.some((id) => id === currentUser?._id);
  return (
    <li className="card" onClick={handleCardClick}>
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
      {currentUser && (
        <button
          className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
          onClick={handleLike}
        >
          ♥
        </button>
      )}
    </li>
  );
}
export default ItemCard;
