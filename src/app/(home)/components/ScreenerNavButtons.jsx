import React from "react";

const ScreenerNavButtons = ({ title, isActive, onClick, rounded }) => {
  return (
    <div>
      <button
        className={`${
          isActive
            ? "bg-black text-secondary"
            : "bg-secondary    text-primary   border border-black"
        } border border-gray-200 w-[400px] lg:w-auto cursor-pointer px-6 py-4 lg:px-4 lg:py-2 lg:text-sm text-4xl 
        leading-5 mr-3 ${
          rounded === "scrennerV2" ? "rounded-md" : "rounded-full"
          }  mb-4 ${title === "Under Valued Stocks" && "w-[500px]"}`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default ScreenerNavButtons;
