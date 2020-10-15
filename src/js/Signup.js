export default class Signup {
    constructor(formElement, api) {
        this.api = api;
        this.formElement = formElement;

        this._getUser = this._getUser.bind(this);
        this._sendUser = this._sendUser.bind(this);

        this.nameInput = this.formElement.querySelector('.popup__input_type_name');
        this.aboutInput = this.formElement.querySelector('.popup__input_type_job');
        this.avatarInput = this.formElement.querySelector('.popup__input_type_link');
        this.emailInput = this.formElement.querySelector('.popup__input_type_email');
        this.passInput = this.formElement.querySelector('.popup__input_type_password');

        this.setSubmitListener()
    }


    setSubmitListener() {
        this.formElement.                                                              //слушаем отправку формы
            addEventListener('submit', this._sendUser);
    }


    _getUser() {                                                                 //запоминаем значения для авторизации
        this.name = this.nameInput.value;
        this.about = this.aboutInput.value;
        this.avatar = this.avatarInput.value;
        this.email = this.emailInput.value;
        this.pass = this.passInput.value;
    }

    _sendUser(event) {                                                         //отправляем данные на сервер
        event.preventDefault();
        this._getUser();

        this.api.signupUser(this.name, this.about, this.avatar, this.email, this.pass)                                  //отправляем данные на сервер методом класса api
            .then((result) => {                                                    //если есть результат - сохраняем токен и перегружаем страницу
                localStorage.setItem('token', result.token);
            })
            .catch((err) => {
                console.log(err);
            })
    }

}

