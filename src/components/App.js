import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from './ProtectedRoute';
import api from "../utils/api";
import { register, authorize, getContent } from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false, link: "", name: ""});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    document.addEventListener('keydown', handleEscClose);
  }

  function handleCardClick(card) {
    const {link, name} = card;
    setSelectedCard({isOpen: true, link: link, name: name});
    document.addEventListener('keydown', handleEscClose);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setSelectedDeleteCard(card);
    document.addEventListener('keydown', handleEscClose);
  }

  function onInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
}

const [isRequestSuccessful, setRequestSuccessful] = useState(false);

  function closeInfoTooltip() {
    setIsInfoTooltipOpen(false);
      if (isRequestSuccessful) {
        history.push('/sing-in');
      }
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard({isOpen: false, link: "", name: ""});
    document.removeEventListener('keydown', handleEscClose);
  }

  function handleClickOverlay(event) {
    if (event.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function handleEscClose(event) {
    if (event.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then(() => {
        setCurrentUser({...currentUser, ...data});
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data)
      .then(() => {
        setCurrentUser({...currentUser, ...data});
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`)
      );
  }

  function handleCardDelete() {
    api.deleteCard(selectedDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== selectedDeleteCard._id);
        setCards(newCards);
        setSelectedDeleteCard({});
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`)
      );
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`)
      );
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {
      if (loggedIn) {
          history.push('/');
      }
  }, [history, loggedIn])

  const handleRegister = (data) => {
    const { email, password } = data;
    return register(email, password)
        .then((res) => {
          if (!res || res.statusCode === 400) {
            throw new Error('Что-то не так с регистрацией');
          }
          if (res.data) {
            setRequestSuccessful(true);
          }
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }

  const handleLogin = (data) => {
    const { email, password } = data;
    return authorize(email, password)
        .then((res) => {
            if (!res || res.statusCode === 401) {
                setIsInfoTooltipOpen(true)
                throw new Error('Пользователь не зарегесрирован');
            }
            if (!res || res.statusCode === 400) {
                throw new Error('Что-то не так с регистрацией');
                setIsInfoTooltipOpen(true)
                throw new Error('Не передано одно из полей ');
            }
            if (res.token) {
                setLoggedIn(true);
                setRequestSuccessful(true);
                history.push('/')
                localStorage.setItem('jwt', res.token);
                getContent(res.token)
                    .then((res) => {
                        if (res){
                        setLoginData(res.data);
                        }
                    });
            }
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`))
}


  const [loginData, setLoginData] = useState({
    _id: '',
    email: ''
  })

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
      .then((res) => {
        if (res){
          setLoggedIn(true);
          setLoginData(res.data);
        }
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setRequestSuccessful(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

      <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onEditProfile={handleEditProfileClick} 
              onAddPlace={handleAddPlaceClick} 
              onEditAvatar={handleEditAvatarClick} 
              onCardClick={handleCardClick}
              cards={cards} 
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              signOut={handleSignOut}
              loginData={loginData.email} />
            <Route path="/sign-up">
              <Register onRegister={handleRegister} onInfoTooltip={onInfoTooltip}/>
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} onInfoTooltip={onInfoTooltip}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route> 
        </Switch>

        <Footer />

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          onClickOverlay={handleClickOverlay}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onClickOverlay={handleClickOverlay}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onClickOverlay={handleClickOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onClickOverlay={handleClickOverlay}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onClickOverlay={handleClickOverlay}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
          isRequestSuccessful={isRequestSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
