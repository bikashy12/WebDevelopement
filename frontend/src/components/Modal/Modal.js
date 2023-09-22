import React, { useState, useRef, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./Modal.css";

const Modal = ({ onClose }) => {
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
          &#x2715;
        </button>
        {isLoginForm ? (
          <LoginForm onClose={handleCloseModal} />
        ) : (
          <SignupForm onClose={handleCloseModal} />
        )}
        <p>
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <button onClick={toggleForm}>
            {isLoginForm ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
