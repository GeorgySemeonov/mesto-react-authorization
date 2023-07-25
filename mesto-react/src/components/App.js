import React  from 'react'

// { useState }

// import closeIcon from '../images/close-Icon.svg';
import likeIcon from '../images/like-icon.svg';
import trashIcon from '../images/trash-icon.svg';


import {Header} from './Header';
import Main from './Main';
import {Footer} from './Footer';
import PopupWithForm from './PopupWithForm';
import {ImagePopup} from './ImagePopup';

import api from '../utils/Api';

import './index.css';

function App() {

const [ isEditAvatarPopupOpen , setIsEditAvatarPopupOpen] = React.useState(false);
const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
const [selectedCard, setSelectedCard] = React.useState({});

function handleCardClick (items) {
    setSelectedCard({link: items});
    
    // console.log(item.link);
    
    }


         function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)}
      
         function handleEditProfileClick() {setIsEditProfilePopupOpen(true)}
      
         function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)}


     
         
         function closeAllPopups () {
            setIsEditAvatarPopupOpen(false);
            setIsEditProfilePopupOpen(false);
            setIsAddPlacePopupOpen(false);
            setSelectedCard(false)
            }
         
            
          


  return (
      <div className="page">
       <Header />
       <Main 
       onEditAvatar = {handleEditAvatarClick}
       onEditProfile = {handleEditProfileClick}
       onAddPlace = {handleAddPlaceClick}
       onCardClick = {handleCardClick}
       />
       <Footer />
       
{/* попап редактирования аватара */}
       <PopupWithForm 
        isOpen = { isEditAvatarPopupOpen } 
        onClose = { closeAllPopups }
        id = 'avatarPopup'
        title = 'Обновить аватар'
        
       >
       <input id="avatar-input" type="url" className="popup__form "
                         name="avatar" required placeholder="Введите ссылку на аватар" minLength="2" maxLength="200"/>
                    <span className="popup__input-error popup__input-error_type_avatar"></span>

       </PopupWithForm>

{/* попап редактирования информации профиля */}
       <PopupWithForm 
        isOpen = { isEditProfilePopupOpen }
        onClose = { closeAllPopups }
        id = 'profilePopup'
        title = 'Редактировать профиль'
        name = 'popupForms'
       >
 <input required id="userNameForm" className="popup__form" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40"/>
                    
                    <span className="popup__input-error popup__input-error_type_name"></span>
                    
                    <input required id="userOccupationForm" className="popup__form" type="text" name="about" placeholder="Должность" minLength="2" maxLength="200"/>
                    
                    <span className="popup__input-error popup__input-error_type_about"></span>
       </PopupWithForm>

{/* попап редактирования добавления карточки */}
       <PopupWithForm 
        isOpen = { isAddPlacePopupOpen }
        onClose = { closeAllPopups }
        id = 'cardPopup'
        title = 'Новое место'
        name = 'popupFormsCard'
       >
<input required id="nameCard" className="popup__form " type="text" name="name" placeholder="Название" minLength="2" maxLength="30"/>
                    
                    <span className="popup__input-error popup__input-error_type_name"></span>
                   
                    <input required  id="imageLink" className="popup__form" type="url" name="link" placeholder="Ссылка на картинку"/>
                    
                    <span className="popup__input-error popup__input-error_type_link"></span>

       </PopupWithForm>


       <ImagePopup
       
       onClose = { closeAllPopups }
       card = { selectedCard } 
    
       />

                <template id="cardTamplate" className="element__tamplate" >
                <li className="element">
                    <img  className="element__image" src="#" alt="#"/>
                    <h2 className="element__title"></h2>
                    <div className="element__like-field">
                    <button type="button" className="element__like-button"><img src={likeIcon} className="element__like-icon" alt="Лайк"/></button>
                    <div className="element__like-count"></div>
                    </div>
                    <button type="button" className="element__delite-button"><img src={trashIcon} className="element__delite-icon" alt="Удалить"/></button>
                </li>
               </template>

     
       
     </div>
  
  );
}

export default App;
