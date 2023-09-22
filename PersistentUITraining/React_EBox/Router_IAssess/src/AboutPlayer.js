import React, { Component } from "react";
import { Outlet, useParams } from "react-router-dom";
import PlayerData from "./PlayerData";

function AboutPlayer() {
  const params = useParams();
  console.log(params);
  const playerName = params.playerName;
  return (
    <div id="about" className="about">
      {PlayerData[playerName]}
    </div>
  );
}

export default AboutPlayer;
