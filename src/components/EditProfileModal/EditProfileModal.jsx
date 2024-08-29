import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";

function EditProfileModal({ onClose, isOpen, handleSubmit, handleChange }) {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save changes"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name *
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
        Avatar *
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
    </ModalWithForm>
  );
}

export default LoginModal;
