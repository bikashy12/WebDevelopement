import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { AuthContext } from "../../../../hooks/auth-context";

import "./Records.css";

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
          <td>{userData.age}</td>
        </tr>
        <tr>
          <th>Symptoms</th>
          <td>{userData.symptoms}</td>
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

export default function Record(props) {
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [recordData, setRecordData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getRecords = async () => {
    const userId = auth.userId;
    try {
      let response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: "GET",
      });
      const responseData = await response.json();
      setRecordData(responseData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  if (true) {
    getRecords();
  }
  return (
    <div className="record-container">
      <h3 className="userName">
        {/* Records of {localStorage.getItem("userName")} */}
        Records of {auth.name}
      </h3>
      {/* {recordData.length === 0 ? <h2>Loading...</h2> : null} */}
      <div className="record">
        {recordData.map((patient) => {
          return <Card userData={patient} />;
        })}
      </div>
    </div>
  );
}
