import React, { Component } from "react";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isNowClicked: true,
      isComingClicked: false,
      isExclusiveClicked: false,
      isCardClicked: false,
    };
  }
  handleDetail = (nod) => {
    if (!nod) {
      this.setState({ isCardClicked: false });
    } else {
      this.setState({ isCardClicked: true });
    }
  };
  render() {
    return (
      <header>
        <div className={!this.state.isCardClicked && "header"}>
          {!this.state.isCardClicked && (
            <ul>
              <li
                onClick={() => {
                  this.setState({
                    isNowClicked: true,
                    isComingClicked: false,
                    isExclusiveClicked: false,
                  });
                }}
                id="nowShowing"
              >
                Now Showing
              </li>
              <li
                onClick={() => {
                  this.setState({
                    isNowClicked: false,
                    isComingClicked: true,
                    isExclusiveClicked: false,
                  });
                }}
                id="comingSoon"
              >
                Coming Soon
              </li>
              <li
                onClick={() => {
                  this.setState({
                    isNowClicked: false,
                    isComingClicked: false,
                    isExclusiveClicked: true,
                  });
                }}
                id="exclusive"
              >
                Exclusive
              </li>
            </ul>
          )}
          {this.state.isNowClicked ? (
            <RightPanel
              typeShow={"nowShowing"}
              showDetail={this.handleDetail}
            />
          ) : this.state.isComingClicked ? (
            <RightPanel
              typeShow={"comingSoon"}
              showDetail={this.handleDetail}
            />
          ) : (
            this.state.isExclusiveClicked && (
              <RightPanel
                typeShow={"exclusive"}
                showDetail={this.handleDetail}
              />
            )
          )}
        </div>
        {!this.state.isCardClicked && <LeftPanel />}
      </header>
    );
  }
}
