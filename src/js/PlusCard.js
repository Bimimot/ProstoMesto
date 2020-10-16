import Card from './Card.js';

export default class PlusCard {
    constructor(formElement, doList, api) {
        this.doList = doList;
        this.api = api;
        this.formElement = formElement;
        this._addNewCard = this._addNewCard.bind(this);
        this._setSubmitListener()
    }

    _renderCard(value, owner) {
        const currentCard = new Card(value, owner, this.api)
        .create();
        // const currentCard = this.onecard.create(value, owner);
        this.doList.addCard(currentCard);                   //создаем карточку и добавляем на страницу
    }

    _setSubmitListener() {                                   //слушатель нажатия кнопки отправки
        this.formElement.
            addEventListener('submit', this._addNewCard);
    }

    _addNewCard(event) {                                      //добавление карточки
        event.preventDefault();
        this._setNewCardInfo();

        this.api.postNewCard(this.name, this.link)
            .then((result) => {                                                    //если есть результат - рисуем карточку
                this._renderCard(result.data, result.data.owner);
            })
            .catch((err) => {
                console.log(err);
            })    
    }

    _setNewCardInfo() {                                    //получение данных о новой карточке
        this.name = this.formElement.querySelector('.popup__input_type_title').value;
        this.link = this.formElement.querySelector('.popup__input_type_link').value
    }
}

