import React from 'react';

function PopupWithForm(props) {

  const className = `popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`;

  return (
    <div
      className={className}
      onClick={() => props.overlayClose(false)}
    >
      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <h3 className="popup__container-heading">{`${props.title}`}</h3>
        <form action="submit" name={`${props.name}-form`} method="post" className="popup-form popup-form_avatar" noValidate>
          {props.children}
        </form>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={() => { props.onClose() }}
        ></button>
      </div>
    </div >
  );
}

export default PopupWithForm;