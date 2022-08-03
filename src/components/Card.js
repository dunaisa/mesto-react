import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="element">
      <img src={`${props.src}`} alt={props.title} className="element__image" onClick={handleClick} />
      <div className="element__info">
        <h2 className="element__info-heading">{props.title}</h2>
        <button className="element__like-btn" type="button" ariaria-label="Лайк"></button>
        <span className="element__like-counter">{props.likes.length}</span>
      </div>
      <button className="element__delete-btn" type="button" ariaria-label="Удалить"></button>
    </li>
  );
}

export default Card;