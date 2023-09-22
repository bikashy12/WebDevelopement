import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header/Header";
import Footer from "./components/Footer/Footer";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./hooks/auth-context";
import { useState } from "react";

function App() {
  const [userName, setUserName] = useState("");
  const { token, name, login, logout, userId } = useAuth();

  function handleUserLogin(username) {
    console.log("Setting username from Appjs");
    setUserName(username);
    console.log(userName + "from Appjs");
    console.log("After username from Appjs");
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        name: userName,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Header setUserName={handleUserLogin} />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
export default App;
