import "./pages/index.css";

import Api from './js/Api.js';
import Avatar from './js/Avatar.js';
import Card from './js/Card.js';
import CardList from './js/CardList.js';
import FormValidator from './js/FormValidator.js';
import PlusCard from './js/PlusCard.js';
import Popup from './js/Popup.js';
import UserInfo from './js/UserInfo.js';
import Signin from './js/Signin.js';

    //dom-элементы, для работы с методами классов
    const mainContainer = document.querySelector('.root');                            //основной контейнер, нужен для слушания keydown
    const rootContainer = document.querySelector('.places-list');                     //контейнер для карточек
    const plusCardForm = document.querySelector('.popup__form_type_add-place');
    const profileForm = document.querySelector('.popup__form_type_edit-ptofile');
    const avatarForm = document.querySelector('.popup__form_type_avatar');
    const signinForm = document.querySelector('.popup__form_type_signin');
    const profileElement = document.querySelector('.profile');
    const avatarElement = document.querySelector('.user-info__photo');

    const popupProfileContainer = document.querySelector('.popup_type_edit-profile');
    const popupAvatarContainer = document.querySelector('.popup_type_avatar');
    const popupSigninContainer = document.querySelector('.popup_type_signin');
    const popupSignupContainer = document.querySelector('.popup_type_signup');
    const popupCardContainer = document.querySelector('.popup_type_card');
    const popupAddCardContainer = document.querySelector('.popup_type_add-place');
  
    //мой Id пользователя
    let myId = 0;
  
    //тексты ошибок
    const errorsMessages = {
      validateBlank: 'Это обязательное поле',
      validateText: 'Должно быть от 2 до 30 символов',
      validateUrl: 'Здесь должна быть ссылка',
      validateEmail: 'Нужно указать адрес почты',
      validatePassword: 'Нужно не менее 8 символов',
    }

    // const serverUrl = (NODE_ENV === 'development') ? 'http://praktikum.tk/cohort10' : 'https://praktikum.tk/cohort10';
    const serverUrl = 'http://localhost:3000';
    const api = new Api({baseUrl: serverUrl});
    
    const newProfile = new UserInfo(profileForm, profileElement, api);                //создаем объект для обработки формы профиля, передаем методы api
    const oneCard = new Card(api);                                              //объект с методами создания и обработки одной отдельной карточки
    const doList = new CardList(rootContainer);
    const editAvatar = new Avatar(avatarForm, avatarElement, api);                    //создаем объект для обработки формы редактирования аватара, передаем методы api
    const cards = new PlusCard(plusCardForm, doList, api, oneCard);                            //методы для обработки формы добавления карточки
    const signinUser = new Signin(signinForm, api);
          
    
    api.getUser()                                                                    //получаем данные о пользователе, получаем промис
    .then((result) => {
      myId = result.data._id;                                                           //запоминаю свой ID для использования
      newProfile.renderUser(result.data.name, result.data.about);                            //если успешно - отрисовываем профиль
      editAvatar.renderAvatar(result.data.avatar);                                      //и аватар  
      })
      .catch((err) => {
          console.log(err);
        })
        .finally(() => {
            api.getInitialCards()                                                           //запрашиваем карточки, получаем промис
            .then((result) => {                                                           //если получили массив - выводим карточки
              result.data.forEach((value) => {
                const startCard = oneCard.create(value, myId);                                   //создаем контейнер с карточкой, учитываем myId для показа лайков
                doList.addCard(startCard);                                                //добавляем на страницу созданный контейнер карточки                                                               
              })
              new Popup(popupCardContainer, '.place-card__image', validator);             //и только теперь начинаем слущать открытие попапов на карточках
          })
            .catch((err) => {
              console.log(err);
            })
    
      
    })
      
  

  
  
    const validator = new FormValidator(errorsMessages);                               //создаем валидатор, передаем тексты ошибок
  
    const editProfilePopup = new Popup(popupProfileContainer, '.user-info__button', validator);
    const editAvatarPopup = new Popup(popupAvatarContainer, '.user-info__photo', validator);
    const signinPopup = new Popup(popupSigninContainer, '.menu__button_type_signin', validator);
    const signupPopup = new Popup(popupSignupContainer, '.popup__button_type_signup-open', validator);
    const plusCardPopup = new Popup(popupAddCardContainer, '.menu__button_type_add-place', validator);

  
  
  