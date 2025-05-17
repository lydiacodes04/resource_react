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

  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    if (!avatar.trim()) {
      alert("Avatar URL is required");
      return;
    }
    onSubmit({ name, avatar });
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
      <label htmlFor="avatar" className="modal__label">
        Avatar *
        <input
          type="url"
          className="modal__input"
          id="avatar"
          placeholder="Avatar URL"
          name="avatar"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
