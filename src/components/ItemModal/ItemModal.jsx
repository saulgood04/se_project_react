import "./ItemModal.css";
import closeIcon from "../../assets/Group 119.png";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__caption-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={() => onDeleteItem(card._id)}
            className="modal__delete-button"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
