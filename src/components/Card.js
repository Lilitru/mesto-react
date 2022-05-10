import React from 'react';
import {UserContext} from '../contexts/CurrentUserContext';

function Card(props) {

  const userData = React.useContext(UserContext);

// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = props.card.owner._id === userData._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `cards__remove${isOwn ?  '' : ' cards__remove_hidden'}`
);

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.card.likes.some(i => i._id === userData._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `cards__like${isLiked ? ' cards__like_active' : ''}`
); 

  function handleClick() {
    const item = {
      link: props.card.link,
      isOpen:true,
      name: props.card.name
    }
    props.onCardClick(item);
  }  

  function handleLikeClick(){
    props.onCardLike(props.card)
  }

  function handleDeleteClick(){
    props.onCardDelete(props.card)
  }

    return (
        <li className="cards">
        <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
        <img className="cards__img" src={props.card.link} alt={props.card.name}  onClick={handleClick}/>
        <div className="cards__description">
          <h2 className="cards__title">{props.card.name}</h2>
          <div className="cards__container-like">
            <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
            <div className="cards__counter">{props.card.likes.length}</div>
          </div>
        </div>
      </li>
    )
}

export default Card;