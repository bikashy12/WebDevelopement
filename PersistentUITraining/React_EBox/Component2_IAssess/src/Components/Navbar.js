import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <ul>
          <h2 onClick={() => {}}>ShowTime</h2>
          <li>
            <a href="/aboutus">About Us</a>
          </li>
          <li>
            <a href="/customerservice">Customer Service</a>
          </li>
          <li>
            <a href="/terminsurance">Term Insurance</a>
          </li>
        </ul>
      </div>
    );
  }
}
