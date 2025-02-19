import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { Link } from "react-router-dom";

function LoginModal({ onClose, isOpen, onSubmit }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
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
          value={email}
          onChange={handleEmailChange}
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
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <label className="register__button-container"></label>

      <label className="register__logIn" onClick={onClose}>
        or Sign Up
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
