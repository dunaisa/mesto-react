import React, { useState, useEffect } from 'react';

import { api } from '../utils/API.js';
import Card from './Card.js'

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInfo()
      .then(({ name, about, avatar }) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
  }, [])


  return (
    <>
      <main className="content">
        <section className="profile">
          <button onClick={() => { props.onEditAvatar() }} className="profile__avatar-btn">
            <img src={userAvatar} alt="Аватар профиля" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
            <button onClick={() => { props.onEditProfile() }} className="profile__edit-btn" type="button" ariaria-label="Редактировать"></button>
          </div>
          <button onClick={() => { props.onAddPlace() }} className="profile__add-btn" type="button" ariaria-label="Добавить"></button>
        </section>

        <section className="elements"></section>
      </main>

      {/* <ImagePopup/> */}

      <div className="popup popup-confirm-delete">
        <div className="popup__container">
          <h3 className="popup__container-heading">Вы уверены?</h3>
          <form action="submit" name="Confirm-edit-form" method="post" className="popup-form popup-form_confirm" noValidate>
            <fieldset className="popup-form__set">
              <button className="popup-form__btn" type="submit">Да</button>
            </fieldset>
          </form>
          <button className="popup__close-btn" type="button" ariaria-label="Закрыть"></button>
        </div>
      </div>

      <section className="elements">

        {cards.map((card) => (
          < Card
            key={card._id}
            src={card.link}
            title={card.name}
            likes={`${card.likes}`}
          />
        ))}

      </section>

    </>
  );
}

export default Main;