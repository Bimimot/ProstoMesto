export default class UserInfo {
    constructor(formElement, profileElement, api) {
        this.api = api;
        this.formElement = formElement;
        
        this.profileElement = profileElement;
        this._updateUserInfo = this._updateUserInfo.bind(this);
        this._setUserInfoDefault = this._setUserInfoDefault.bind(this);
        this._setUserInfo = this._setUserInfo.bind(this);
        
            this.nameInput = this.formElement.querySelector('.popup__input_type_name');
            this.aboutInput = this.formElement.querySelector('.popup__input_type_job');
                this.nameRender = this.profileElement.querySelector(".user-info__name");
                this.aboutRender = this.profileElement.querySelector(".user-info__job");

        this._openFormListener()
        this.setSubmitListener()
    }

    _openFormListener() {
        this.profileElement.
                querySelector('.user-info__button').
                addEventListener('click', this._setUserInfoDefault)
    }

    setSubmitListener() {
        this.formElement.                                                              //слушаем отправку формы
            addEventListener('submit', this._updateUserInfo);
    }

    _setUserInfoDefault() {                                                           //устанавливаем значения в поля формы - берем со страницы
        this.nameInput.value = this.nameRender.textContent;
        this.aboutInput.value = this.aboutRender.textContent;
    }

    _setUserInfo() {                                                                 //запоминаем новые значения для профиля
        this.name = this.nameInput.value;
        this.about = this.aboutInput.value;

    }

    _updateUserInfo(event) {                                                         //обновление профиля
        event.preventDefault();
        this._setUserInfo();

        this.api.setProfile(this.name, this.about)                                  //отправляем данные на сервер методом класса api
            .then( (result) => {                                                    //если есть результат - перерисовывам данные о пользователе
                    this.renderUser(result.name, result.about);                
            })
            .catch((err) => {
                console.log(err);
            })
    }

    renderUser(name, about) {                                             //отрисовываем данные пользователя
        this.nameRender.textContent = name;
        this.aboutRender.textContent = about;
      }
}

