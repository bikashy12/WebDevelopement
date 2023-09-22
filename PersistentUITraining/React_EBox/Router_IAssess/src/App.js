import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPlayer from "./AboutPlayer";
import Sports from "./Sports";
import Players from "./Players";
import { Badminton, Football, Hockey, Cricket } from "./Sportinfo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSportsClicked: true,
      isPlayersClicked: false,
    };
  }
  render() {
    return (
      <>
        <div className="navbar" id="header">
          <li className="topHeading">
            SPORTS <br></br>COUNCIL
          </li>
          <ul>
            <li>
              <Link
                to="/sports"
                className={
                  this.state.isSportsClicked ? "clicked" : "navbarLink"
                }
                id="sports"
                onClick={() => {
                  this.setState({
                    isSportsClicked: true,
                    isPlayersClicked: false,
                  });
                }}
              >
                Sports Category
              </Link>
            </li>
            <li>
              <Link
                to="/players"
                className={
                  this.state.isPlayersClicked ? "clicked" : "navbarLink"
                }
                id="players"
                onClick={() => {
                  this.setState({
                    isPlayersClicked: true,
                    isSportsClicked: false,
                  });
                }}
              >
                Cricket Players Selected
              </Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" exact element={<Sports />}></Route>
          <Route path="/sports" element={<Sports />}></Route>
          <Route path="/football" element={<Football />}></Route>
          <Route path="/cricket" element={<Cricket />}></Route>
          <Route path="/hockey" element={<Hockey />}></Route>
          <Route path="/badminton" element={<Badminton />}></Route>

          <Route path="/players" element={<Players />}>
            <Route path=":playerName" element={<AboutPlayer />} />
          </Route>
        </Routes>
      </>
    );
  }
}
export default App;
