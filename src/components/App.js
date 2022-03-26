import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  let [selectedCard, setSelectedCard] = React.useState({isOpen:false});

  function handleEditAvatarClick() {
    isEditAvatarPopupOpen = setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    isEditProfilePopupOpen = setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    isAddPlacePopupOpen = setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    isEditAvatarPopupOpen = setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen = setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen = setIsAddPlacePopupOpen(false);
    selectedCard = setSelectedCard({isOpen:false});
  }
  function handleCardClick(card) {
    selectedCard = setSelectedCard(card);
  }

  return (
    <div className="page">
      <Header />
      <Main onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
      <Footer />
      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="name" name="name" type="text" className="popup__input" required minLength="2" maxLength="40" placeholder="имя" />
        <span id="name-error" className="error"></span>
        <input id="profession" name="profession" type="text" className="popup__input" required minLength="2" maxLength="200" placeholder="профессия" />
        <span id="profession-error" className="error"></span>
        <button type="submit" className="popup__button">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input id="edit" name="edit" type="url" className="popup__input" required placeholder="Ссылка на картинку" />
        <span id="edit-error" className="error"></span>
        <button type="submit" className="popup__button">Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?">
        <button type="submit" className="popup__button popup__button_delete">Да</button>
      </PopupWithForm>
      <PopupWithForm name="gallery" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="title" name="title" type="text" className="popup__input" required minLength="2" maxLength="30" placeholder="Название" />
        <span id="title-error" className="error"></span>
        <input id="link" name="link" type="url" className="popup__input" required placeholder="Ссылка на картинку" />
        <span id="link-error" className="error"></span>
        <button type="submit" className="popup__button popup__button_add-card">Создать</button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </div>
  );
}

export default App;
