import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ onClose, isOpen, handleSubmit }) {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign In"
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
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
