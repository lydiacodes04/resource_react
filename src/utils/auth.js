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

export { ProtectedRoute };

function signUp() {
  return fetch(`${baseUrl}/profile/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

export { signUp };

function signIn() {
  return fetch(`${baseUrl}/profile/`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export { signIn };
