import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-section">
      <h1>Symptom-Based Disease Prediction Web Application.</h1>
      <p>
        Get instant disease predictions with Medsure’s responsive web
        application by simply entering three symptoms.
      </p>
      <div className="primary-button home-buttonText">
        <a href="#userGuide">Get Started</a>
      </div>
    </div>
  );
}
