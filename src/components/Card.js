import React from 'react';

function Card(props) {

  function handleClick() {
    const item = {
      link: props.card.link,
      isOpen:true,
      name: props.card.name
    }
    props.onCardClick(item);
  }  

    return (
        <li className="cards">
        <button className="cards__remove" type="button"></button>
        <img className="cards__img" src={props.card.link} alt={props.card.name}  onClick={handleClick}/>
        <div className="cards__description">
          <h2 className="cards__title">{props.card.name}</h2>
          <div className="cards__container-like">
            <button className="cards__like" type="button"></button>
            <div className="cards__counter">{props.card.likes.length}</div>
          </div>
        </div>
      </li>
    )
}

export default Card;