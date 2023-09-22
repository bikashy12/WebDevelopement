import React, { Component } from "react";

export default class InputField extends Component {
  render() {
    return (
      <>
        <div className="field">
          <label>Text field {this.props.inputOrder}</label>
          <br></br>
          <input type="text" placeholder="Type your text"></input>
        </div>
      </>
    );
  }
}
