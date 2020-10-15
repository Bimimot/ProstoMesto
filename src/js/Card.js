export default class Card {
    constructor(myId, api) {
        // this.name = value.name;
        // this.link = value.link;
        // this.likes = value.likes.length;
        // this.likers = value.likes;
        // this.cardId = value._id;
        // this.ownerId = value.owner._id;
        this.myId = myId;
        this.api = api;
        this.create = this.create.bind(this);
        this._remove = this._remove.bind(this);
        this._clickedLike = this._clickedLike.bind(this)
    }

    _setEventListeners() {                                                                 //слушатель удаления карточки и лайка
        this
            .cardElement.querySelector('.place-card__like-icon')
            .addEventListener('click', this._clickedLike);

        if (this._canDelete()) {
            this
                .cardElement.querySelector('.place-card__delete-icon')
                .addEventListener('click', this._remove)
        }
    }

    _clickedLike() {
        if (this._likedCard()) {
            this.api.deleteLike(this.cardId)
                .then((res) => {
                    this._updateLikes(this.heart, res)
                })
        }
        else {
            this.api.putLike(this.cardId)
                .then((res) => {
                    this._updateLikes(this.heart, res)
                })
        }

    }

    _updateLikes(heart, cardValue) {
        this.likers = cardValue.likes;
        this.likes = cardValue.likes.length;
        this._renderLikeHeart(heart);
        this._getLikes();
    }

    _renderLikeHeart(heart) {
        heart.classList.toggle('place-card__like-icon_liked');
    }

    _getLikes() {
        this.cardElement.querySelector(".place-card__likes-count").textContent = this.likes;
    }

    _likedCard() {
        let likeStatement = false;

        this.likers.forEach(element => {
            if (element._id === this.myId) {
                likeStatement = true;
                return
            }
        });

        return likeStatement
    }

    _remove() {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            this.api.deleteCard(this.cardId)
                .then((result) => {                                                           //если удалили с сервера - убираем карточку
                    this.cardElement.remove();
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    create(value) {
    this.name = value.name;
    this.link = value.link;
    this.likes = value.likes.length;
    this.likers = value.likes;
    this.cardId = value._id;
    this.ownerId = value.owner._id;
        const cardContainer = document.createElement('div');                              // создаем div-контейнер для карточки - на входе объект со свойствами карточки name и link                                       
        cardContainer.insertAdjacentHTML('beforeend', `             
            <div class="place-card">
                <div class="place-card__image">
                </div>
                <div class="place-card__description">
                    <h3 class="place-card__name"></h3>
                    <div class="place-card__likes">
                        <button class="place-card__like-icon"></button>
                        <p class="place-card__likes-count"></p>
                    </div>
                </div>
            </div>`);                                                                     //вкладываем в контейнер нужную разметку  

        if (this._canDelete()) {                                                           //если можем удалить - создаем элемент кнопки удаления
            const imageContainer = cardContainer.querySelector('.place-card__image');
            imageContainer.insertAdjacentHTML('beforeend', `<button class="place-card__delete-icon"></button>`);
        }

        this.cardElement = cardContainer;
        this.heart = this.cardElement.querySelector(".place-card__like-icon");

        cardContainer.querySelector(".place-card__name").textContent = this.name;         //устанавливаем название и фон карточки                       
        cardContainer.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;
        if (this._likedCard()) {
            this._renderLikeHeart(this.heart)
        };                             //устанавливаем состояние сердчека-лайка
        this._getLikes();                                                                 //устанавливаем количество лайков

        //для возможности использования элемента в других методах этого же класса
        this._setEventListeners();
        return cardContainer;                                                             // получаем  DOM-объект, со всеми свойствами - картинкой,кнопками, текстом
    }

    _canDelete() {
        if (this.ownerId === this.myId) { return true }
        else { return false }
    }

}

