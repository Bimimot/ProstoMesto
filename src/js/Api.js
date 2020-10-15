export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
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
        fetch( (this.baseUrl + '/cards/like/' + cardId), {
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
          fetch( (this.baseUrl + '/cards/like/' + cardId), {
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