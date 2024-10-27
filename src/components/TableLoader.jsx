import React from "react";

const TableLoader = () => {
  return (
    <div>
      {" "}
      <div role="status" className="animate-pulse mt-10 flex flex-col gap-3 ">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-6/12"></div>
        <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-6/12"></div>
        <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>{" "}
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>{" "}
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>{" "}
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default TableLoader;
