"use client";
import React from "react";

const DetailCard = () => {
  return (
    <div>
      <div className=" w-full bg-secondary     my-5  rounded-md shadow-lg">
        <img
          className="lg:w-full w-full  lg:selection:h-auto"
          src="https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-3 py-4">
          <p className="lg:text-[12px] text-[28px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
