import "./ItemModal.css";
import close from "../../assets/close_icon-white.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, onClose, card, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner ? card.owner === currentUser._id : false;

  // Creating a variable which you'll then set in `className` for the delete button
  const modalDeleteBtnClassName = `modal__delete-btn ${
    isOwn && activeModal === "preview"
      ? "modal__delete-btn_visible"
      : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close button" className="modal__close-btn" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption"> {card.name} </h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className={modalDeleteBtnClassName}
            type="button"
            onClick={() => handleDeleteItem(card) && onClose()}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
