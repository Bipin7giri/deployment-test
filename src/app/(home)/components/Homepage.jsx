"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import News from "./News";
import Analysis from "./Analysis";
import Faq from "./Faq";
import Testimonial from "./Testimonial";
import MarketOverview from "./MarketOverview";
import actions from "../../(market)/_redux/actions";
import LiveData from "./LiveData";
import Spinner from "@/components/Spinner";
import TechnicalScreener from "./TechnicalScreener";
import Remotion from "./Remotion";
import Image from "next/image";
import adImage from "../../../../public/assets/img/ad.png";
import { useRouter } from "next/navigation";
import axios from "axios";
import Heatmap from "./Heatmap";

const Home = () => {
  const { marketLiveHomeData, isMarketLiveHomeDataLoading } = useSelector(
    (state) => state.home
  );
  const [isBullMarket, setIsBullMarket] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const router = useRouter();
  // usePageViewTracking();

  useEffect(() => {
    const promocode = window.location.hash.substring(1); // Exclude the hash symbol
    const dataAlreadyexistinLocalStorage = localStorage.getItem(
      "sarallagani_promocode"
    );
    if (!dataAlreadyexistinLocalStorage) {
      localStorage.setItem("sarallagani_promocode", promocode);
    }
  }, []);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const fetchPopup = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://saraladmin.vercel.app/api/popup"
      );
      setPopupData(response.data?.find((item) => item.isActive === true));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(
      actions.getFilterMarketLiveData({
        ltpMin: 0,
        ltpMax: 0,
        marketCapMin: null,
        marketCapMax: null,
        fiftyTwoWeekLow: null,
        fiftyTwoWeekHigh: null,
        sectors: [],
      })
    );
    window.onload = setShowAd(true);
    fetchPopup();
  }, []);

  const nepseData = marketLiveHomeData?.nepseIndex?.find(
    (item) => item.sindex === "NEPSE Index"
  );

  useEffect(() => {
    if (nepseData?.perChange > 0) {
      setIsBullMarket(true);
    } else {
      setIsBullMarket(false);
    }
  }, [nepseData]);


  return (
    <>
      {!isMarketLiveHomeDataLoading ? (
        <div
          className={`${
            isBullMarket ? "bg-green-700" : "bg-red-700"
          } bg-opacity-10`}
        >
          <Banner isBullMarket={isBullMarket} />
          <MarketOverview isBullMarket={isBullMarket} />
          <hr className="mt-0 mb-0"></hr>
          {/* <News /> */}
          {/* <Analysis /> */}
          <LiveData />
          <TechnicalScreener />
          <Remotion />
          <Heatmap />
          {/* <Faq /> */}
          {showAd && popupData !== undefined && popupData !== null && (
            <div
              onClick={() => setShowAd(false)}
              className="fixed w-full h-full inset-0 z-[99] flex justify-center items-center bg-black bg-opacity-70"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (popupData?.link?.length > 0) {
                    router.push(popupData?.link);
                  } else {
                    setShowAd(false);
                  }
                }}
                className="cursor-pointer"
              >
                <Image
                  src={`data:image/png;base64, ${popupData?.previewImage}`}
                  height={2000}
                  width={2000}
                  alt="ad image"
                  className="h-[600px] w-[600px]"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
