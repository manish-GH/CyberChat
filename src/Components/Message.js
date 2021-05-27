import React from "react";
import { formatRelative } from "date-fns";
import { useAuth } from "../context/AuthProvider";

export const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  const { darkMode } = useAuth();

  return (
    <div className={darkMode ? null : "dark"}>
      <div className="message">
        {photoURL ? (
          <img
            className="display-pic"
            src={photoURL}
            alt="Avatar"
            width={45}
            height={45}
          />
        ) : null}
        <div>
          <div className="display-info">
            {displayName ? <p className="display-name">{displayName}</p> : null}
            {createdAt ? (
              <span className="display-time">
                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
              </span>
            ) : null}
          </div>
          <p className="display-text">{text}</p>
        </div>
      </div>
    </div>
  );
};
