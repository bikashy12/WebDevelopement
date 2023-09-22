import React, { Component } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Football, Cricket, Hockey, Badminton } from "./Sportinfo.js";

class Sports extends Component {
  render = () => {
    return (
      <>
        <div className="sports" id="sports">
          <ul>
            <li>
              <Link to="/football" id="football">
                Football
              </Link>
            </li>
            <li>
              <Link to="/cricket" id="cricket">
                Cricket
              </Link>
            </li>
            <li>
              <Link to="/hockey" id="hockey">
                Hockey
              </Link>
            </li>
            <li>
              <Link to="/badminton" id="badminton">
                Badminton
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  };
}

export default Sports;
