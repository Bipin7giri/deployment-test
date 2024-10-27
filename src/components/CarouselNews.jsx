/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { Helmet } from "react-helmet";
import { useRouter } from "next/navigation";
import { calculateTime } from "@/utils/calculateTime";

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
      <div className="relative rounded-md overflow-hidden">
        {/* Background blur effect */}
        <div
          onClick={() => {
            fetchNewsDetails(newsId);
          }}
          className="cursor-pointer relative"
        >
          <div className="relative w-full h-[500px]">
            <img
              className="w-full h-full object-cover"
              src={`https://news.sarallagani.xyz/${thumbnail}`}
              alt="News Thumbnail"
            />
            <div className="absolute bottom-0 inset-x-0 p-5 z-10 bg-black bg-opacity-50 backdrop-blur-md">
              <div className="text-[#fff] font-semibold text-5xl lg:text-[24px] leading-[1.3] lg:leading-8">
                {title}
              </div>
              <div className="py-3 text-[#fff]">
                <p className="text-3xl lg:text-[12px]">
                  <span className="pr-5">
                    {calculateTime(publishDate)}{" "}
                    <span className="text-[#fff]">ago</span>
                  </span>
                  <span className="text-[#fff]">By Sarallagani</span>
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
