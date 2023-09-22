import React, { Component } from "react";
import "./App.css";
import InputField from "./lib/user/InputField";
import SelectField from "./lib/user/SelectField";

class App extends Component {
  render = () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    var indexTag = 1;
    return (
      <>
        <h1>Form Fields</h1>
        <div className="text-box">
          {numbers.map((number) => {
            if (number % 2 === 0) {
              return <SelectField selectOrder={indexTag++} />;
            } else {
              return <InputField inputOrder={indexTag} />;
            }
          })}
        </div>
      </>
    );
  };
}
export default App;
