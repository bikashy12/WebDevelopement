import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import LeftPanel from "./Components/LeftPanel";
import "./globals.css";
import MovieDetails from "./Components/MovieDetails";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Navbar />
        <Header />
      </div>
    );
  }
}
