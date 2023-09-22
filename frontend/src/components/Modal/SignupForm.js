import React, { useState, useContext } from "react";
import "./Modal.css";
import { AuthContext } from "../../hooks/auth-context";

const SignupForm = ({onClose}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          age: age,
          email: email,
          password: password,
        }),
      });
      const responseData = await response.json();
      auth.login(responseData.userId, responseData.token);
      
      if(responseData.token){
        onClose();
        console.log("Signup successful");
      }else{
        console.log("Signup Failed!!!")
      }
    } catch (err) {
      console.log(err);
    }

    setName("");
    setAge("");
    setEmail("");
    setPassword("");
  };



  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="false"
        />
      </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
