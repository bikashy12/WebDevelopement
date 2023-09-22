import React from "react";
import "./App.css";
import Login from "./Login";
import UserDisplay from "./UserDisplay";
import { userList } from "./UserList";
import QuestionDisplay from "./QuestionDisplay";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route
          path="/admin"
          element={<UserDisplay userList={userList}></UserDisplay>}
        ></Route>
        <Route
          path="/user"
          element={
            <QuestionDisplay
              questions={require("./questionlist.json")}
            ></QuestionDisplay>
          }
        ></Route>
      </Routes>
    </div>
  );
}
