import React from "react";
import firebaseApp from "../firebase";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { useAuth } from "../context/AuthProvider";

export const Navbar = (props) => {
  const { darkMode, setDarkMode } = useAuth();

  const btn = props.btn;

  const signOut = async () => {
    try {
      await firebaseApp.auth().signOut();
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="sticky">
      <div className={darkMode ? null : "dark"}>
        <div className="navbar">
          <h1>Cyber Chat</h1>
          <div className="action-btns">
            {darkMode ? (
              <Brightness7Icon className="sun" onClick={handleClick} />
            ) : (
              <Brightness4Icon className="moon" onClick={handleClick} />
            )}
            {btn ? (
              <button className="signOut-btn" onClick={signOut}>
                Sign out
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
