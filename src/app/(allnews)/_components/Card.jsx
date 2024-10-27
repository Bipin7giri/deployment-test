/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import TruncatedText from "./TruncatedText";
import logo from "../../../assets//icon/logo.jpeg";
import { calculateTime } from "../../../utils/calculateTime";
import { useRouter } from "next/navigation";

const Card = ({ title, short_description, publishedAt, thumbnail, newsId }) => {
  const router = useRouter();

  const fetchNewsDetails = (title, newsId) => {
    const replacedTitle = title.replace(/[% ]/g, "-");
    router.push(`/news/${replacedTitle}?newsId=${newsId}`);
  };

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          fetchNewsDetails(title, newsId);
        }}
        className=" cursor-pointer px-2 pb-2  w-full"
      >
        <div className="w-[100%] lg:h-40 p-2">
          <img
            className="object-cover h-full w-full  justify-center"
            src={thumbnail ? thumbnail : `${logo}`}
            alt={title}
          />
        </div>
        <div className="px-3 py-4">
          {/* <div className="font-semibold lg:text-sm mb-2 text-4xl lg:h-[40px] overflow-hidden">
            {title}
          </div> */}
          <p className="lg:text-xs lg:h-8 text-3xl py-1">
            <TruncatedText text={short_description} limit={150} />
          </p>
          <p className="lg:text-[12px] text-2xl pt-8 flex justify-between">
            <span className="text-blue-600">By Sarallagani </span>
            <span className="pr-5 text-blue-600">
              {calculateTime(publishedAt)} <span>ago</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
