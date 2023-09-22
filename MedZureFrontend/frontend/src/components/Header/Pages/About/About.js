import React from "react";
// import SocialButtons from "./SocialButtons";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <h1>
        <span className="about">About</span>
      </h1>
      <div className="content">
        <div className="our_vision">
          <h2 className="heading">Our vision</h2>
          <p>
            Our vision at Medsure is to revolutionize the healthcare industry by
            providing a user-friendly and accurate disease prediction platform.
            We aim to empower individuals with the ability to take control of
            their health by providing a reliable tool for early disease
            detection. Our ultimate goal is to contribute towards a healthier
            and happier society.
            <br />
            <br />
            Let's talk.
            <br />
            <br />
            <b className="contact">contactUs@gmail.com</b>
          </p>
        </div>
        {/* <SocialButtons /> */}
        <br />
        <div className="team_story">
          <img src="https://shorturl.at/cKLY4" alt="Team Story" />
          <h2 className="heading">Team Story</h2>
          <p>
            Medsure was founded by a team of experienced professionals who were
            passionate about finding a solution to the problem of timely and
            accurate disease prediction. Their combined expertise in technology,
            medicine, and data analytics helped them create a responsive
            web-based application that could predict diseases based on symptoms
            entered by the user. The team's commitment to innovation and
            excellence has made Medsure a trusted name in the healthcare
            industry, with a loyal user base and a reputation for delivering
            reliable and accurate predictions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
