import React, { useState, useRef, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

const Modal = ({ onClose, setUserName }) => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const modalRef = useRef(null);

  const handleCloseModal = () => {
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <button className="close-button" onClick={handleCloseModal}>
          {/* &#x2715; */}
          <CloseIcon style={{ fontSize: 25, color: "grey" }} />
        </button>
        {isLoginForm ? (
          <LoginForm
            onClose={handleCloseModal}
            setUserName={(username) => {
              setUserName(username);
            }}
          />
        ) : (
          <SignupForm onClose={handleCloseModal} />
        )}
        <p>
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <button onClick={toggleForm}>
            {isLoginForm ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
