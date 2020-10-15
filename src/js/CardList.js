export default class CardList {
    constructor(container) {
        this.container = container;
    }

    addCard(element) {                                                                //добавление элемента карточки в контейнер карточек
        this.container.appendChild(element) 
    }


}
