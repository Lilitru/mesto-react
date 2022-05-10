import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const inputRefTitle = React.useRef();
    const inputRefLink = React.useRef();

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name: inputRefTitle.current.value,
            link: inputRefLink.current.value
        });
    }

    return (
        <PopupWithForm name="gallery" title="Новое место" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
            <input id="title" name="title" ref={inputRefTitle} type="text" className="popup__input" required minLength="2" maxLength="30" placeholder="Название" />
            <span id="title-error" className="error" />
            <input id="link" name="link" ref={inputRefLink} type="url" className="popup__input" required placeholder="Ссылка на картинку" />
            <span id="link-error" className="error" />
            <button type="submit" className="popup__button popup__button_add-card">Создать</button>
        </PopupWithForm>
    )
}

export default AddPlacePopup;