"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "./SearchInput";
import TodaysPick from "./TodaysPick";
import actions from "../redux/actions";
import StockTab from "./StockTab";
const Banner = ({ isBullMarket }) => {
  const { marketLiveHomeData } = useSelector((state) => state.home);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  return (
    <div
      className={`flex mt-28 py-28 lg:mt-0 flex-col items-center justify-center relative`}
    >
      <div className="banner-content relative w-full">
        <div className="search !max-w-full">
          <h1 className="text-black font-serif font-bold  lg:py-0 pt-10 !text-[42px] lg:!text-[3rem]">
            Search Your{" "}
            <span
              className={`${isBullMarket ? "text-green-800" : "text-red-800"}`}
            >
              Favorite Stock
            </span>
          </h1>
          <div>
            <SearchInput
              isBanner={true}
              isBullMarket={isBullMarket}
              companies={marketLiveHomeData?.liveData}
            />
          </div>
        </div>
        <StockTab isBullMarket={isBullMarket} />
      </div>
    </div>
  );
};
export default Banner;
