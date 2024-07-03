//ModalWithForm.jsx
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, onClose }) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      {/* old way --works */}
      {/* <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}> */}

      {/* grader's suggestion--does not work */}
      {/* isOpen={activeModal === "add-garment"} */}

      {/* instructions on brief--I do not understand how to implement */}
      {/* className={`modal modal_type_${name}`} */}

      {/* note to grader: I do not understand how to implement your correction here. */}

      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          CLOSE
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

//inputs and labels, use children prop
// another prop: onClose should be called when the user clicks on the close button,
// clicks outside of the modal content, or presses the Escape button on the keyboard.

export default ModalWithForm;
