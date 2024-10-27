"use client";

import fullscreenImage from "../../assets/pages/economy.png";
import React from "react";
import LoginLock from "../auth/LoginLock";
// import "./FullscreenImage.css"; // Import the CSS file for styling

const EconomyLockPage = () => {
  LoginLock();
  return (
    <div className="fullscreen-image-container">
      <img
        src={fullscreenImage}
        alt="Fullscreen"
        className="fullscreen-image"
      />
    </div>
  );
};

export default EconomyLockPage;
