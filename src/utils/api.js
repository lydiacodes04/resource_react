const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: { headers },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems };

//CARD ROUTE: create a card (POST)
function postItems(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { headers },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { postItems };

// export default class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   // suggestion
//   // _request(url, options) {
//   //   return fetch(url, options).then(this._checkResponse);
//   // }

//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   }

//   //CARD ROUTE: get all the cards (GET)
//   getInitialCards() {
//     return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
//       this._checkResponse
//     );
//   }

//   // USER ROUTE: get current user's info (GET)
//   getUser() {
//     return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
//       this._checkResponse
//     );
//   }

//   //CARD ROUTE: create a card (POST)
//   addCard(name, link) {
//     return fetch(`${this._baseUrl}/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         link,
//       }),
//     }).then(this._checkResponse);
//   }

//   editProfile(name, about) {
//     return fetch(`${this._baseUrl}/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({ name, about }),
//     }).then(this._checkResponse);
//   }
//   // CARD ROUTE:
//   deleteRequest(cardID) {
//     return fetch(`${this._baseUrl}/cards/${cardID}`, {
//       method: "DELETE",
//       headers: this._headers,
//     }).then(this._checkResponse);
//   }

//   //PUT add and remove likes
//   addLike(cardID) {
//     return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
//       method: "PUT",
//       headers: this._headers,
//       body: JSON.stringify({ isLiked: true }),
//     }).then(this._checkResponse);
//   }

//   removeLike(cardID) {
//     return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
//       method: "DELETE",
//       headers: this._headers,
//       body: JSON.stringify({ isLiked: false }),
//     }).then(this._checkResponse);
//   }

//   //PATCH /users/me/avatar – Update avatar

//   updateAvatar(avatar) {
//     return fetch(`${this._baseUrl}/users/me/avatar`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         avatar,
//       }),
//     }).then(this._checkResponse);
//   }
// }

//in index.js

//initial API call
// const api = new Api({
//     baseUrl: "https://around-api.en.tripleten-services.com/v1",
//     headers: {
//       authorization: "119b16d3-4721-4c28-968f-5c9b08f91550",
//       "content-type": "application/json",
//     },
//   });

//later example of API instantiation
// function handleAvatarSubmit({ link }) {
//     avatarEditPopup.renderLoading(true);
//     api
//       .updateAvatar(link)
//       .then(() => {
//         userInfo.setAvatar(link);
//         avatarEditPopup.close();
//       })
//       .catch((err) => {
//         console.error("Error updating avatar:", err);
//       })
//       .finally(() => {
//         avatarEditPopup.renderLoading(false);
//       });
//   }

// initial API call
// const api = new Api({
//   baseUrl: "http://localhost:3001",
//   headers: {
//     authorization: "",
//     "content-type": "application/json",
//   },
// });
