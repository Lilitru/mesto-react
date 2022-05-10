import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { UserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  let [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  let [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  let [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  let [selectedCard, setSelectedCard] = React.useState({ isOpen: false });

  let [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

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
    selectedCard = setSelectedCard({ isOpen: false });
  }
  function handleCardClick(card) {
    selectedCard = setSelectedCard(card);
  }
  function handleUpdateUser(user) {
    api.setUserInfo(user.name, user.about).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar.avatar).then((userData) => {
      setCurrentUser(userData);
      closeAllPopups();
    })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  let [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });;
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then((result) => {
      console.log(result);
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard.name, newCard.link).then((addedCard) => {
      setCards([addedCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
        <PopupWithForm name="delete-card" title="Вы уверены?">
          <button type="submit" className="popup__button popup__button_delete">Да</button>
        </PopupWithForm>
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </UserContext.Provider>
  );
}

export default App;
