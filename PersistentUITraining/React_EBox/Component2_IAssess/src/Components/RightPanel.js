import React, { Component } from "react";
import { nowShowing, comingSoon, exclusive } from "./MovieListJson";
import Card from "./Card";
import MovieDetails from "./MovieDetails";

export default class RightPanel extends Component {
  constructor() {
    super();
    this.state = {
      isCardClicked: false,
      MovieDetails: {},
    };
  }
  handleClick = (nod) => {
    this.props.showDetail(nod);
  };
  render() {
    var toRender =
      this.props.typeShow === "nowShowing"
        ? nowShowing
        : this.props.typeShow === "comingSoon"
        ? comingSoon
        : this.props.typeShow === "exclusive" && exclusive;
    return (
      <div className={!this.state.isCardClicked && "right-panel"}>
        {!this.state.isCardClicked &&
          toRender.map((movieDetails, index) => {
            return (
              <>
                <Card
                  movie={movieDetails}
                  key={index}
                  id={`card${movieDetails.id}`}
                  handleClick={(nod) => {
                    // Disappearing the left panel and header from the screen
                    this.handleClick(nod);
                    this.setState({
                      isCardClicked: true,
                      MovieDetails: movieDetails,
                    });
                  }}
                />
              </>
            );
          })}
        {this.state.isCardClicked && (
          <MovieDetails
            movie={this.state.MovieDetails}
            handleBack={(nod) => {
              this.setState({
                isCardClicked: nod,
                MovieDetails: {},
              });
              // Appearing the left panel and header on the screen
              this.props.showDetail(nod);
            }}
          />
        )}
      </div>
    );
  }
}
