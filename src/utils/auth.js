const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

// inspired by ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // If user isn't logged in, return a Navigate component that sends the user to /login
    return <Navigate to="/login" replace />;
  }
  // Otherwise, render the protected route's child component.
  return children;
}

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

export { ProtectedRoute, signUp, signIn, verifyUser };
