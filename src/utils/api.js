import { baseUrl } from "../utils/constants";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("jwt"),
});

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
export { checkResponse };

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: getHeaders(),
  }).then(checkResponse);
}

export { getItems };

//CARD ROUTE: create a card (POST)
function postItems(name, imageUrl, category) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      imageUrl,
      category,
    }),
  }).then(checkResponse);
}

export { postItems };

//  Delete card:
function deleteItem(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(checkResponse);
}

export { deleteItem };

function addCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: getHeaders(),
  }).then(checkResponse);
}

export { addCardLike };

function removeCardLike(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(checkResponse);
}

export { removeCardLike };
