import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

export const Football = () => {
  const navigate = useNavigate();
  return (
    <div>
      Football is a family of team sports that involve, to varying degrees,
      kicking a ball to score a goal. Unqualified, the word football normally
      means the form of football that is the most popular where the word is
      used. Sports commonly called football include association football (known
      as soccer in North America and Oceania); gridiron football (specifically
      American football or Canadian football); Australian rules football; rugby
      union and rugby league; and Gaelic football. These various forms of
      football share to varying extent common origins and are known as football
      codes.
      <br />
      <button onClick={() => navigate(-1)} id="gobackFB" type="">
        Go back
      </button>
    </div>
  );
};

export const Cricket = () => {
  //Fill your code here
  const navigate = useNavigate();
  return (
    <>
      Cricket is a bat-and-ball game played between two teams of eleven players
      each on a field at the centre of which is a 22-yard (20-metre) pitch with
      a wicket at each end, each comprising two bails balanced on three stumps.
      The game proceeds when a player on the fielding team, called the bowler,
      "bowls" (propels) the ball from one end of the pitch towards the wicket at
      the other end, with an "over" being completed once they have legally done
      so six times. The batting side has one player at each end of the pitch,
      with the player at the opposite end of the pitch from the bowler aiming to
      strike the ball with a bat. The batting side scores runs either when the
      ball reaches the boundary of the field, or when the two batters swap ends
      of the pitch, which results in one run.
      <br />
      <button onClick={() => navigate(-1)} id="gobackCricket">
        Go back
      </button>
    </>
  );
};

export const Hockey = () => {
  //Fill your code here
  const navigate = useNavigate();
  return (
    <>
      Hockey is a term used to denote various types of both summer and winter
      team sports which originated on either an outdoor field, sheet of ice, or
      dry floor such as in a gymnasium. There are many types of hockey. Some
      games make the use of skates, either wheeled, or bladed while others do
      not. In order to help make the distinction between these various games,
      the word "hockey" is often preceded by another word i.e. "field hockey",
      "ice hockey", "roller hockey", "rink hockey", or "floor hockey".
      <br />
      <button onClick={() => navigate(-1)} id="gobackHockey">
        Go back
      </button>
    </>
  );
};

export const Badminton = () => {
  //Fill your code here
  const navigate = useNavigate();
  return (
    <>
      Badminton is a racquet sport played using racquets to hit a shuttlecock
      across a net. Although it may be played with larger teams, the most common
      forms of the game are "singles" (with one player per side) and "doubles"
      (with two players per side). Badminton is often played as a casual outdoor
      activity in a yard or on a beach; formal games are played on a rectangular
      indoor court. Points are scored by striking the shuttlecock with the
      racquet and landing it within the opposing side's half of the court.
      <br />
      <button onClick={() => navigate(-1)} id="gobackBadminton">
        Go back
      </button>
    </>
  );
};
