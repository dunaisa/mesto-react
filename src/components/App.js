import React, { useState } from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';

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

  const [isPopupClose, setPopupClose] = useState(true);

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(setPopupClose(!isPopupClose));
    setEditProfilePopupOpen(setPopupClose(!isPopupClose));
    setAddPlacePopupOpen(setPopupClose(!isPopupClose))
  }

  return (
    <>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
      />
      <Footer />

      <PopupWithForm name="change-photo" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} overlayClose={setEditAvatarPopupOpen} onClose={closeAllPopups} >

        <fieldset className="popup-form__set">
          <label className="popup-form__field">
            <input type="url" placeholder="Ссылка на картинку" name="link-input"
              className="popup-form__text popup-form__text_type_place-reference" id="avatar-input" required />
            <span className="avatar-input-error popup-form__input-error"></span>
          </label>
          <button className="popup-form__btn" type="submit">Сохранить</button>
        </fieldset>

      </PopupWithForm>

      <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} overlayClose={setEditProfilePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup-form__set">
          <label className="popup-form__field">
            <input type="text" placeholder="Имя" name="name-input"
              className="popup-form__text popup-form__text_type_author-name" id="name-input" required minLength="2"
              maxLength="40" />
            <span className="name-input-error popup-form__input-error"></span>
          </label>
          <label className="popup-form__field">
            <input type="text" placeholder="О cебе" name="about-input"
              className="popup-form__text popup-form__text_type_description" id="description-input" required minLength="2"
              maxLength="200" />
            <span className="description-input-error popup-form__input-error"></span>
          </label>
          <button className="popup-form__btn" type="submit">Сохранить</button>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm name="add-place" title="Новое место" isOpen={isAddPlacePopupOpen} overlayClose={setAddPlacePopupOpen} onClose={closeAllPopups}>
        <fieldset className="popup-form__set">
          <label className="popup-form__field">
            <input type="text" placeholder="Название" name="name-input"
              className="popup-form__text popup-form__text_type_place-name" id="place-input" required minLength="2"
              maxLength="30" />
            <span className="place-input-error popup-form__input-error"></span>
          </label>
          <label className="popup-form__field">
            <input type="url" placeholder="Ссылка на картинку" name="link-input"
              className="popup-form__text popup-form__text_type_place-reference" id="reference-input" required />
            <span className="reference-input-error popup-form__input-error"></span>
          </label>
          <button className="popup-form__btn" type="submit">Создать</button>
        </fieldset>
      </PopupWithForm>

    </>
  );
}

export default App;
