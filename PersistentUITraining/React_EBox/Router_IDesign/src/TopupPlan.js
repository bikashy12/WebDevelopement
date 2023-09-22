import React, { Component } from "react";
import { topup } from "./plansJson";
import PlanCard from "./PlanCard";

export default class TopupPlan extends Component {
  render() {
    return (
      <>
        <p id="topHeading">Topup Plans</p>
        <div className="plan-container">
          {topup.map((plan, index) => {
            return (
              <div
                className="plan-card"
                key={plan.id + "planCard"}
                id={plan.id}
              >
                <div
                  id={`${plan.id}header`}
                  className="priceHeading"
                >{`₹ ${plan.price}`}</div>
                <div id={`${plan.id}description`}>{plan.plan}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
