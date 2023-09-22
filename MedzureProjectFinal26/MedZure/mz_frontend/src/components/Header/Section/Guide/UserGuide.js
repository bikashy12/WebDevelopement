import React from "react";
import "./UserGuide.css";
import { Link } from "react-router-dom";

export default function UserGuide() {
  return (
    <div id="userGuide">
      <div className="user-guide">
        <div>
          <img
            src={require("../UserImage.jpg")}
            alt="User Guide Image"
            className="userGuide-image"
          />
        </div>
        <div className="userGuide-desc">
          <h1>User Guide</h1>
          <p>
            Sure! Here is the user guide for your web form page, broken down
            into steps: <br />
            <ul>
              <li>Open the web form page.</li>
              <li>Fill in your name in the "Name" section.</li>
              <li>Enter your age in the "Age" section.</li>
              <li>
                Use the search bar next to the options list to search for
                specific symptoms.
              </li>
              <li>
                Select at least three symptoms from the options list by clicking
                on them.
              </li>
              <li>
                The selected symptoms will appear in the "Selected Symptoms"
                section.
              </li>
              <li>
                Ensure you have selected at least three symptoms before
                proceeding.
              </li>
              <li>
                Once you have selected the symptoms, click the submit button to
                proceed with the prediction of the disease based on the selected
                symptoms.
              </li>
              <li>
                Await the prediction results, which will be
                displayed on the screen.
              </li>
              <li>To proceed with the Predictions click the button below.</li>
            </ul>
          </p>
          <div className="primary-button predict-button">
            <Link to="/predict" className="predict-button">
              Predict Disease
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
