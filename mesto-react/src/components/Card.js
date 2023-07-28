import React from "react";


import likeIcon from '../images/like-icon.svg';
import trashIcon from '../images/trash-icon.svg';

export const Card = ({card , onCardClick}) => {

    function handleClick() {
       onCardClick(card);
     
      } 

return(

    <div id="cardTamplate" className="elements__tamplate" >
               <li className="element">
                    <img onClick={handleClick} className="element__image" src={card.link} alt={card.name}/>
                    <h2 className="element__title">{ card.name }</h2>
                    <div className="element__like-field">
                    <button type="button" className="element__like-button"><img src={likeIcon} className="element__like-icon" alt="Лайк"/></button>
                    <div className="element__like-count">{ card.likes.length > 0 ? card.likes.length : null }</div>
                    </div>
                    <button type="button" className="element__delite-button"><img src={trashIcon} className="element__delite-icon" alt="Удалить"/></button>
                </li>
               </div>
)

}
 export default Card