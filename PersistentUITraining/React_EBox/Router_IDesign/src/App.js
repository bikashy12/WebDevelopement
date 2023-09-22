import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./App.css";
import RouterJioPlans from "./RouterJioPlans";

export default class App extends Component {
  render() {
    return (
      <div>
        <RouterJioPlans />
      </div>
    );
  }
}
