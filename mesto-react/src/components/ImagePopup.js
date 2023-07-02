import React from "react";
import closeIcon from '../images/close-Icon.svg';

export const ImagePopup = (props) => {


    return (
        <div id="imagePopup" className={`popup popup_image-card ${ props.card ? 'popup_opened' : '' }`} >
        <div className="popup__image-container">

            <button onClick={ props.onClose } type="button" className="popup__close"><img className="popup__close-icon" src={closeIcon} alt="Закрыть"/></button>

            <img src={props.card.link} className="popup__image" />

            <h2 className="popup__image-title"></h2>
        </div>
    </div>
    );
  }
