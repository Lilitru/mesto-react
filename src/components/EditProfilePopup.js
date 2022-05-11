import React from 'react';
import PopupWithForm from './PopupWithForm';
import { UserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(UserContext);
  const [name, setNameValue] = React.useState('');
  const [description, setDescriptionValue] = React.useState('');
  // Обработчик изменения инпута обновляет стейт

  React.useEffect(() => {
    setNameValue(currentUser.name);
    setDescriptionValue(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setNameValue(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescriptionValue(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
      <input id="name" name="name" type="text" value={name || ''} onChange={handleChangeName} className="popup__input" required minLength="2" maxLength="40" placeholder="имя" />
      <span id="name-error" className="error" />
      <input id="profession" name="profession" type="text" value={description || ''} onChange={handleChangeDescription} className="popup__input" required minLength="2" maxLength="200" placeholder="профессия" />
      <span id="profession-error" className="error" />
      <button type="submit" className="popup__button">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup;