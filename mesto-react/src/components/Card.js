import React from "react";


import likeIcon from '../images/like-icon.svg';
import trashIcon from '../images/trash-icon.svg';

export const Card = (props) => {

    function handleClick() {
        props.onCardClick(props.card);
     
      } 

return(

    <div id="cardTamplate" className="elements__tamplate" >
               <li className="element">
                    <img onClick={handleClick} className="element__image" src={props.link} alt="#"/>
                    <h2 className="element__title">{ props.name }</h2>
                    <div className="element__like-field">
                    <button type="button" className="element__like-button"><img src={likeIcon} className="element__like-icon" alt="Лайк"/></button>
                    <div className="element__like-count">{ props.likeCount > 0 ? props.likeCount : null }</div>
                    </div>
                    <button type="button" className="element__delite-button"><img src={trashIcon} className="element__delite-icon" alt="Удалить"/></button>
                </li>
               </div>
)

}
 export default Card