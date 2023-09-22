import React, { useContext, useState } from "react";
import "./Header.css";
import { Routes, Route, Link } from "react-router-dom";
import ServicePage from "../Pages/Service/ServicePage";
import Service from "../Section/Services/Service";
import Home from "../Section/Home/Home";
import UserGuide from "../Section/Guide/UserGuide";
import FAQ from "../Section/FAQ/FAQ";
import About from "../Pages/About/About";
import App from "../../../App";
import Contact from "../Pages/Contact/Contact";
import Form from "../Pages/PredictionForm/Form";
import LoginForm from "../../Modal/LoginForm";
import Modal from "../../Modal/Modal";
import { AuthContext } from "../../../hooks/auth-context";
import Hamburger from "../Hamburger/Hamburger";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useContext(AuthContext);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <div style={{ margin: "auto 0" }} className="logo">
            <Link to="/">
              <img
                src={require("../HeaderLogo.jpg")}
                alt="logo-image"
                className="logo-icon"
              />
            </Link>
            <p>MedZure</p>
          </div>
          <ul>
            <Link className="link-page" to="/services">
              <li>services</li>
            </Link>
            <Link className="link-page" to="/about">
              <li>about</li>
            </Link>
            <Link className="link-page" to="/contact">
              <li>contact</li>
            </Link>
          </ul>
          {auth.token ? (
            <Hamburger />
          ) : (
            <>
              <div className="primary-button" onClick={handleOpenModal}>
                LOG IN
              </div>
            </>
          )}
          {isModalOpen && <Modal onClose={handleCloseModal} />}
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Service />
              <UserGuide />
              <FAQ />
            </>
          }
        ></Route>
        <Route path="/services" element={<ServicePage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/predict" element={<Form />}></Route>
      </Routes>
    </div>
  );
}
