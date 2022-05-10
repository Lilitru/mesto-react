import React from 'react';


function PopupWithForm(props) {

  return (
    <div className={`popup popup_${props.name}${props.isOpen ? " popup_opened" : ""}`}  >
      <div className="popup__cont">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <form name={props.name} onSubmit={props.onSubmit} className="popup__form">
          {props.children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;