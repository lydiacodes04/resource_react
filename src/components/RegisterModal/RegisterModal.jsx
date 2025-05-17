import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ onClose, isOpen, onSubmit, handleShowLogin }) {
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

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  function handleSubmitRegistration(e) {
    e.preventDefault();
    onSubmit({ email, password, name, avatar });
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
          type="password"
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
      <label htmlFor="avatar" className="modal__label">
        Avatar URL *
        <input
          type="link"
          className="modal__input"
          id="avatar"
          placeholder="Avatar Url"
          name="avatar"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>

      <button
        className="register__logIn"
        type="button"
        onClick={handleShowLogin}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
