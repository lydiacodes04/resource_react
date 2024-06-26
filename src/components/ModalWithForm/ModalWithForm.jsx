//ModalWithForm.jsx
import "./ModalWithForm.css";

function ModalWithForm({ children }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button type="button" className="modal__close">
          CLOSE
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

//ItemCard is a component that renders the image and title for an item of clothing.
// the image is an interactive elems a prop.
//You should include the following:
// The form’s title.
// The button that closes the modal.
// The <form> tag itself.
// The button that submits the modal.

//To correctly substitute name into the CSS class of the container, use the following syntax:
// className={`modal modal_type_${name}`}
//inputs and labels, use children prop
// another prop: onClose should be called when the user clicks on the close button,
// clicks outside of the modal content, or presses the Escape button on the keyboard.

export default ModalWithForm;
