import React, { Component } from "react";
import MovieDetails from "./MovieDetails";

export default class Card extends Component {
  render() {
    const movie = this.props.movie;
    return (
      <>
        <img
          key={movie.id}
          src={movie.src}
          alt="CardImage"
          id={`image${movie.id}`}
          onClick={() => {
            this.props.handleClick(true);
          }}
        />
      </>
    );
  }
}
