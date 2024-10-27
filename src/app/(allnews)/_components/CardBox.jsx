"use client";
import React from "react";
import logo from "../../../assets/icon/logo.png";

const CardBox = () => {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="">
          <img className="w-full h-full" src={logo} alt="img" />
        </div>
        <div className="flex flex-col justify-between leading-normal">
          <h5 className="mb-2 lg:text-base  text-4xl  font-semibold tracking-tight text-gray-900 dark:text-secondary">
            Noteworthy technology acquisitions 2021 Here are the biggest
          </h5>
          <p className="mb-3 font-normal lg:text-xs  text-2xl  dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardBox;