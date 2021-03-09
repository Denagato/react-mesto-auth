import React from "react";
import Card from "./Card";
import Header from '../components/Header.js';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, loginData, loggedIn, signOut}) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <>
      <Header loggedIn={loggedIn} login={loginData} link="/sign-in" onClick={signOut} loginText={'Выйти'}/>
      <main>
        <section className="profile">
          <div className="profile__avatar-field">
            <img className="profile__avatar" src={currentUser.avatar} alt="Фото"/>
            <button className="profile__avatar-button" type="button" onClick={onEditAvatar}/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__info-button" type="button" onClick={onEditProfile}/>
            <p className="profile__about">{currentUser.about}</p>
          </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          <ul className="elements__table">
            {cards.map((card) => (
              <Card 
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                key={card._id}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;