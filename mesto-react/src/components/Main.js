import React from "react";
import api from '../utils/Api';

import editProfileIcon from '../images/edit-profile-icon.svg';
import createProfileIcon from '../images/create-profile-icon.svg';

import likeIcon from '../images/like-icon.svg';
import trashIcon from '../images/trash-icon.svg';

import Card from './Card';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {

    // const [rating, setRating] = React.useState(0);

    const [ userAvatar , setUserAvatar] = React.useState({});
    const [userName, setUserName] = React.useState({});
    const [userDescription, setUserDescription] = React.useState({});

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getDataProfile(), api.getInitialCards()])
        .then(([profInfo, cardsData]) => {
          // console.log(profInfo);
          // console.log(cardsData);
          setUserAvatar(profInfo.avatar);
          setUserName(profInfo.name);
          setUserDescription(profInfo.about);

          const cardsFromApi = cardsData.map(item =>({
            key: item._id ,
            link: item.link ,
            name: item.name ,
            likeCount: item.likes.length ,
          }));
          setCards(cardsFromApi);
          
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
        })
        },[]);

  return (
    <>
      <div className="profile">
        <div className="profile__avatar">
          <img src="#" style={{ backgroundImage: `url(${userAvatar})` }}   className="profile__photo" alt="Аватар" />
          <button type="button" onClick={onEditAvatar} className="profile__avatar-edit"></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{`${userName}`}</h1>
          <button type="button" onClick={onEditProfile} className="profile__edit">
            <img
              src={editProfileIcon}
              className="profile__edit-icon"
              alt="Редактировать"
            />
          </button>
          <p className="profile__subtitle"> {`${userDescription}`}</p>
        </div>
        <button type="button" onClick={onAddPlace} className="profile__add-button">
          <img
            src={createProfileIcon}
            className="profile__add-button-icon"
            alt="Создать"
          />
        </button>
      </div>

      <div  className="elements__list" >
      {cards.map(({key, link , name , likeCount } ) => (
      
    <Card 
    key={key} 
    link={link} 
    name={name} 
    likeCount={likeCount} 
    onCardClick={onCardClick}
    />
    ))}
               
               </div>

      <div className="elements"></div>
    </>
  );
};

export default Main;