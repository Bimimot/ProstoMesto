export default class Signin {
    constructor(formElement, api) {
        this.api = api;
        this.formElement = formElement;

        this._getUser = this._getUser.bind(this);
        this._sendUser = this._sendUser.bind(this);

        this.emailInput = this.formElement.querySelector('.popup__input_type_email');
        this.passInput = this.formElement.querySelector('.popup__input_type_password');

        this.setSubmitListener()
    }


    setSubmitListener() {
        this.formElement.                                                              //слушаем отправку формы
            addEventListener('submit', this._sendUser);
    }


    _getUser() {                                                                 //запоминаем значения для авторизации
        this.email = this.emailInput.value;
        this.pass = this.passInput.value;
    }

    _sendUser(event) {                                                         //отправляем данные на сервер
        event.preventDefault();
        this._getUser();

        this.api.signinUser(this.email, this.pass)                                  //отправляем данные на сервер методом класса api
            .then((result) => {                                                    //если есть результат - сохраняем токен и перегружаем страницу
                localStorage.setItem('token', result.token);
                location = location;        //перезагрузка страницы после авторизации
            })
            .catch((err) => {
                console.log(err);
            })
    }

}

