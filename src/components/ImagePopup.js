import React from 'react';

function ImagePopup() {
  return (
    <div className="popup popup-open-pic popup_overlay-open-pic">
      <div className="popup__container-figure">
        <figure className="popup__figure">
          <img src="#" alt="#" className="popup__image-figure" />
          <figcaption className="popup__image-figcaption"></figcaption>
        </figure>
        <button className="popup__close-btn popup__close-btn_type_open-pic" type="button" aria-label="Закрыть"></button>
      </div>
    </div>
  );
}

export default ImagePopup;