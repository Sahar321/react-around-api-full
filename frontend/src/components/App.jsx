import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter,
  useHistory,
  Link,
} from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// main components

import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Register } from './Register';
import ProtectedRoute from './ProtectedRoute';
//model window
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import InfoToolTip from './InfoToolTip';
import Loading from './Loading';
//server
import api from '../utils/api.js';
import auth from '../utils/auth.js';
import Login from './Login';
import { loginState } from '../constant/enums/loginState';
function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(loginState.PENDING);
  //const [isAppInit, setIsAppInit] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState('');
  const [infoToolTipMessage, setInfoToolTipMessage] = useState(null);
  const token = localStorage.getItem('jwt');
  // #region app handlers
  const handleError = (error) => {
    const errorText = error.message || error.error || 'something want wrong..';
    setInfoToolTipMessage({ type: 'failed', text: errorText });
    setIsInfoToolTipPopupOpen(true);
  };
  // #endregion app handlers

  // #region Effects

  useEffect(() => {
    console.log('tokenChange', token)
    const handleTokenCheck = () => {
      if (token) {
        auth
          .checkToken()
          .then((res) => {
            const { email } = res;
            api
              .getUserInfo()
              .then((user) => {
                setCurrentUser(user);
              })
              .catch(handleError);
            setLoggedIn(loginState.LOGGED_IN);
                history.push('/profile');
          })
          .catch(handleError);
      }
    };
    handleTokenCheck();
  }, [token]);

  // cards
  useEffect(() => {
    if (loggedIn !== loginState.LOGGED_IN) {
      return;
    }

    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(handleError);
  }, [currentUser]);
  //#endregion

  // #region User info Handlers
  const handleUpdateUser = (newUserInfo) => {
    api
      .setProfileInfo(newUserInfo)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleError);
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard(null);
  };
  //#endregion

  //#region  Cards Handlers

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(handleError);
  }

  const handleCardDelete = (removedCard) => {
    api
      .deleteCard(removedCard._id)
      .then(() => {
        const newArr = cards.filter((card) => removedCard._id !== card._id);
        setCards(newArr);
      })
      .catch(handleError);
  };

  const handleCardClick = (props) => {
    setSelectedCard(props);
  };

  const handleAddPlace = (card) => {
    api
      .createNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError);
  };
  //#endregion

  //#region Auth Handlers
  const handleLogin = (userData) => {
    auth
      .signin(userData)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(loginState.LOGGED_IN);
      })
      .catch((er) => console.log('catchhandleLogin', er));
  };

  const handleRegister = (userData) => {
    auth
      .signup(userData)
      .then((res) => {
        setInfoToolTipMessage({
          type: 'ok',
          text: 'Success! You have now been registered.',
        });
        setIsInfoToolTipPopupOpen(true);
        history.push('/signin');
      })
      .catch(handleError);
  };

  const handleLogOut = () => {
    setCards([]);
    setLoggedIn(loginState.LOGGED_OUT);
    setCurrentUser(null);
    localStorage.removeItem('jwt');
  };
  //#endregion

  // move to router 6 : https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Switch>
            <ProtectedRoute
              path="/profile"
              loggedIn={loggedIn}
              onCardClick={handleCardClick}
              onHandleAddPlaceClick={handleAddPlaceClick}
              onHandleEditProfileClick={handleEditProfileClick}
              onHandleEditAvatarClick={handleEditAvatarClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              onLogOut={handleLogOut}
              component={Main}
            />

            <Route path="/signin">
              <Header />
              <Login onLogin={handleLogin} />
              <Footer />
            </Route>
            <Route path="/signup">
              <Header />

              <Register onRegister={handleRegister} />
              <Footer />
            </Route>
            <Route exact path="/">
              {loggedIn === loginState.LOGGED_IN ? (
                <Redirect to="/profile" />
              ) : (
                <Redirect to="/signin" />
              )}
            </Route>
            <Route exact path="*">
              <span style={{ color: 'white', fontSize: '50px' }}>
                Page Not Found 404
              </span>
            </Route>
          </Switch>

          <EditAvatarPopup
            name="formProfileAvatar"
            title="Change profile picture"
            submitTitle="Save"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            name="formProfile"
            title="Edit Profile"
            submitTitle="Save"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            name="formCard"
            title="New place"
            submitTitle="Create"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <InfoToolTip
            isOpen={isInfoToolTipPopupOpen}
            message={infoToolTipMessage}
            onClose={closeAllPopups}
          />
          <ImagePopup selectedElement={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default withRouter(App);
