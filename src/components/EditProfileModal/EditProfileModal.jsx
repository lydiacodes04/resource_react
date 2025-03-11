import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

import "./EditProfileModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, onSubmit }) {
  if (!isOpen) {
    return null;
  }

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || "");

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatarUrl });
  };

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
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
