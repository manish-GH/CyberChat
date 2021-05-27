import React, { useState } from "react";
import firebaseApp from "../firebase";
import { useAuth } from "../context/AuthProvider";

export const Modal = ({ msg, setUpdate }) => {
  const { darkMode } = useAuth();
  const [updatedMessage, setUpdatedMessage] = useState("");

  console.log(updatedMessage);
  const handleUpdate = (id) => {
    firebaseApp
      .firestore()
      .collection("messages")
      .doc(id)
      .update({ text: updatedMessage });
    setUpdate(false);
  };

  const handleDelete = (id) => {
    firebaseApp.firestore().collection("messages").doc(id).delete();
    setUpdate(false);
  };

  return (
    <div className={darkMode ? null : "dark"}>
      <div className="modal-msg">
        <div className="modal">
          <div className="old-msg">
            <h2>Old Message</h2>
            <p>{msg.text}</p>
          </div>
          <div className="updated-msg">
            <h2>New Message</h2>
            <textarea
              value={updatedMessage}
              onChange={(e) => setUpdatedMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="update-delete-btn">
            <button
              className="update-btn"
              onClick={() => handleUpdate(msg.id)}
              type="submit"
              disabled={!updatedMessage}
            >
              Update
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(msg.id)}
              type="submit"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
