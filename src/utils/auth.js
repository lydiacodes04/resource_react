// import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };
// const jwt = require("jsonwebtoken");

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

function signUp(email, password, name, avatarUrl) {
  return fetch(`${baseUrl}/register`, {
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

// function verifyUser(email, password, token)
function verifyUser(email, password, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
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
