import React from 'react';


function ImagePopup(props) {
    
    return (
        <div className={`popup popup_image${props?.card?.isOpen ? " popup_opened" : ""}`}>
        <div className="popup__container">
          <img className="popup__img" src={props?.card?.link} alt={props?.card?.name} />
          <button className="popup__close" type="button" onClick={props?.onClose}></button>
          <h2 className="popup__subtitle"></h2>
        </div>
      </div>
    )
}

export default ImagePopup;