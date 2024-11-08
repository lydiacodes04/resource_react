import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { Link } from "react-router-dom";

function RegisterModal({ onClose, isOpen, onSubmit }) {
  if (!isOpen) {
    return null;
  }

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  function handleSubmitRegistration(e) {
    e.preventDefault();
    onSubmit({ email, password, name, avatarUrl });
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmitRegistration}
    >
      <label htmlFor="email" className="modal__label">
        Email *
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password *
        <input
          type="text"
          className="modal__input"
          id="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>

      <label htmlFor="name" className="modal__label">
        Name *
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar URL *
        <input
          type="link"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar Url"
          name="avatarUrl"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </label>
      <label className="register__button-container">
        {/* <button
          type="submit"
          className="register__link"
          onSubmit={handleSubmit}
        >
          Sign up
        </button> */}
        <Link to="register" className="register__login-link">
          Sign up
        </Link>
      </label>
      <label className="register__signIn">
        <Link to="login" className="register__login-link">
          or Log In
        </Link>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
