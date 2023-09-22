import React, { useContext, useState, useEffect } from "react";
import "./Header.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ServicePage from "../Pages/Service/ServicePage";
import Service from "../Section/Services/Service";
import Home from "../Section/Home/Home";
import UserGuide from "../Section/Guide/UserGuide";
import FAQ from "../Section/FAQ/FAQ";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Form from "../Pages/PredictionForm/Form";
import Modal from "../../Modal/Modal";
import { AuthContext } from "../../../hooks/auth-context";
import Hamburger from "../Hamburger/Hamburger";
import Record from "../Pages/Records/Records";

export default function Header(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordData, setRecordData] = useState({});
  const auth = useContext(AuthContext);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  // const getRecords = (records) => {
  //   setRecordData(records);
  //   navigate("/record");
  // };

  const getRecords = async () => {
    const userId = auth.userId;
    try {
      let response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "GET",
      });
      const responseData = await response.json();
      setRecordData(responseData);
      navigate("/record");
    } catch (error) {
      console.error("API Error:", error);
    }
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
            <p onClick={() => navigate("/")}>MedZure</p>
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
            <Hamburger getRecords={getRecords} />
          ) : (
            <>
              <div className="primary-button" onClick={handleOpenModal}>
                LOG IN
              </div>
            </>
          )}
          {isModalOpen && (
            <Modal
              onClose={handleCloseModal}
              setUserName={(username) => {
                props.setUserName(username);
              }}
            />
          )}
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
        {auth.isLoggedIn ? (
          <Route
            path="/record"
            element={<Record recordData={recordData} />}
          ></Route>
        ) : (
          <Route
            path="/record"
            element={
              <h1 style={{ "margin-bottom": "395px" }}>
                Record Page Not Accesible
              </h1>
            }
          ></Route>
        )}
      </Routes>
    </div>
  );
}
