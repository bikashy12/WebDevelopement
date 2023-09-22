import React, { Component } from "react";

export default class PlanCard extends Component {
  render() {
    const plan = this.props.plan;
    return (
      <div className="plan-card">
        <div id={`${plan.id}header`} className="priceHeading">
          {`₹${plan.price}`}
        </div>
        <div id={`${plan.id}description`}>{plan.plan}</div>
      </div>
    );
  }
}
