import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
      <input id="edit" name="edit" ref={inputRef} type="url" className="popup__input" required placeholder="Ссылка на картинку" />
      <span id="edit-error" className="error" />
      <button type="submit" className="popup__button">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;