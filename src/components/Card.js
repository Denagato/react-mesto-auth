import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__delete ${isOwn ? 'element__delete_visible' : ''}`
  );

  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_liked' : ''}`
  );

  function handleCardClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return(
    <li className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"/>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="element__sign">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-field">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"/>
          <p className="element__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;