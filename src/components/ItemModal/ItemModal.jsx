// ItemModal.jsx
import "./ItemModal.css";

function ItemModal({ activeModal, card }) {
  return (
    <div className="modal">
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        >
          CLOSE
        </button>
      </div>
    </div>
  );
}

//ItemModal renders the item image and title. The component accepts the following props:
// onClose (works the same way as the ModalWithForm)
//The item card data that you need to render

export default ItemModal;
