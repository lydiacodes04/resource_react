const baseUrl = "http://localhost:3001";
// const baseUrl0 = "http://localhost:3000";
const headers = { "Content-Type": "application/json" };

import { checkResponse } from "./api";

function signUp(email, password, name, avatarUrl) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password, name, avatarUrl }),
  }).then(checkResponse);
}
export { signUp };

function signIn(email, password) {
  return fetch(`${baseUrl}/signIn`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}
export { signIn };

function verifyUser(token) {
  return fetch(`${baseUrl}/profile`, {
    // return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { verifyUser };

//missmatch between update profile and verify user endpoints

function updateProfile(name, avatarUrl) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      name,
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
}

export { updateProfile };
