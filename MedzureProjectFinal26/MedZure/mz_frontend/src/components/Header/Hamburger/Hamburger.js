import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Hamburger.css"; // Import the CSS file for styling
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../../hooks/auth-context";

const Hamburger = (props) => {
  const auth = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);
  const [logout, setLogout] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // const showRecord = async () => {
  //   const userId = auth.userId;
  //   try {
  //     let response = await fetch(`http://localhost:3001/api/users/${userId}`, {
  //       method: "GET",
  //     });

  //     const responseData = await response.json();
  //     props.getRecords(responseData);
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   }
  // };

  const showRecord = () => {
    props.getRecords();
  };

  const handleLogout = () => {
    auth.logout();
  };
  const navigate = useNavigate();
  console.log(auth.name + "from Hamburger" + auth.token);
  return (
    <>
      <div
        className={`hamburger ${showOptions ? "active" : ""}`}
        onClick={toggleOptions}
      >
        <p className="hamburger-button primary-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
          <AccountCircleIcon sx={{ fontSize: 30 }} />
          <strong style={{ "margin-right": "15px" }}>
            {localStorage.getItem("userName")}
            {/* {auth.name} */}
          </strong>
        </p>
      </div>
      <div className={`options ${showOptions ? "show" : ""}`}>
        <div className="option-button">
          <button className="recordParent-button" onClick={() => navigate("/")}>
            Home
          </button>
          <button
            onClick={(event) => {
              showRecord();
            }}
            className="recordParent-button"
          >
            {/* <Link to="/record" className="record-button"> */}
            <span>Records</span>
            {/* </Link> */}
          </button>
          <button onClick={handleLogout} className="recordParent-button">
            <Link to="/" className="record-button">
              <span>Logout</span>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Hamburger;
