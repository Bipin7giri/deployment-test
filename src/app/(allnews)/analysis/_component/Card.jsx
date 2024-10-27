"use client";
import React from "react";
import logo from "../../../../assets/icon/logo.png";
import { useRouter } from "next/navigation";
import TruncatedText from "../../_components/TruncatedText";
import { calculateTime } from "@/utils/calculateTime";

const Card = ({ title, thumbnail, shortDescription, date, analysisid }) => {
  const router = useRouter();
  const fetchNewsDetails = () => {
    router.push(`/analysis/${analysisid}`);
  };
  return (
    <div>
      <div
        onClick={() => {
          fetchNewsDetails();
        }}
        className=" cursor-pointer  w-full bg-secondary     my-5  rounded-md shadow-sm"
      >
        <div className="lg:w-full w-[70%] lg:h-40 p-4 flex lg:mx-0 mx-[100px] ">
          <img
            className="object-contain h-full w-full  justify-center"
            src={thumbnail ? thumbnail : logo}
            alt="thumbnail"
          />
        </div>
        <div className="px-3 py-4">
          <div className="font-semibold lg:text-sm mb-2 text-4xl lg:h-[40px] overflow-hidden">
            {title}
          </div>
          <p className="lg:text-xs lg:h-8 text-3xl py-1">
            <TruncatedText text={shortDescription} limit={150} />
          </p>
          <p className="lg:text-[12px] text-2xl pt-8 flex justify-between">
            <span className="pr-5">
              {calculateTime(date)} <span className="text-gray-700">ago</span>
            </span>

            <span className="text-gray-400">By Sarallagani</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
