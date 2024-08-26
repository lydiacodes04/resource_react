import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

// function RegisterModal({ onClose, isOpen, handleSubmit }) {
//   if (!isOpen) {
//     return null;
//   }

const Register = () => {
  // The inputs are controlled via a single piece of state: an object
  // object called `data`. This lets us avoid writing separate change
  // handlers for each input.
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  // This function fires whenever an input is changed, and it updates
  // the value of the changed input. Note that the keys of this
  // object match the name attributes of the corresponding inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL{" "}
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar Url"
          name="avatarUrl"
          value={data.avatarUrl}
          onChange={handleChange}
        />
      </label>
      <label className="register__button-container">
        <button type="submit" className="register__link">
          Sign up
        </button>
      </label>
      <label className="register__signin">
        <Link to="login" className="register__login-link">
          or Log In
        </Link>
      </label>
    </ModalWithForm>
  );
};

// export default RegisterModal;

export default Register;
