import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup({
  name,
  title,
  submitTitle,
  onClose,
  isOpen,
  onUpdateAvatar,
}) {
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
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
        required
        type="url"
        name="avatar"
        id="avatarImage"
        placeholder="Image URL"
        ref={avatarRef}
      />
      <span id="avatarImage-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
