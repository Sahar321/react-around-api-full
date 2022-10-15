import React, { useContext } from 'react';
import Card from './Card';
import { Header } from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Loading from './Loading';
import Image from './Image';
import { useState } from 'react';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
export function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const {
    onHandleEditAvatarClick,
    onHandleEditProfileClick,
    onHandleAddPlaceClick,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
    onLogOut,
    loggedIn,
  } = props;

  return (
    <>
      {!currentUser && <Loading isOpen={true} />}
      <Header loggedIn={loggedIn} onLogOut={onLogOut} />

      <main>
        <section className="profile">
          <div className="profile__avatar-container">
            <Image
              src={currentUser?.avatar}
              alt="Profile Avatar"
              className="profile__avatar"
            />
            <button
              onClick={onHandleEditAvatarClick}
              id="profileAvatarEdit"
              alt="Change Profile Avatar"
              className="btn-edit profile__avatar-edit"
            />
          </div>

          <div className="profile__info">
            <div className="flex-wrapper">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button
                onClick={onHandleEditProfileClick}
                aria-label="Edit profile info"
                className="btn-edit profile__edit-info"
                type="button"
              />
            </div>
            <p className="profile__title">{currentUser?.about}</p>
            <button
              onClick={onHandleAddPlaceClick}
              aria-label="Add an item"
              className="profile__add btn-add"
              type="button"
            />
          </div>
        </section>
        {loggedIn && currentUser && (
          <section className="cards">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
