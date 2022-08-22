import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [about, setDescription] = React.useState('');
  const [isError, setError] = React.useState({ name: false, about: false });
  const [errorMessage, setErrorMessage] = React.useState({ name: '', about: '' });
  const [isFormValid, setFormInvalid] = React.useState(true);

  React.useEffect(() => {
    setFormInvalid(isError.name || isError.about);
  }, [isError.name, isError.about]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    onChange(e);
  }

  function handleAboutChange(e) {
    setDescription(e.target.value);
    onChange(e);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about });
  }

  function onChange(e) {
    setError((isError) => ({ ...isError, [e.target.name]: !e.target.validity.valid }));
    if (!e.target.validity.valid) {
      setErrorMessage({ ...errorMessage, [e.target.name]: e.target.validationMessage });
    } else {
      setErrorMessage({ ...errorMessage, [e.target.name]: '' });
    }
  }

  const SpanNameClassName = `name-input-error popup-form__input-error 
  ${isError.name ? 'popup-form__input-error_active' : ''}`;

  const SpanAboutClassName = `name-input-error popup-form__input-error 
  ${isError.about ? 'popup-form__input-error_active' : ''}`;

  const InputNameClassName = `popup-form__text popup-form__text_type_author-name ${isError.name ? 'popup-form__text_type_error' : ''}`;

  const InputAboutClassName = `popup-form__text popup-form__text_type_author-name ${isError.about ? 'popup-form__text_type_error' : ''}`;

  const SubmitBtnClassName = `popup-form__btn ${isFormValid ? 'popup-form__btn_inactive' : ''}`;

  return (

    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <fieldset className="popup-form__set">
        <label className="popup-form__field">
          <input value={name} onChange={handleNameChange} type="text" placeholder="Имя" name="name"
            className={InputNameClassName} id="name-input" required minLength="2"
            maxLength="40" />
          <span className={SpanNameClassName}>{errorMessage.name}</span>
        </label>
        <label className="popup-form__field">
          <input value={about} onChange={handleAboutChange} type="text" placeholder="О cебе" name="about"
            className={InputAboutClassName} id="description-input" required minLength="2"
            maxLength="200" />
          <span className={SpanAboutClassName}>{errorMessage.about}</span>
        </label>
      </fieldset>
      <button className={SubmitBtnClassName} type="submit" disabled={isFormValid}>Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
