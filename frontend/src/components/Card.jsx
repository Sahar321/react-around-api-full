import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Image from './Image';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const { name, likes, link, owner } = card;
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const isOwn =
    owner === currentUser?._id
      ? 'card__delete-card_visibility_isVisible'
      : '';

  const isLiked = likes.some((user) => user === currentUser._id);
  const isLikedClassName = isLiked ? 'btn-like_state_active' : '';

  return (
    <article className="card">
      <div className="card__upper">
        <button
          aria-label="Delete Card"
          className={`btn-delete card__delete-card ${isOwn}`}
          type="button"
          onClick={handleDeleteClick}
        />

        <Image
          src={link}
          onClick={handleClick}
          className="card__img"
          alt="Card"
        />
      </div>
      <div className="card__bottom">
        <h3 className="card__name">{name}</h3>
        <div className="card__like">
          <button
            aria-label="like button"
            onClick={handleLikeClick}
            className={`btn-like card__like-button ${isLikedClassName}`}
            type="button"
          />
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
