"use client";
import React from "react";

const TruncatedText = ({ text, limit }) => {
  const truncateText = (text, limit) => {
    if (text?.length <= limit) {
      return text;
    }
    return text?.slice(0, limit) + "...";
  };

  const containerStyle = {
    height: "100px",
    overflow: "hidden",
  };

  return <div style={containerStyle}>{truncateText(text, limit)}</div>;
};

export default TruncatedText;
