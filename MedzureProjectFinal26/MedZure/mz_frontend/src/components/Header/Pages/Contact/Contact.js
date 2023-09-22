import React from "react";
// import SocialButtons from "./SocialButtons";
import ContactForm from "../ContactForm";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <div className="container">
        <div className="contact-content">
          <b>
            Feel free to <br />
            keep in touch
          </b>
          <p>
            We are here to help you with any inquiries you may have about our
            products and services. Please feel free to call or email us, or use
            our contact form to get in touch with us. We look forward to hearing
            from you!
          </p>
          {/* <SocialButtons /> */}
        </div>
        <div className="form">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Contact;
