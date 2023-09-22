import React from "react";
import "./ContactForm.css";

const ContactForm = () => {
  return (
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" autoComplete="off" />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" autoComplete="off" />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input id="message" name="message" autoComplete="off" />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" autoComplete="off"></textarea>
      </div>

      <button type="submit" className="send-btn primary-button">
        SEND MESSAGE
      </button>
    </form>
  );
};

export default ContactForm;
