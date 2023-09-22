import React, { Component } from "react";

export default class MovieDetails extends Component {
  render() {
    const movieCard = this.props.movie;
    return (
      <div className="image-bg">
        <div className="black"></div>
        <div className="detailLinks"></div>
        <ul>
          <li id="summary">
            <a>Summary</a>
          </li>
          <li id="showTimings">
            <a>Show Timings</a>
          </li>
        </ul>
        <div className="imageContent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8.688"
            height="16"
            viewBox="0 0 8.688 16"
            id="back-arrow"
            onClick={() => {
              this.props.handleBack(false);
            }}
          >
            <path
              id="Path_510"
              data-name="Path 510"
              d="M15.874,8.307l-.255.255a.431.431,0,0,1-.61,0L8,1.55.991,8.561a.431.431,0,0,1-.61,0L.126,8.307a.431.431,0,0,1,0-.61L7.694.126a.431.431,0,0,1,.61,0L15.87,7.7A.428.428,0,0,1,15.874,8.307Z"
              transform="translate(0 16) rotate(-90)"
              fill="#0f0f0f"
            />
          </svg>
          <img id="movie-img" src={movieCard.src} alt="movieImage" />
          <div id="movie-name">
            <h2>{movieCard.name}</h2>
          </div>
          <div id="synopsis">
            <h3>Synopsis</h3>
            <p>{movieCard.synopsis}</p>
          </div>
        </div>
      </div>
    );
  }
}
