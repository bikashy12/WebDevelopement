import React, { useContext, useState } from "react";
import "./Hamburger.css"; // Import the CSS file for styling
import { AuthContext } from "../../../hooks/auth-context";
import { Link } from "react-router-dom";

const Hamburger = () => {
  const auth = useContext(AuthContext);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const record = () => {
    // Implement the record functionality here
    console.log("Record option clicked");
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div
      className={`hamburger ${showOptions ? "active" : ""}`}
      onClick={toggleOptions}
    >
      <p>
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg> */}
        {/* <strong>{auth.name}</strong> */}
      </p>
      <div className={`options ${showOptions ? "show" : ""}`}>
        <button onClick={record}>
          <Link to="/record" className="link-page">
            Records
          </Link>
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Hamburger;
