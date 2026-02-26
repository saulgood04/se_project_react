import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeIcon from "../../assets/Group 119.png";
import likeButton from "../../assets/likeButton.png";

function ItemModal({ isOpen, onClose, card, onDeleteItem, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("Card data in ItemModal:", card);
  console.log("Image URL being used:", card.imageUrl);
  const isOwn = card?.owner === currentUser?._id;

  const handleLike = (event) => {
    console.log("Like button clicked!");
    event.stopPropagation();
    console.log("ItemModal handleLike clicked!");
    console.log("Current user:", currentUser);
    console.log("Card being liked:", card);

    const isLiked =
      card.likes && card.likes.some((id) => id === currentUser?._id);
    onCardLike({ id: card._id, isLiked: isLiked });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <img
          src={card?.imageUrl || card?.link}
          alt={card?.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <div className="modal__caption-container">
            <h2 className="modal__caption">{card?.name}</h2>
            {currentUser && (
              <button
                onClick={handleLike}
                className={`modal__like-button ${card.likes && card.likes.some((id) => id === currentUser?._id) ? "modal__like-button_active" : ""}`}
              >
                <img src={likeButton} alt="Like" />
              </button>
            )}
            <p className="modal__weather">Weather: {card?.weather}</p>
          </div>
          {isOwn && (
            <button
              onClick={() => onDeleteItem(card?._id)}
              className="modal__delete-button"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
