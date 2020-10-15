export default class Card {
    constructor(api) {        
        this.api = api;
        this.create = this.create.bind(this);
        this._remove = this._remove.bind(this);
        this._clickedLike = this._clickedLike.bind(this)
    }

    _likeListener(myId, cardId, cardContainer) {                                                                 //слушатель удаления карточки и лайка        
            cardContainer.querySelector('.place-card__like-icon')
            .addEventListener('click', () => this._clickedLike(myId, cardId, cardContainer, this.likers));    
    }

    _deleteListener(myId, cardId, cardContainer){
        if (this._canDelete(myId)) {
                cardContainer.querySelector('.place-card__delete-icon')
                .addEventListener('click', () => this._remove(cardId, cardContainer))
        }
    }

    _clickedLike(myId, cardId, cardContainer) { 
        if (this._likedCard(this.likers, myId)) {
            this.api.deleteLike(cardId)
                .then((res) => {
                    this._updateLikes(res.data, cardContainer)
                })
        }
        else {
            this.api.putLike(cardId)
                .then((res) => {
                    this._updateLikes(res.data, cardContainer)
                })
        }

    }

    _updateLikes(cardValue, cardContainer) {
        let likes = cardValue.likes.length;
        this.likers = cardValue.likes;
        this._setLikes(cardContainer, likes);
            cardContainer.querySelector(".place-card__like-icon")
                .classList.toggle('place-card__like-icon_liked');

    }

    _setLikes(cardContainer, likes) {
        cardContainer.querySelector(".place-card__likes-count").textContent = likes;
    }

    _likedCard(likers, myId) {
        let likeStatement = false;

        likers.forEach(element => {
            if (element === myId) {
                likeStatement = true;
                return
            }
        });

        return likeStatement
    }

    _remove(cardId, cardContainer) {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            this.api.deleteCard(cardId)
                .then((result) => {                                                           //если удалили с сервера - убираем карточку
                    cardContainer.remove();
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    create(value, myId) {
    this.name = value.name;
    this.link = value.link;
    this.likes = value.likes.length;
    this.likers = value.likes;
    this.cardId = value._id;
    this.ownerId = value.owner;
    this.myId = myId;
    
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

        if (this._canDelete(myId)) {                                                           //если можем удалить - создаем элемент кнопки удаления
            const imageContainer = cardContainer.querySelector('.place-card__image');
            imageContainer.insertAdjacentHTML('beforeend', `<button class="place-card__delete-icon"></button>`);
        }

        this.cardElement = cardContainer;
        

        cardContainer.querySelector(".place-card__name").textContent = this.name;         //устанавливаем название и фон карточки                       
        cardContainer.querySelector(".place-card__image").style.backgroundImage = `url(${this.link})`;

        if (this._likedCard(this.likers, this.myId)) {
            cardContainer.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked')
        };                             //устанавливаем состояние сердчека-лайка
        this._setLikes(cardContainer, this.likes);                                                                 //устанавливаем количество лайков

        //для возможности использования элемента в других методах этого же класса
        this._deleteListener(this.myId, this.cardId, cardContainer);
        this._likeListener(this.myId, this.cardId, cardContainer, this.likers);
        return cardContainer;                                                             // получаем  DOM-объект, со всеми свойствами - картинкой,кнопками, текстом
    }

    _canDelete(myId) {
        if (this.ownerId === myId) { return true }
        else { return false }
    }

}

