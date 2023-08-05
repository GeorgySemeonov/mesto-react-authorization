import React from "react";

import likeIcon from "../images/like-icon.svg";
import trashIcon from "../images/trash-icon.svg";

import { Header } from "./Header";
import Main from "./Main";
import { Footer } from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { ImagePopup } from "./ImagePopup";

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";

import "../index.css";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [imagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getDataProfile(), api.getInitialCards()])
      .then(([userItem, initialCards]) => {
        setCurrentUser(userItem);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка, ${err}`);
      });
  }, []);

  function handleCardDelete(card) {
    api
      .deliteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки, ${err}`);
      });
    //  console.log(card._id)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка лайка, ${err}`);
      });
  }

  function handleCardClick(item) {
    setImagePopupOpen(true);
    setSelectedCard({
      link: item.link,
      name: item.name,
    });
  }

  function handleUpdateUser(userItem) {
    api
      .setUserInfo(userItem)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования профиля, ${err}`);
      });
  }

  function handleUpdateAvatar(userItem) {
    api
      .setUserAvatar(userItem)
      .then((userItem) => {
        setCurrentUser(userItem);
        closeAllPopups();
      })
      .catch((error) =>
        console.error(`Ошибка редактирования аватара, ${error}`)
      );
  }

  function handleAddPlaceSubmit(userItem) {
    api
      .addNewCard(userItem)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка добавления карточки, ${error}`));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        {/* попап редактирования аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* попап редактирования информации профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* попап редактирования добавления карточки */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <ImagePopup
          isOpen={imagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <template id="cardTamplate" className="element__tamplate">
          <li className="element">
            <img className="element__image" src="#" alt="#" />
            <h2 className="element__title"></h2>
            <div className="element__like-field">
              <button type="button" className="element__like-button">
                <img src={likeIcon} className="element__like-icon" alt="Лайк" />
              </button>
              <div className="element__like-count"></div>
            </div>
            <button type="button" className="element__delite-button">
              <img
                src={trashIcon}
                className="element__delite-icon"
                alt="Удалить"
              />
            </button>
          </li>
        </template>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
