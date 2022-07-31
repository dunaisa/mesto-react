import React from 'react';

function Card(card) {
  return (
    <li className="element">
      <img src={`${card.src}`} alt={card.title} className="element__image" />
      <div className="element__info">
        <h2 className="element__info-heading">{card.title}</h2>
        <button className="element__like-btn" type="button" ariaria-label="Лайк"></button>
        <span className="element__like-counter">{card.likes}</span>
      </div>
      <button className="element__delete-btn" type="button" ariaria-label="Удалить"></button>
    </li>
  );
}

export default Card;