import React, { useState, useRef } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { userList } from "./UserList";
import UserDisplay from "./UserDisplay";
import QuestionDisplay from "./QuestionDisplay";

export default function Login() {
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  function handleLogin(event) {
    event.preventDefault();
    var username = usernameRef.current.value;
    var password = passwordRef.current.value;
    var usernameFound = false;
    userList.map((user, index) => {
      if (username === user.username) {
        setUsernameValid(true);
        usernameFound = true;
        if (password === user.password) {
          setPasswordValid(true);
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/user");
          }
        } else {
          setError("Invalid password");
        }
      }
    });
    if (!usernameFound) {
      setError("Username does not exist");
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form id="login-form" onSubmit={(event) => handleLogin(event)}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          ref={usernameRef}
        ></input>
        <br />
        <br />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
        ></input>
        <br />
        <br />
        <div id="errorMessage">{error}</div>
        <button type="submit" id="login">
          Login
        </button>
      </form>
    </div>
  );
}
