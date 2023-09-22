import React, { Component } from "react";
import { gb2 } from "./plansJson";
import PlanCard from "./PlanCard";

export default class TopupPlan extends Component {
  render() {
    return (
      <>
        <p id="topHeading">2G Plans</p>
        <div className="plan-container">
          {gb2.map((plan, index) => {
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

{
  /* <h2>3G/4G Plans</h2>
<div className="card-container">
{gb34.map((planObj) => (
<div key={planObj.id} id={planObj.id} className="card">
<div className="content">
<div className="header" id={planObj.id+"header"}><Icon name="rupee"/>

{planObj.price}</div>
<div className="description" id={planObj.id+"description"}>{planObj.plan}</div>
</div>
</div>
// </div>
))}
</div> */
}
