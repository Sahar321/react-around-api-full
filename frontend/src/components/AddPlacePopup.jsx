import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup({
  name,
  title,
  submitTitle,
  onClose,
  isOpen,
  onAddPlace,
}) {
  const nameRef = useRef(null);
  const linkRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      nameRef.current.value = '';
      linkRef.current.value = '';
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      name={name}
      title={title}
      submitTitle={submitTitle}
      onClose={onClose}
      isOpen={isOpen}
      handleSubmit={handleSubmit}
    >
      <input
        className="textbox popup__input"
        type="text"
        required
        minLength="2"
        maxLength="30"
        name="name"
        id="cardTitle"
        placeholder="Title"
        ref={nameRef}
      />
      <span id="cardTitle-error"></span>
      <input
        className="textbox popup__input"
        required
        type="url"
        name="link"
        id="cardURL"
        placeholder="Image URL"
        ref={linkRef}
      />
      <span id="cardURL-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
