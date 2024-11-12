const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("jwt"),
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
export { checkResponse };

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  }).then(checkResponse);
}

export { getItems };

//CARD ROUTE: create a card (POST)
function postItems(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
}

export { postItems };

//  Delete card:
function deleteItem(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}

export { deleteItem };

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "POST",
    headers: headers,
  }).then(checkResponse);
}

export { addCardLike };

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}

export { removeCardLike };
