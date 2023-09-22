import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./Record.css";

function Card({ userData }) {
  const [cardClicked, setCardClicked] = useState(false);
  return (
    <div className="card">
      <table>
        <tr>
          <th>Name</th>
          <td>{userData.name}</td>
        </tr>
        <tr>
          <th>Age</th>
          <td>23</td>
        </tr>
        <tr>
          <th>Symptoms</th>
          <td>"Swelling Of Stomach,Swollen Legs,Swelling Joints"</td>
        </tr>
        <tr>
          <th>Disease</th>
          <td>{userData.disease}</td>
        </tr>
        <tr>
          <th>Date</th>
          <td>{userData.date}</td>
        </tr>
      </table>
    </div>
  );
}

export default function Record() {
  const [recordHistory, setRecordHistory] = useState([
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
    {
      name: "Aditya",
      disease: "AIDs",
      date: "25/05/23",
    },
  ]);
  return (
    <>
      <h3 className="userName">Vivek Dubey</h3>
      <div className="record">
        {recordHistory.map((patient) => {
          return <Card userData={patient} />;
        })}
      </div>
    </>
  );
}
