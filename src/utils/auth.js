import { baseUrl } from "../utils/constants";

// const headers = { "Content-Type": "application/json" };

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + localStorage.getItem("jwt"),
});

import { checkResponse } from "./api";

function signUp(email, password, name, avatar) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
}
export { signUp };

function signIn(email, password) {
  return fetch(`${baseUrl}/signIn`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}
export { signIn };

function verifyUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { verifyUser };

function updateProfile(name, avatar) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      name,
      avatar: avatar,
    }),
  }).then(checkResponse);
}

export { updateProfile };
