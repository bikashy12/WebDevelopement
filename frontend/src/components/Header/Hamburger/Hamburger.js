import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Hamburger.css"; // Import the CSS file for styling
import { AuthContext } from "../../../hooks/auth-context";

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <strong>{auth.name}</strong>
      </p>
      <div className={`options ${showOptions ? "show" : ""}`}>
        <button
          onClick={() => {
            record();
          }}
        >
          Records
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Hamburger;

// const Hamburger = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     // Handle logout functionality here
//     console.log("Logout clicked");
//   };

//   const handleRecord = () => {
//     // Handle record functionality here
//     console.log("Record clicked");
//   };

//   return (
//     <div>
//       <div
//         className={`navbar-toggle ${isOpen ? "open" : ""}`}
//         onClick={toggleMenu}
//       >
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>
//       {isOpen && (
//         <ul className={`navbar-menu ${isOpen ? "open" : ""}`}>
//           <li>
//             <button onClick={handleLogout}>Logout</button>
//           </li>
//           <li>
//             <button onClick={handleRecord}>Record</button>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Hamburger;
