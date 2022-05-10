import React from 'react';
import Card from './Card';
import {UserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  const userData = React.useContext(UserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}></div>
        {userData.avatar && (<img className="profile__avatar" src={userData.avatar} alt="Аватар пользователя" /> )}
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__info-title">{userData.name}</h1>
            <button type="button" className="profile__info-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__info-subtitle">{userData.about}</p>
        </div>
        <button type="button" className="profile__addbutton" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="list">
          {props.cards.map((c) => <Card onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} key={c._id} card={c} />)}
        </ul>
      </section>
    </main>
  )
}

export default Main;