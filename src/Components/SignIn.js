import React from "react";
import firebase from "firebase";
import firebaseApp from "../firebase";
import { useAuth } from "../context/AuthProvider";

export const SignIn = () => {
  const { darkMode } = useAuth();

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      await firebaseApp.auth().signInWithPopup(provider);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className={darkMode ? null : "dark"}>
      <div className="signIn-container">
        <div className="signIn">
          <h2 className="signIn-head">Cyber Chat</h2>
          <p className="signIn-main">
            The easiest way to chat with people all around the world.
          </p>
          <button className="signIn-btn" onClick={signInWithGoogle}>
            <img
              className="logo"
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
              alt="google-logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
