import axios from "axios";
import { createContext,useEffect,useState } from "react";

//need user info (uid) in various components and pages
export const AuthContext = createContext()

//app is the children here
export const AuthContexProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        //JSON.parse gives us object
      JSON.parse(localStorage.getItem("user")) || null
    );
  
    const login = async (inputs) => {
      const res = await axios.post("/auth/login", inputs);
      //user will be parsed to obj
      setCurrentUser(res.data);
    };
  
    const logout = async (inputs) => {
      await axios.post("/auth/logout");
      setCurrentUser(null);
    };
    
    //to change current user so it must be stringified and then usestate will again objectify it
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
  
    return (
      <AuthContext.Provider value={{ currentUser, login, logout }}>
        {children}
      </AuthContext.Provider>
      //app is children and we wrapped it
    );
  };
