import React from "react";
import "./Footer.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer-section">
      <div className="social-buttons">
        <div className="social-icons">
          <FacebookShareButton className="btn" url="www.facebook.com">
            <FontAwesomeIcon
              icon={faFacebookSquare}
              style={{ height: "30px" }}
            />
          </FacebookShareButton>
        </div>

        <div className="social-icons">
          <TwitterShareButton className="btn" url="www.twitter.com">
            <FontAwesomeIcon
              icon={faTwitterSquare}
              style={{ height: "30px" }}
            />
          </TwitterShareButton>
        </div>
        <div className="social-icons">
          <LinkedinShareButton className="btn" url="www.linkedin.com">
            <FontAwesomeIcon icon={faLinkedin} style={{ height: "30px" }} />
          </LinkedinShareButton>
        </div>
      </div>
      <div className="copyright">
        <p>
          <p>&#169; 2023 Copyright MedZure. All rights reserved.</p>
        </p>
      </div>
      <div>
        <p>Made by Medzure Team</p>
      </div>
    </div>
  );
}
