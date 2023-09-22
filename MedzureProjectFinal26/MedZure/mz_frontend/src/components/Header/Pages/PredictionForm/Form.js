import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../hooks/auth-context";
import axios from "axios";
import "./Form.css";

function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [predictedDisease, setPredictedDisease] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString();
    setDate(formattedDate);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState([
    "Itching",
    "Skin Rash",
    "Nodal Skin Eruptions",
    "Continuous Sneezing",
    "Shivering",
    "Chills",
    "Joint Pain",
    "Stomach Pain",
    "Acidity",
    "Ulcers On Tongue",
    "Muscle Wasting",
    "Vomiting",
    "Burning Micturition",
    "Spotting",
    "Urination",
    "Fatigue",
    "Weight Gain",
    "Anxiety",
    "Cold Hands And Feets",
    "Mood Swings",
    "Weight Loss",
    "Restlessness",
    "Lethargy",
    "Patches In Throat",
    "Irregular Sugar Level",
    "Cough",
    "High Fever",
    "Sunken Eyes",
    "Breathlessness",
    "Sweating",
    "Dehydration",
    "Indigestion",
    "Headache",
    "Yellowish Skin",
    "Dark Urine",
    "Nausea",
    "Loss Of Appetite",
    "Pain Behind The Eyes",
    "Back Pain",
    "Constipation",
    "Abdominal Pain",
    "Diarrhoea",
    "Mild Fever",
    "Yellow Urine",
    "Yellowing Of Eyes",
    "Acute Liver Failure",
    "Fluid Overload",
    "Swelling Of Stomach",
    "Swelled Lymph Nodes",
    "Malaise",
    "Blurred And Distorted Vision",
    "Phlegm",
    "Throat Irritation",
    "Redness Of Eyes",
    "Sinus Pressure",
    "Runny Nose",
    "Congestion",
    "Chest Pain",
    "Weakness In Limbs",
    "Fast Heart Rate",
    "Pain During Bowel Movements",
    "Pain In Anal Region",
    "Bloody Stool",
    "Irritation In Anus",
    "Neck Pain",
    "Dizziness",
    "Cramps",
    "Bruising",
    "Obesity",
    "Swollen Legs",
    "Swollen Blood Vessels",
    "Puffy Face And Eyes",
    "Enlarged Thyroid",
    "Brittle Nails",
    "Swollen Extremeties",
    "Excessive Hunger",
    "Extra Marital Contacts",
    "Drying And Tingling Lips",
    "Slurred Speech",
    "Knee Pain",
    "Hip Joint Pain",
    "Muscle Weakness",
    "Stiff Neck",
    "Swelling Joints",
    "Movement Stiffness",
    "Spinning Movements",
    "Loss Of Balance",
    "Unsteadiness",
    "Weakness Of One Body Side",
    "Loss Of Smell",
    "Bladder Discomfort",
    "Foul Smell Of Urine",
    "Continuous Feel Of Urine",
    "Passage Of Gases",
    "Internal Itching",
    "Toxic Look (Typhos)",
    "Depression",
    "Irritability",
    "Muscle Pain",
    "Altered Sensorium",
    "Red Spots Over Body",
    "Belly Pain",
    "Abnormal Menstruation",
    "Dischromic Patches",
    "Watering From Eyes",
    "Increased Appetite",
    "Polyuria",
    "Family History",
    "Mucoid Sputum",
    "Rusty Sputum",
    "Lack Of Concentration",
    "Visual Disturbances",
    "Receiving Blood Transfusion",
    "Receiving Unsterile Injections",
    "Coma",
    "Stomach Bleeding",
    "Distention Of Abdomen",
    "History Of Alcohol Consumption",
    "Fluid Overload",
    "Blood In Sputum",
    "Prominent Veins On Calf",
    "Palpitations",
    "Painful Walking",
    "Pus Filled Pimples",
    "Blackheads",
    "Scurring",
    "Skin Peeling",
    "Silver Like Dusting",
    "Small Dents In Nails",
    "Inflammatory Nails",
    "Blister",
    "Red Sore Around Nose",
    "Yellow Crust Ooze",
    "Prognosis",
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (option) => {
    setSelectedItems((prevItems) => {
      if (!prevItems.includes(option)) {
        const updatedItems = [...prevItems, option];
        setSearchTerm(""); // Clear the search bar input
        return updatedItems;
      }
      return prevItems;
    });
  };
  const handleRemove = (item) => {
    setSelectedItems(selectedItems.filter((option) => option !== item));
  };

  var allSymptoms;
  const handleSubmit = async (event) => {
    // Perform submit action here
    event.preventDefault();
    setLoading(true);

    allSymptoms = selectedItems.join(",");
    var symptoms = {
      symptoms: allSymptoms,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        symptoms,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPredictedDisease(response.data);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const formData = {
      name: name,
      age: age,
      date: new Date().toLocaleDateString(),
      symptoms: selectedItems.join(","),
      disease: predictedDisease,
      user: auth.userId,
    };

    try {
      const response = await fetch("http://localhost:3001/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: age,
          date: new Date().toLocaleDateString(),
          symptoms: selectedItems.join(","),
          disease: predictedDisease,
          user: auth.userId,
        }),
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Disease Predictor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-section">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-section">
          <label>Date:</label>
          <input type="text" value={date} disabled />
        </div>
        <div className="form-section">
          <label>Symptoms:</label>
          <div className="search-container">
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter symptoms"
            />
            <ul className="options-list">
              {options
                .filter((option) =>
                  option.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option, index) => (
                  <li
                    className="option-item"
                    key={index}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="selected-items-section">
          <label>Selected Symptoms:</label>
          <div className="selected-items">
            {selectedItems.map((item, index) => (
              <div className="selected-item" key={index}>
                <span>{item}</span>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        {name || age || selectedItems.length > 0 ? (
          <button
            className="submit-button reset-button"
            type="reset"
            onClick={() => {
              setAge("");
              setName("");
              setSelectedItems([]);
            }}
          >
            Reset
          </button>
        ) : null}
        <button
          className="submit-button"
          type="submit"
          // onClick={handleSubmit}
          disabled={selectedItems.length < 3}
        >
          Get Result
        </button>

        {selectedItems.length < 3 && (
          <p className="alert">Please select at least 3 symptoms.</p>
        )}
        {loading && <div style={{ "margin-top": "40px" }}>Loading....</div>}
        {predictedDisease ? (
          <div className="result-box">
            <br />
            <hr />
            <p className="finalResult">
              On processing your symptoms, it was found that you have developed{" "}
              <strong style={{ "font-size": "18px" }}>
                {predictedDisease}
              </strong>
              .
            </p>
            <p>
              Search on Google :&nbsp;&nbsp;
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  predictedDisease
                )}`}
                target="_blank"
              >
                {predictedDisease}
              </a>
            </p>
            <a
              href={`https://www.google.com/search?q=Doctors+near+me+for+${encodeURIComponent(
                predictedDisease
              )}`}
              target="_blank"
            >
              <button type="button" className="submit-button doctors-around">
                See Doctors around you
              </button>
            </a>
            <div className="disclaimer">
              <h3>Disclaimer : Must Read</h3>
              <p>
                The disease prediction system implemented in this application is
                based on machine learning models and is provided for
                informational purposes only. The predictions generated by the
                system are not intended to replace professional medical advice,
                diagnosis, or treatment.&nbsp;&nbsp;
                {!readMore && (
                  <a
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Read More
                  </a>
                )}
                <br />
                <br />
                {readMore && (
                  <>
                    It is important to note that the predictions are solely
                    based on the symptoms provided and do not take into account
                    individual medical history, patient-specific factors, or
                    laboratory test results. The accuracy of the predictions may
                    vary, and there is a possibility of false positives or false
                    negatives.
                    <br />
                    <br />
                    This system should not be considered as a substitute for
                    consulting with qualified healthcare professionals or
                    seeking medical attention. If you have any concerns about
                    your health or specific symptoms, it is highly recommended
                    to consult a licensed healthcare provider. The developers
                    and providers of this system assume no responsibility or
                    liability for any actions taken based on the predictions or
                    information provided.&nbsp;&nbsp;
                    {readMore && (
                      <a
                        onClick={() => {
                          setReadMore(!readMore);
                        }}
                        style={{ color: "red", cursor: "pointer" }}
                      >
                        {!readMore ? "Read More" : "Read Less"}
                      </a>
                    )}
                  </>
                )}
              </p>
            </div>
            {auth.isLoggedIn && (
              <button
                type="submit"
                className="primary-button"
                onClick={handleSave}
              >
                Save Record
              </button>
            )}
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default Form;
