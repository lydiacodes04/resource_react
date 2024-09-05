import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
// const jwt = require("jsonwebtoken");

const checkResponse = () => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function signUp() {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}
export { signUp };

function signIn() {
  return fetch(`${baseUrl}/signIn`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}
export { signIn };

function verifyUser() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    //token = 1234
  }).then(checkResponse);
}

export { verifyUser };

// sends new user name and the avatar URL to the server.
function updateProfile(name, avatarUrl) {
  return fetch(`${baseUrl}/profile`, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({
      name,
      avatarUrl,
    }),
  }).then(checkResponse);
}

export { updateProfile };
