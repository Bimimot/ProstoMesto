export default class Avatar {
    constructor(formElement, avatarElement, api) {
        this.api = api;
        this.formElement = formElement;

        this.avatarElement = avatarElement;
        this._updateAvatar = this._updateAvatar.bind(this);
        this._setAvatar = this._getAvatarLink.bind(this);

        this.linkInput = this.formElement.querySelector('.popup__input_type_link');


        this.setSubmitListener()
    }


    setSubmitListener() {
        this.formElement.                                                              //слушаем отправку формы
            addEventListener('submit', this._updateAvatar);
    }


    _getAvatarLink() {                                                                 //запоминаем новые значения для профиля
        this.link = this.linkInput.value;
    }

    _updateAvatar(event) {                                                         //обновление аватара
        event.preventDefault();
        this._getAvatarLink();

        this.api.setAvatar(this.link)                                  //отправляем данные на сервер методом класса api
            .then((result) => {                                                    //если есть результат - перерисовывам аватар
                this.renderAvatar(this.link);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderAvatar(link) {                                             //отрисовываем аватар пользователя
        this.avatarElement.style.backgroundImage = 'url(' + link + ')';
    }
}

