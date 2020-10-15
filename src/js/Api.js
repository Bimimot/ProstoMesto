export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
  }

  signinUser(mail, pass){
    return (
      fetch((this.baseUrl + '/signin'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({
          email: mail,
          password: pass,
        }),
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);                                                  
      })

    ); 
  }

  signupUser(name, about, avatar, mail, pass){
    return (
      fetch((this.baseUrl + '/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
        body: JSON.stringify({
          name: name,
          about: about,
          avatar: avatar,
          email: mail,
          password: pass
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);                                                  
      })

    ); 
  }

  getInitialCards() {
    return (                                                                                            //получаем стартовые карточки
      fetch((this.baseUrl + '/cards'), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);                                                  
        })
    )
  }
  getUser() {                                                                                             //получаем данные пользователя
    return(
    fetch((this.baseUrl + '/users/me'), {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);                                                  
    })
)
}

  setProfile(newName, newAbout) {                                                                       //передаем новые данные профиля
    return (
      fetch((this.baseUrl + '/users/me'), {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          about: newAbout
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);                                                  
      })
    )
  }

  setAvatar(newLink) {                                                                       //передаем новые данные профиля
    return (
      fetch((this.baseUrl + '/users/me/avatar'), {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: newLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);                                                  
      })
    )
  }

  postNewCard(newName, newLink) {
    return (
      fetch( (this.baseUrl + '/cards'), {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName,
          link: newLink
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    )
  }

  deleteCard(cardId) {
    return (   
      fetch( (this.baseUrl + '/cards/' + cardId), {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
     )
   }

   putLike(cardId){
    return (   
        fetch( (this.baseUrl + '/cards/' + cardId + '/likes'), {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
       )
    }

    deleteLike(cardId){
      return (   
          fetch( (this.baseUrl + '/cards/' + cardId + '/likes'), {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            },
          })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
          })
         )
      }
  
}