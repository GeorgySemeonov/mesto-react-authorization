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
const [selectedCard, setSelectedCard] = React.useState(false);

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

        {/* <div id="profilePopup" className="popup">
            <div className="popup__container">
                <button type="button" className="popup__close"><img className="popup__close-icon" src={closeIcon} alt="Закрыть"/></button>
                <h2 className="popup__title">Редактировать профиль</h2>
                <form id="popupForms" className="popup__forms" name="profile" noValidate>
                    <input required id="userNameForm" className="popup__form" type="text" name="name" placeholder="Имя" minLength="2" maxLength="40"/>
                    
                    <span className="popup__input-error popup__input-error_type_name"></span>
                    
                    <input required id="userOccupationForm" className="popup__form" type="text" name="about" placeholder="Должность" minLength="2" maxLength="200"/>
                    
                    <span className="popup__input-error popup__input-error_type_about"></span>
                    
                    <button type="submit" className="popup__button  ">Сохранить</button>
                </form>
            </div>
        </div>
        
        <div id="cardPopup" className="popup">
            <div className="popup__container">
                <button type="button" className="popup__close"><img className="popup__close-icon" src={closeIcon} alt="Закрыть"/></button>
                <h2 className="popup__title">Новое место</h2>
                <form id="popupFormsCard" className="popup__forms" name="card" noVaidate>
                    <input required id="nameCard" className="popup__form " type="text" name="name" placeholder="Название" minLength="2" maxLength="30"/>
                    
                    <span className="popup__input-error popup__input-error_type_name"></span>
                   
                    <input required  id="imageLink" className="popup__form" type="url" name="link" placeholder="Ссылка на картинку"/>
                    
                    <span className="popup__input-error popup__input-error_type_link"></span>
                    
                    <button id="createButton" type="submit" className="popup__button  ">Создать</button>
                </form> 
            </div>
        </div>

        <div id="imagePopup" className="popup popup_image-card">
            <div className="popup__image-container">

                <button type="button" className="popup__close"><img className="popup__close-icon" src={closeIcon} alt="Закрыть"/></button>

                <img className="popup__image"/>

                <h2 className="popup__image-title"></h2>
            </div>
        </div>

        <div id="avatarPopup" className="popup">
            <div className="popup__container">

              <button type="button" className="popup__close"><img className="popup__close-icon" src={closeIcon} alt="Закрыть"/></button>

              <h2 className="popup__title">Обновить аватар</h2>

              <form className="popup__forms" name="user-avatar" noValidate>
                
                  <input id="avatar-input" type="url" className="popup__form "
                         name="avatar" required placeholder="Введите ссылку на аватар" minLength="2" maxLength="200"/>
                    <span className="popup__input-error popup__input-error_type_avatar"></span>
               
                <button id="createAvatar" type="submit" className="popup__button  ">Сохранить</button>
              </form>
            </div>
          </div>

          <div id="confirmPopup" className="popup popup_type_confirm">

            <div className="popup__container">

                <h2 className="popup__title popup__title-confirm">Вы уверены?</h2>

                <form className="popup__form "  name="card-form" noValidate>
                    <button id="confirmButton" type="submit" className="popup__button popup__button_active popup__button-confirm" >Да</button>
                </form>

                <button type="button" className="popup__close"><img className="popup__close-icon" src={closeIcon} alt="Закрыть"/>
                </button>
            </div>
        </div> */}
       
        

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
