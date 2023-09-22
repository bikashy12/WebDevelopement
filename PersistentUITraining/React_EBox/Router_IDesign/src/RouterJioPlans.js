import React, { Component } from "react";
import { Link, Route, Switch, Routes } from "react-router-dom";
import topupImg from "./Images/topup.png";
import twoGBImg from "./Images/2g.png";
import threeFourGBImg from "./Images/3g4g.png";
import TopupPlan from "./TopupPlan";
import GB34 from "./GB34";
import GB2 from "./GB2";

export default class RouterJioPlans extends Component {
  constructor() {
    super();
    this.state = {
      isPlanClicked: true,
      planToShow: "topup-sidebar",
    };
  }
  handlePlanChange = (planNumber) => {
    this.setState({
      isPlanClicked: true,
      planToShow:
        planNumber === 1
          ? "topup-sidebar"
          : planNumber === 2
          ? "threegb-sidebar"
          : planNumber === 3 && "twogb-sidebar",
    });
  };
  render() {
    return (
      <div>
        <navbar>
          <ul>
            <li>
              <Link to="/topup">
                <img
                  src={topupImg}
                  alt="topup-icon"
                  id="topup-image"
                  onClick={() => {
                    this.handlePlanChange(1);
                  }}
                />
              </Link>
            </li>
            <div id={this.state.isPlanClicked && this.state.planToShow}></div>
            <li>
              <Link to="/3g4g">
                <img
                  src={threeFourGBImg}
                  alt="topup-icon"
                  id="jio-image"
                  onClick={() => {
                    this.handlePlanChange(2);
                  }}
                />
              </Link>
            </li>
            <div id={this.state.isPlanClicked && this.state.planToShow}></div>
            <li>
              <Link to="/2g">
                <img
                  src={twoGBImg}
                  alt="topup-icon"
                  id="GB2-image"
                  onClick={() => {
                    this.handlePlanChange(3);
                  }}
                />
              </Link>
            </li>
            <div id={this.state.isPlanClicked && this.state.planToShow}></div>
          </ul>
        </navbar>
        <Switch>
          <Route path="/" exact component={TopupPlan}></Route>
          <Route path="/topup" component={TopupPlan}></Route>
          <Route path="/2g" component={GB2}></Route>
          <Route path="/3g4g" component={GB34}></Route>
        </Switch>
      </div>
    );
  }
}
