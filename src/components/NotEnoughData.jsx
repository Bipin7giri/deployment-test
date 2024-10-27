import React from "react";
// import { FaExclamationTriangle } from "react-icons/fa";
const NotEnoughData = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Not Enough Data
        </h2>
        <p className="text-gray-600">
          Sorry we couldnt find any data to display.
        </p>
      </div>
    </div>
  );
};
export default NotEnoughData;
