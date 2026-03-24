import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeIcon from "../../assets/Group 119.png";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("Card data in ItemModal:", card);
  console.log("Image URL being used:", card.imageUrl);
  const isOwn = card?.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div
        className="modal__content_type_image"
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
          <div className="modal__caption-row">
            <h2 className="modal__caption">{card?.name}</h2>
            {isOwn && (
              <button
                onClick={() => onDeleteItem(card)}
                className="modal__delete-btn"
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
