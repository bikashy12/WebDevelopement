import React, { Component } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Players = () => {
  //Fill your code here
  return (
    <div id="players">
      <nav>
        <NavLink to="./sachin" id="sachin" activeClassName="active">
          Sachin
        </NavLink>
        <label> || </label>
        <NavLink to="./dhoni" id="dhoni" activeClassName="active">
          Dhoni
        </NavLink>
        <label> || </label>
        <NavLink to="./yuvaraj" id="yuvaraj" activeClassName="active">
          Yuvaraj
        </NavLink>
        <label> || </label>
        <NavLink to="./rickyPonting" id="rickyponting" activeClassName="active">
          RickyPonting
        </NavLink>
        <label> || </label>
        <NavLink to="./benStokes" id="benstokes" activeClassName="active">
          Ben Stokes
        </NavLink>
        <label> || </label>
        <NavLink to="./steveSmith" id="stevesmith" activeClassName="active">
          Steve Smith
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Players;
