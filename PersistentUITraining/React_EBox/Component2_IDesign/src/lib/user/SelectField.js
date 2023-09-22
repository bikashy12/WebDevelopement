import React, { Component } from "react";

export default class SelectField extends Component {
  render() {
    return (
      <>
        <div className="field">
          <label>Select field {this.props.selectOrder}</label>
          <br></br>
          <select>
            <option>One</option>
            <option>Two</option>
          </select>
        </div>
      </>
    );
  }
}
