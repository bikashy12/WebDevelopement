import React, { Component } from "react";
import { language, gener, format } from "./MovieListJson";

export default class LeftPanel extends Component {
  constructor() {
    super();
    this.state = {
      isLanguageClicked: false,
      isGenerClicked: false,
      isFormatClicked: false,
    };
  }
  render() {
    return (
      <div className="left-panel">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.406"
            height="5.65"
            viewBox="0 0 10.406 5.65"
            onClick={() =>
              this.setState({
                isLanguageClicked: !this.state.isLanguageClicked,
              })
            }
          >
            <path
              id="Path_510"
              data-name="Path 510"
              d="M11.2,152.223l-.166-.166a.28.28,0,0,0-.4,0l-4.558,4.56-4.56-4.56a.28.28,0,0,0-.4,0l-.166.166a.28.28,0,0,0,0,.4l4.922,4.924a.28.28,0,0,0,.4,0l4.922-4.924A.278.278,0,0,0,11.2,152.223Z"
              transform="translate(-0.875 -151.975)"
              fill="#151724"
            />
          </svg>
          &nbsp;Select Language<br></br>
          {this.state.isLanguageClicked &&
            language.map((lang) => {
              return (
                <>
                  <input type="checkbox"></input>
                  <label>{lang.value}</label>
                  <br></br>
                </>
              );
            })}
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.406"
            height="5.65"
            viewBox="0 0 10.406 5.65"
            onClick={() =>
              this.setState({ isGenerClicked: !this.state.isGenerClicked })
            }
          >
            <path
              id="Path_510"
              data-name="Path 510"
              d="M11.2,152.223l-.166-.166a.28.28,0,0,0-.4,0l-4.558,4.56-4.56-4.56a.28.28,0,0,0-.4,0l-.166.166a.28.28,0,0,0,0,.4l4.922,4.924a.28.28,0,0,0,.4,0l4.922-4.924A.278.278,0,0,0,11.2,152.223Z"
              transform="translate(-0.875 -151.975)"
              fill="#151724"
            />
          </svg>
          &nbsp;Select Gener<br></br>
          {this.state.isGenerClicked &&
            gener.map((gener) => {
              return (
                <>
                  <input type="checkbox"></input>
                  <label>{gener.value}</label>
                  <br></br>
                </>
              );
            })}
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10.406"
            height="5.65"
            viewBox="0 0 10.406 5.65"
            onClick={() =>
              this.setState({ isFormatClicked: !this.state.isFormatClicked })
            }
          >
            <path
              id="Path_510"
              data-name="Path 510"
              d="M11.2,152.223l-.166-.166a.28.28,0,0,0-.4,0l-4.558,4.56-4.56-4.56a.28.28,0,0,0-.4,0l-.166.166a.28.28,0,0,0,0,.4l4.922,4.924a.28.28,0,0,0,.4,0l4.922-4.924A.278.278,0,0,0,11.2,152.223Z"
              transform="translate(-0.875 -151.975)"
              fill="#151724"
            />
          </svg>
          &nbsp;Select Format<br></br>
          {this.state.isFormatClicked &&
            format.map((format) => {
              return (
                <>
                  <input type="checkbox"></input>
                  <label>{format.value}</label>
                  <br></br>
                </>
              );
            })}
        </div>
      </div>
    );
  }
}
