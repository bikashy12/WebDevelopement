import {createContext} from "react";

export const AuthContext = createContext({
    isLoggedIn : false,
    name : '',
    userId : null,
    token : null,
    login : () => {},
    logout : () => {}
});