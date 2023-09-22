import React from "react";
import { Link, Routes, Route } from "react-router-dom";

export default function SimpleROuting() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/service">Service</Link>
          </li>
        </ul>
      </nav>

      {/* create routing configuration */}

      <Routes>
        <Route path="/" element={<HomeCOmponent />}></Route>
        <Route path="/about" element={<AboutusComponent />}></Route>
        <Route path="/service" element={<ServiceComponent />}></Route>
      </Routes>
    </div>
  );
}

export function HomeCOmponent() {
  return <h1>This is Home component</h1>;
}

function AboutusComponent() {
  return <h1>This is ABout us component</h1>;
}

function ServiceComponent() {
  return <h1>This is Service COmponent</h1>;
}
