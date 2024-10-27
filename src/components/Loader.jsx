import React from "react";
// import { FaExclamationTriangle } from "react-icons/fa";
const Loader = () => {
  return (
    <div className="container flex items-center mx-auto justify-center lg:h-[100vh]">
      <div className="animate-spin mt-[-100px] rounded-full h-16 w-16 border-t-4 border-black border-opacity-50"></div>
    </div>
  );
};

export default Loader;
