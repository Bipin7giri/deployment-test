import { Progress } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSaralRatingDescription, getSaralRatingSummary } from "../helpers";

export const SaralRatingScale = (props) => {
  const { saralRating } = useSelector((state) => state.company);
  const { isLoggedIn } = useSelector((state) => state.auth);

  let ratingPerc, totalRating;

  if (
    saralRating !== null &&
    saralRating !== undefined &&
    saralRating?.data?.length > 0
  ) {
    //add only when ratng ==1
    totalRating = saralRating?.data?.reduce((accumulator, item) => {
      if (item?.rating === 1) {
        return accumulator + 1;
      } else {
        return accumulator;
      }
    }, 0);
    const totalCount = saralRating?.data?.length;
    ratingPerc = ((totalRating / totalCount) * 5).toFixed(2);
  }

  return (
    <>
      <div className="">
        <div className="relative mt-[80px] text-center w-full">
          <div className="text-center flex justify-center">
            <div className="absolute vertical-progress-wrapper inline-block transform -rotate-90 w-[30%] lg:w-[45%] border-[1px] rounded-lg mx-[20px] shadow-sm">
              <Progress
                strokeColor={
                  ratingPerc >= 3.3
                    ? "#52c41a"
                    : ratingPerc >= 1.7 && ratingPerc < 3.3
                    ? "#4096ff"
                    : "#f5222d"
                }
                status="active"
                className="text-[22px] lg:text-[16px]"
                percent={isLoggedIn ? ratingPerc * 20 : 20}
                style={{ height: "50px" }}
              />
            </div>
          </div>
          <div className="absolute text-center w-full mt-[30px] lg:mt-[-20px] xl:mt-[0] 2xl:mt-[26px] pb-5 top-[102px]">
            <p className="text-lg font-[600] top-[102px]">
              {ratingPerc ? ratingPerc : 0}
              <span className="text-gray-500 text-sm"> / 5</span>
            </p>
            <div className="mt-10 pb-5">
              <p className="lg:text-sm text-2xl text-left">
                {getSaralRatingSummary(totalRating, ratingPerc)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
