"use client";
import api from "@/api/axios";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillLock } from "react-icons/ai";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import actions from "../redux/actions";
import screenerActions from "@/app/(screener)/_redux/actions";
import Image from "next/image";
import logo from "../../../../public/assets/icon/logo.png";

const StockTab = ({ isBullMarket }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector((state) => state.auth);
  const { watchlistData, fearGreedData } = useSelector((state) => state.home);
  const { priceUpVolumeUpData, priceDownVolumeUpData, screenerLoading } =
    useSelector((state) => state.screener);
  const tabs = ["Watchlist", "Greed", "Fear"];
  const [selectedTab, setSelectedTab] = useState("Watchlist");
  const [stock, setStock] = useState([]);

  //fetched data dynamically for tab
  useEffect(() => {
    switch (selectedTab) {
      case "Watchlist":
        isLoggedIn && dispatch(actions.getWatchlistData({ currentUser }));
        break;
      case "Greed" || "Fear":
        dispatch(actions.getFearGreedData());
        break;
      // case "Pumped":
      //   dispatch(screenerActions.priceUpVolumeUpData());
      //   break;
      // case "Dumped":
      //   dispatch(screenerActions.priceDownVolumeUpData());
      //   break;
      // case "Saral Pick":
      //   dispatch(actions.getSaralPickData());
      //   break;
    }
  }, [selectedTab]);

  //set stock dynamically
  useEffect(() => {
    switch (selectedTab) {
      case "Watchlist":
        setStock(watchlistData);
        break;
      case "Greed":
        setStock(
          fearGreedData
            .map((item) => ({ ...item }))
            ?.sort((a, b) => b.percent - a.percent)
        );
        break;
      case "Fear":
        setStock(
          fearGreedData
            .map((item) => ({ ...item }))
            ?.sort((a, b) => a.percent - b.percent)
        );
        break;
      // case "Pumped":
      //   setStock(priceUpVolumeUpData);
      //   break;
      // case "Dumped":
      //   setStock(priceDownVolumeUpData);
      //   break;
      // case "Saral Pick":
      //   setStock(saralPickData);
      //   break;
    }
  }, [
    selectedTab,
    watchlistData,
    fearGreedData,
    // priceUpVolumeUpData,
    // priceDownVolumeUpData,
  ]);

  return (
    <div className="lg:w-[60%] w-[80%] flex flex-col items-center gap-6 py-5">
      <div className="flex justify-center w-full">
        <div
          className={`${
            isBullMarket ? "bg-green-100" : "bg-red-100"
          } flex gap-10 justify-center py-1 px-8`}
        >
          {tabs.map((item, id) => (
            <button
              key={id}
              onClick={() => setSelectedTab(item)}
              className={`lg:text-xl text-[26px] font-semibold ${
                selectedTab === item
                  ? isBullMarket
                    ? "text-green-700 border-b-2 border-green-700"
                    : "text-red-700 border-b-2 border-red-700"
                  : "text-black"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-4 flex-wrap justify-center items-center">
        {selectedTab !== "Watchlist" &&
          (!screenerLoading ? (
            stock?.length > 0 ? (
              stock?.slice(0, 7).map((item, id) => (
                <>
                  <div
                    key={id}
                    className="flex gap-10 justify-between bg-white py-2 px-3 rounded-full"
                  >
                    <div
                      className="flex gap-2 cursor-pointer"
                      onClick={() => {
                        router.push(`/company/${item?.symbol}`);
                      }}
                    >
                      <img
                        src={`${
                          `https://peridotnepal.xyz/company_logo/${item?.symbol}.webp`
                            ? `https://peridotnepal.xyz/company_logo/${item?.symbol}.webp`
                            : logo
                        } `}
                        onError={(e) => {
                          e.target.src = logo;
                        }}
                        alt={item.symbol}
                        className="size-[20px] rounded-full"
                      />
                      <h3 className="text-lg font-medium text-info">
                        {item.symbol}
                      </h3>
                    </div>
                    <span className="text-sm font-semibold">
                      <p>{item.lastTradedPrice}</p>
                      <p
                        className={`${
                          item.perChange >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.schange} ({item.perChange?.toFixed(2)} %)
                      </p>
                    </span>
                  </div>
                  {stock?.slice(0, 7).length - 1 === id && (
                    <Link
                      // href={`${
                      //   selectedTab === "Greed" || selectedTab === "Fear"
                      //     ? "/fear-greed"
                      //     : "/priceVolume"
                      // }`}
                      href="/fear-greed"
                      className={`${
                        isBullMarket ? "bg-success" : "bg-danger"
                      } text-white size-9 flex items-center justify-center rounded-full`}
                    >
                      <FaChevronRight className="text-xl" />
                    </Link>
                  )}
                </>
              ))
            ) : (
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-medium">No stock found</p>
              </div>
            )
          ) : (
            <div className="font-semibold text-lg">Data Loading...</div>
          ))}
        {selectedTab === "Watchlist" &&
          (isLoggedIn ? (
            !screenerLoading ? (
              stock?.length > 0 ? (
                stock?.slice(0, 7).map((item, id) => (
                  <>
                    <div
                      key={id}
                      className="flex gap-10 justify-between bg-white py-2 px-3 rounded-full"
                    >
                      <div
                        className="flex gap-2 cursor-pointer"
                        onClick={() => {
                          router.push(`/company/${item?.symbol}`);
                        }}
                      >
                        <img
                          src={`${
                            `https://peridotnepal.xyz/company_logo/${item?.symbol}.webp`
                              ? `https://peridotnepal.xyz/company_logo/${item?.symbol}.webp`
                              : logo
                          } `}
                          onError={(e) => {
                            e.target.src = logo;
                          }}
                          alt={item.symbol}
                          className="size-[20px] rounded-full"
                        />
                        <h3 className="text-lg font-medium text-info">
                          {item.symbol}
                        </h3>
                      </div>
                      <span className="text-sm font-semibold">
                        <p>{item.lastTradedPrice}</p>
                        <p
                          className={`${
                            item.perChange >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {item.schange} ({item.perChange?.toFixed(2)} %)
                        </p>
                      </span>
                    </div>
                    {stock?.slice(0, 7).length - 1 === id && (
                      <Link
                        href="/watchlist"
                        className={`${
                          isBullMarket ? "bg-success" : "bg-danger"
                        } text-white size-9 flex items-center justify-center rounded-full`}
                      >
                        <FaChevronRight className="text-xl" />
                      </Link>
                    )}
                  </>
                ))
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-lg font-medium">
                    No stock found on your watchlist
                  </p>
                  <Link
                    href="/watchlist"
                    className="py-1 px-2 bg-black text-white"
                  >
                    Add Now
                  </Link>
                </div>
              )
            ) : (
              <div className="font-semibold text-lg">Data Loading...</div>
            )
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="py-1 px-3 bg-black text-white rounded-2xl font-medium flex items-center gap-2"
              >
                Log in
                <AiFillLock />
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default StockTab;
