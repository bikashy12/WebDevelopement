import React, { Component } from "react";
import { gb34 } from "./plansJson";
import PlanCard from "./PlanCard";

export default class TopupPlan extends Component {
  render() {
    return (
      <>
        <p id="topHeading">3G/4G Plans</p>
        <div className="plan-container">
          {gb34.map((plan, index) => {
            return (
              <div className="plan-card" id={plan.id}>
                <div id={`${plan.id}header`} className="priceHeading">
                  {`₹${plan.price}`}
                </div>
                <div id={`${plan.id}description`}>{plan.plan}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
