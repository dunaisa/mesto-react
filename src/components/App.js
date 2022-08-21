import React, { useState, useEffect } from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/API.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  const [isCardSelected, setCardSelected] = useState({ isOpen: false, card: {} });

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardSelected({ isOpen: false, card: {} });
  }

  const handleCardClick = (card) => {
    setCardSelected({ isOpen: true, card: card });
  }

  const [isCurrentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInfo()
      .then((res) => {
        setCurrentUser(res);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
  }, [])

  function handleCardLike(id, isLiked) {
    api.toggleLike(id, isLiked)
      .then((res) => {
        setCards(cards.map((card) => (card._id === res._id ? res : card)))
      })
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => (card._id !== id)))
      })
  }

  function handleUpdateUser(data) {
    api.setInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(data) {
    api.setInitialCards(data.name, data.link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`${err}`))
  }

  return (
    <>
      <CurrentUserContext.Provider value={isCurrentUser}>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="confirm-delete" title="Вы уверены?" btnText="Да">
          <fieldset className="popup-form__set">
            <button className="popup-form__btn" type="submit"></button>
          </fieldset>
        </PopupWithForm>

        <ImagePopup name="open-pic" isOpen={isCardSelected.isOpen} card={isCardSelected} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
