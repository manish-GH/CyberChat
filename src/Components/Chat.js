import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { Message } from "./Message";
import { useAuth } from "../context/AuthProvider";
import { Modal } from "./Modal";

export const Chat = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [update, setUpdate] = useState(false);
  const [toUpdateMessage, setToUpdateMessage] = useState();

  const { darkMode } = useAuth();
  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
    setNewMessage("");
  };

  const handleUpdate = (message) => {
    if (message.displayName === user.displayName) {
      setUpdate(true);
      setToUpdateMessage(message);

      console.log(message);
    } else {
      setUpdate(false);
    }
  };
  return (
    <div className={darkMode ? null : "dark"}>
      <div className="chat">
        <ul>
          {messages.map((message) => (
            <li key={message.id} onClick={() => handleUpdate(message)}>
              <Message {...message} />
            </li>
          ))}
        </ul>
        {update ? (
          <Modal msg={toUpdateMessage} setUpdate={setUpdate} />
        ) : (
          <form className="new-msg" onSubmit={handleSubmit}>
            <input
              className="new-msg-text"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <span>
              <button
                className="new-msg-btn"
                type="submit"
                disabled={!newMessage}
              >
                Send
              </button>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};
