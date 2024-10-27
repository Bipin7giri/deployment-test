"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { FaXmark } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import { TopGainers } from "./TopGainers";
import { StockBasicInfo } from "./StockBasicInfo";
import BrokerInfo from "./BrokerInfo";
import WatchList from "./WatchList";
import News from "./News";
import UnselectedLiveDataIcon from "../../../../public/assets/icon/live-data-unselected.svg";
import SelectedLiveDataIcon from "../../../../public/assets/icon/live-data-selected.svg";
import UnselectedWatchlistIcon from "../../../../public/assets/icon/watchlist-unselected.svg";
import SelectedWatchlistIcon from "../../../../public/assets/icon/watchlist-selected.svg";
import UnselectedGainerIcon from "../../../../public/assets/icon/gainer-unselected.svg";
import SelectedGainerIcon from "../../../../public/assets/icon/gainer-selected.svg";
import UnselectedBrokerIcon from "../../../../public/assets/icon/broker-unselected.svg";
import SelectedBrokerIcon from "../../../../public/assets/icon/broker-selected.svg";
import UnselectedNewsIcon from "../../../../public/assets/icon/news-unselected.svg";
import SelectedNewsIcon from "../../../../public/assets/icon/news-selected.svg";
import UnselectedFloorsheetIcon from "../../../../public/assets/icon/floorsheet-unselected.svg";
import SelectedFloorsheetIcon from "../../../../public/assets/icon/floorsheet-selected.svg";
import UnselectedChatIcon from "../../../../public/assets/icon/chat-unselected.svg";
import SelectedChatIcon from "../../../../public/assets/icon/chat-selected.svg";

const TVChartContainer = dynamic(
  () =>
    import("@/components/TVChartContainer").then((mod) => mod.TVChartContainer),
  { ssr: false }
);
import { useSearchParams } from "next/navigation";
import {
  setChoosedTechinicalSector,
  setChoosedTechinicalSymbol,
} from "@/app/(market)/_redux/marketSlice";
import { disabledCompanies } from "@/utils/disableCompanies";
import Floorsheet from "@/app/company/[id]/component/FloorSheet";
import { Tooltip } from "antd";
import { BiChat } from "react-icons/bi";
import Chat from "./chat";
import NepseIndex from "./NepseIndex";
import Image from "next/image";

export default function TechnicalChart() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isChartExpanded, setIsChartExpanded] = useState(true);
  const [symbol, setSymbol] = useState(null);
  const [routeActive, setRouteActive] = useState(0);
  const [contentToShow, setContentToShow] = useState(null);
  const { choosedTechnicalSymbol } = useSelector((state) => state.market);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (symbol !== undefined && symbol !== null) {
      const formatedSymbol = disabledCompanies.includes(symbol);
      if (!formatedSymbol) {
        dispatch(setChoosedTechinicalSymbol(symbol));
        dispatch(setChoosedTechinicalSector(null));
      } else {
        dispatch(setChoosedTechinicalSector(symbol));
        dispatch(setChoosedTechinicalSymbol(null));
      }
    } else {
      dispatch(setChoosedTechinicalSymbol("1"));
      dispatch(setChoosedTechinicalSector(null));
    }
  }, [symbol]);

  useEffect(() => {
    setSymbol(searchParams.get("symbol"));
  }, [searchParams]);

  const handleChartToggle = (id) => {
    if (routeActive !== id) {
      setIsChartExpanded(true);
      setRouteActive(id);
    } else {
      setIsChartExpanded(!isChartExpanded);
    }
  };

  const technicalRoute = [
    {
      title: "Live Data",
      icon: routeActive === 0 ? SelectedLiveDataIcon : UnselectedLiveDataIcon,
    },
    {
      title: "Watchlist",
      icon: routeActive === 1 ? SelectedWatchlistIcon : UnselectedWatchlistIcon,
    },
    {
      title: "Gainer & Loser",
      icon: routeActive === 2 ? SelectedGainerIcon : UnselectedGainerIcon,
    },
    {
      title: "Broker",
      icon: routeActive === 3 ? SelectedBrokerIcon : UnselectedBrokerIcon,
    },
    {
      title: "News",
      icon: routeActive === 4 ? SelectedNewsIcon : UnselectedNewsIcon,
    },
    {
      title: "Floorsheet",
      icon:
        routeActive === 5 ? SelectedFloorsheetIcon : UnselectedFloorsheetIcon,
    },
    {
      title: "Chat",
      icon: routeActive === 6 ? SelectedChatIcon : UnselectedChatIcon,
    },
  ];

  useEffect(() => {
    const newContentToShow =
      choosedTechnicalSymbol !== undefined &&
      choosedTechnicalSymbol !== null &&
      choosedTechnicalSymbol === "1" ? (
        <NepseIndex />
      ) : (
        <StockBasicInfo />
      );
    setContentToShow(newContentToShow);
  }, [choosedTechnicalSymbol]);

  return (
    <div className=" flex w-full overflow-x-hidden  !h-[105vh]">
      <div
        className={`chart overflow-y-hidden ${
          isChartExpanded ? "w-[74vw]" : "w-[97vw]"
        }`}
      >
        <Script
          src="/static/datafeed/udf/dist/bundle.js"
          strategy="lazyOnload"
          onReady={() => {
            setIsScriptReady(true);
          }}
        />
        {isScriptReady && (
          <TVChartContainer
            symbol={symbol}
            setSymbol={setSymbol}
            height="h-[100vh]"
            enableFeatures={["side_toolbar_in_fullscreen_mode"]}
            search={null}
          />
        )}
      </div>
      <div
        className={`fixed top-0 right-0 h-screen extra-setting ${
          isChartExpanded
            ? "w-[26vw] overflow-y-scroll  "
            : "w-[3vw] overflow-y-hidden"
        } transition-all duration-300 flex border-l-[6px] border-[#e0e3eb] overflow-x-hidden `}
      >
        <div className="sticky top-10 technical-tv-chart w-[2.8vw] mt-[60px] cursor-pointer ">
          <div>
            <ul className="flex flex-col justify-center items-center gap-[30px] px-3">
              {technicalRoute?.map((route, id) => (
                <li
                  key={id}
                  onClick={() => handleChartToggle(id)}
                  className={`text-primary cursor-pointer`}
                >
                  <Tooltip title={route.title}>
                    <button
                      onClick={() => setRouteActive(id)}
                      className={` rounded-lg
                        ${routeActive === id ? "bg-green-500" : "bg-none"}`}
                    >
                      <span
                        className={`${
                          routeActive === id ? "text-white" : "text-[black]"
                        }`}
                      >
                        <Image
                          src={route.icon}
                          height={200}
                          width={200}
                          alt="icon"
                          className="p-1 max-w-10 h-10"
                        />
                      </span>
                    </button>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`${
            isChartExpanded ? "w-[22vw]" : ""
          } bg-secondary pb-[20px] flex flex-col items-end`}
        >
          <div className="w-full pt-[20px] sticky top-0 bg-white z-10 flex justify-end shadow-md">
            <button
              onClick={() => setIsChartExpanded(false)}
              className="m-4 text-xl"
            >
              <FaXmark />
            </button>
          </div>
          <div className="w-full">
            {routeActive === 0 && contentToShow}
            {routeActive === 1 && <WatchList />}
            {routeActive === 2 && <TopGainers />}
            {routeActive === 3 && <BrokerInfo />}
            {routeActive === 4 && <News />}
            {routeActive === 5 && <Floorsheet symbol={symbol} />}
            {routeActive === 6 && <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
}
