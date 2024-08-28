import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ onClose, isOpen, handleSubmit, handleChange }) {
  if (!isOpen) {
    return null;
  }

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
        <button
          type="submit"
          className="register__link"
          onSubmit={handleSubmit}
        >
          Sign up
        </button>
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
