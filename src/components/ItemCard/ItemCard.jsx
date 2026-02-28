import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import likeButton from "../../assets/likeButton.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (event) => {
    console.log("ItemCard like button clicked!"); // ADD THIS
    console.log("Item data:", item); // ADD THIS
    console.log("Current user:", currentUser); // ADD THIS
    event.stopPropagation();
    const isLiked =
      item.likes && item.likes.some((id) => id === currentUser?._id);
    console.log("Is liked:", isLiked); // ADD THIS
    onCardLike({ id: item._id, isLiked: !isLiked });
  };

  const isLiked =
    item.likes && item.likes.some((id) => id === currentUser?._id);
  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={`card__like-button ${isLiked ? "card__like-button_active" : ""}`}
            onClick={handleLike}
          >
            <img src={likeButton} alt="Like" className="card__like-icon" />
          </button>
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
