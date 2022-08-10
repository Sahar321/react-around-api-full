import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({
  name,
  title,
  submitTitle,
  onClose,
  isOpen,
  onUpdateUser,
}) {
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      about: description,
    });
  };
  
  useEffect(() => {
    setUserName(currentUser?.name || '');
    setDescription(currentUser?.about || '');
  }, [currentUser]);

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
        minLength="2"
        maxLength="40"
        required
        id="profileName"
        name="profileName"
        onChange={handleUserNameChange}
      value={userName}
      />
      <span id="profileName-error"></span>
      <input
        className="textbox popup__input"
        type="text"
        minLength="2"
        maxLength="200"
        required
        id="profileTitle"
        name="profileTitle"
        onChange={handleDescriptionChange}
        value={description}
      />
      <span id="profileTitle-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
