// import { useEffect, useState } from "react";
const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function signUp() {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function signIn() {
  return fetch(`${baseUrl}/signIn`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function verifyUser() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

export { signUp, signIn, verifyUser };
