import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  name: "Welcome",
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
