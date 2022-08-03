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

      <section className="elements">

        {cards.map((card) => (

          < Card
            key={card._id}
            src={card.link}
            title={card.name}
            likes={card.likes}
            onCardClick={props.onCardClick}
            card={card}

          />
        ))}

      </section>

    </>
  );
}

export default Main;