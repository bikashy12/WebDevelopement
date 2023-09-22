import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header/Header";
import Home from "./components/Header/Section/Home/Home";
import Service from "./components/Header/Section/Services/Service";
import UserGuide from "./components/Header/Section/Guide/UserGuide";
import FAQ from "./components/Header/Section/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./hooks/auth-context";

function App() {
  const { token, login, logout, userId } = useAuth();
  console.log(token + " From AppJs");
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Header />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
export default App;
