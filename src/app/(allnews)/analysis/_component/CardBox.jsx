"use client";
import React from "react";

const CardBox = () => {
  return (
    <div>
      <div className="flex items-start gap-3">
        <div>
          <img
            className="w-auto lg:h-28 h-48"
            src="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2020/07/breakingnews-live-blog-1568185450-1595123397-1595467633.jpg"
            alt=""
          />
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
