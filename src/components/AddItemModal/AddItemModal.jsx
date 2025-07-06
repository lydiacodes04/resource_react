import React, { useState } from "react";
import "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [category, setCategory] = useState("");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, category });
  }

  return (
    <ModalWithForm
      title="New resource"
      buttonText="Add resource"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name of Resource
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
      <label htmlFor="imageUrl" className="modal__label">
        Resource website link{" "}
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Resource website link"
          name="imageUrl"
          value={imageUrl}
          onChange={handleImageUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the resource type: </legend>
        <label
          htmlFor="basic needs"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="basic needs"
            type="radio"
            className="modal__radio-input"
            name="input"
            value="basic needs"
            onChange={handleCategoryChange}
          />{" "}
          Basic needs
        </label>
        <label htmlFor="jobs" className="modal__label modal__label_type_radio">
          <input
            id="jobs"
            type="radio"
            className="modal__radio-input"
            name="input"
            value="jobs"
            onChange={handleCategoryChange}
          />{" "}
          Jobs
        </label>
        <label
          htmlFor="education"
          className="modal__label modal__label_type_radio"
        >
          <input
            id="education"
            type="radio"
            className="modal__radio-input"
            name="input"
            value="education"
            onChange={handleCategoryChange}
          />{" "}
          Education
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
