"use client";
import { Tooltip } from "antd";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
// import NotificationPopup from "@/components/NotificationPopup";
const NotificationPopup = dynamic(
  () => import("@/components/NotificationPopup"),
  { ssr: false }
);

const AlertButton = ({ symbol, buttonClassName }) => {
  const [showAlertBox, setShowAlertBox] = useState(false);
  const handleClick = () => {
    setShowAlertBox(true);
  };

  useEffect(() => {
    if (showAlertBox) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showAlertBox]);

  return (
    <>
      <Tooltip title="Add Alert">
        <button
          onClick={() => handleClick()}
          className={`${buttonClassName} hover:bg-primary text-primary hover:text-secondary font-bold flex items-center`}
        >
          <FaBell />
        </button>
      </Tooltip>
      {showAlertBox && (
        <NotificationPopup symbol={symbol} setShowAlertBox={setShowAlertBox} />
      )}
    </>
  );
};

export default AlertButton;
