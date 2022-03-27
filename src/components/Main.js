import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  let [userName, setUserName] = React.useState('');
  let [userDescription, setUserDescription] = React.useState('');
  let [userAvatar, setUserAvatar] = React.useState('');
  let [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cards);
      })
      .catch(err => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
        {userAvatar && (<img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" /> )}
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__info-title">{userName}</h1>
            <button type="button" className="profile__info-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__info-subtitle">{userDescription}</p>
        </div>
        <button type="button" className="profile__addbutton" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="list">
          {cards.map((c) => <Card onCardClick={props.onCardClick} key={c._id} card={c} />)}
        </ul>
      </section>
    </main>
  )
}

export default Main;