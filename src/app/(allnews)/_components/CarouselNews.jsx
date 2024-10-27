/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { calculateTime } from "../../../utils/calculateTime";
import { Helmet } from "react-helmet";
import { useRouter } from "next/navigation";

const CarouselNews = ({
  title,
  shortDescription,
  publishDate,
  thumbnail,
  newsId,
}) => {
  const router = useRouter();
  const fetchNewsDetails = (title, newsId) => {
    const replacedTitle = title.replace(/[% ]/g, "-");
    router.push(`/news/${replacedTitle}?newsId=${newsId}`);
  };
  return (
    <div>
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:url" content="https://news.sarallagani.xyz" />
        {/* Add more metadata properties as needed */}
      </Helmet>
      <div className="bg-[#F4F6F9]">
        <div className="lg:container px-10 lg:w-full mx-auto mt-40 lg:mt-0 pt-[40px]">
          <div
            onClick={() => {
              fetchNewsDetails(title, newsId);
            }}
            className="flex cursor-pointer lg:flex-row flex-col gap-10 items-center "
          >
            <div className="lg:w-[40%] w-[100%] lg:h-[300px] ">
              <img
                className="w-[100%] h-full object-conatin"
                src={`https://news.sarallagani.xyz/${thumbnail}`}
              />
            </div>
            <div className="lg:w-[60%]  lg:py-0 py-5 px-10">
              <div className="flex justify-between">
                <div className="text-[#3815C3] font-semibold text-5xl lg:text-[24px] leading-[1.3] lg:leading-8">
                  {title}
                </div>
              </div>
              <div className="py-3">
                <p className="text-3xl lg:text-[12px]">
                  <span className="pr-5">
                    {calculateTime(publishDate)}{" "}
                    <span className="text-gray-600">ago</span>
                  </span>
                  <span className="text-gray-400">By Sarallagani</span>
                  <span className="block text-xs text-gray-600">
                    {shortDescription}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselNews;
