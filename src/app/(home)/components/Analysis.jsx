/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api, { newsApi, strapiBaseURl } from "../../../api/axios";

import HomeInvestOppurtunity from "./HomeInvestOppurtunity";
import HomeBrokerInfo from "./HomeBrokerInfo";

import logo from "../../../assets/icon/logo.png";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/app/(tools)/_redux/action";

const formattedDate = new Date().toISOString().split("T")[0];

const Analysis = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState(null);
  const [sellers, setSellers] = useState(null);

  const { ipoData } = useSelector((state) => state.tools);

  useEffect(() => {
    dispatch(actions.getAllIpoData());
  }, []);

  const [key, setKey] = useState("IPO");
  const IPA = [
    { label: "IPO", value: "IPO" },
    { label: "FPO", value: "FPO" },
    { label: "Right", value: "Right Share" },
    { label: "Debentures", value: "Debentures" },
    { label: "Mutual Fund", value: "Mutual Fund" },
  ];
  const broker = [
    { label: "Top Buy Broker", value: "topBuy" },
    { label: "Top Sell Broker", value: "topSell" },
  ];

  const [routeActive, setRouteActive] = useState(0);
  const [brokerRoute, setBrokerRoute] = useState(0);
  let finalIpoData = [];
  let latestOpenIpo = [];
  if (ipoData?.data !== undefined) {
    let allIpoData = ipoData?.data[key][0]["open"]
      .concat(ipoData?.data[key][1].close)
      .concat(ipoData?.data[key][2]["approved"]);

    finalIpoData = allIpoData.map((item, id) => {
      let status;
      if (item.openDate <= formattedDate && item.closeDate >= formattedDate) {
        status = "Open";
      } else if (item.closeDate < formattedDate) {
        status = "Close";
      } else if (item.openDate > formattedDate) {
        status = "Coming Soon";
      }
      return {
        key: id + 1,
        company_name: item?.company_name,
        sector: item.sector,
        unit: item?.unit,
        mutualFundType: item?.mutual_fund_type,
        maturityYear: item?.maturity_year,
        issueManager: item?.issueManager,
        rightShare: item?.ratio,
        opening_date: item?.openDate,
        closing_date: item?.closeDate,
        status: status,
      };
    });
    finalIpoData = finalIpoData.sort((a, b) => {
      if (a.status === "Open") return -1;
      if (a.status === "Coming Soon" && b.status !== "Open") return -1;
      return 1;
    });
    finalIpoData.filter((item, id) => {
      if (item.status === "Open" || item.status === "Coming Soon") {
        latestOpenIpo.push(item);
      }
    });
  }

  const weeklyTopBuyers = async () => {
    try {
      const res = await api.get(
        `/floorsheet/broker_breakdown/top_five_by_buyer`
      );
      if (res) {
        setBuyers(res?.data?.data?.today);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const weeklyTopSellers = async () => {
    try {
      const res = await api.get(
        `/floorsheet/broker_breakdown/top_five_by_seller`
      );
      if (res) {
        setSellers(res?.data?.data?.today);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    weeklyTopBuyers();
    weeklyTopSellers();
  }, []);

  const getNewsData = () => {
    setLoading(true);
    newsApi
      .get(
        `/analyses?pagination[page]=1&pagination[pageSize]=4&populate=thumbnail&sort[0][publishedAt]=desc`
      )
      .then((res) => {
        setLoading(false);
        setAnalysis(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getNewsData();
  }, []);

  const fetchAnalysisDetails = (id) => {
    router.push(`/analysis/${id}`);
  };

  return (
    <>
      <div
        style={{ marginBottom: "30px" }}
        className="lg:container lg:px-8 lg:mx-auto flex lg:flex-row flex-col py-5 lg:mt-0 gap-10 px-4 mx-auto"
      >
        <div className="lg:w-[75%] shadow-md mx-6 lg:mx-0 px-10 lg:px-5 bg-secondary rounded-[20px] py-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-[500] text-[32px] lg:text-[18px]">Analysis</p>
            </div>
            <div>
              <button className="ease-in duration-300  text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary py-1">
                <Link href="/analysis"> View More </Link>
              </button>
            </div>
          </div>
          {analysis?.length > 0 ? (
            <div className="grid lg:grid-cols-1 grid-cols-1">
              {analysis?.map((data, id) => {
                return (
                  <>
                    <div
                      onClick={() => {
                        fetchAnalysisDetails(data?.id);
                      }}
                      key={id}
                      className="flex gap-6 lg:py-4 pt-10 cursor-pointer pr-[20px]"
                    >
                      <div className=" w-[30%] mx-auto h-[60%] lg:w-[20%] lg:h-[100px] ">
                        <img
                          className="w-full h-full object-contain"
                          src={
                            data?.attributes?.thumbnail?.data === null
                              ? logo
                              : strapiBaseURl +
                                data?.attributes?.thumbnail?.data?.attributes
                                  ?.formats?.thumbnail?.url
                          }
                          alt={data?.attributes?.title}
                        />
                      </div>
                      <div className="lg:w-[80%] w-[70%]">
                        <div className="flex flex-col lg:flex-row">
                          <h5 className="lg:text-[18px] text-[32px] capitalize font-[500]">
                            {data?.attributes?.title}
                          </h5>
                        </div>
                        <div className="flex mt-3 lg:mt-0 lg:gap-48 gap-80  py-2 lg:py-0 items-center">
                          <div className="flex items-center gap-3">
                            <div className="text-gray-500 text-[28px] lg:text-[14px]">
                              <AiOutlineCalendar className="text-[24px] lg:text-[14px]" />
                            </div>
                            <div className="flex">
                              <div className="lg:text-xs  text-[24px]  text-gray-500">
                                {data?.attributes?.publishedAt?.split("T")[0]}
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div>
                          <p className="lg:text-[12px] text-[28px] py-3 text-gray-700 lg:h-[68px] h-[90px] overflow-hidden">
                            {data?.attributes?.short_description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })}
            </div>
          ) : (
            ["", "", "", ""].map((item) => {
              return (
                <>
                  <Skeleton paragraph={{ rows: 3 }} />
                </>
              );
            })
          )}
        </div>

        <div className="lg:w-[40%]">
          <div className="rounded-[20px] bg-secondary shadow-md">
            <div className="flex p-5 justify-between items-center">
              <div>
                <p className="font-[500] text-[32px] lg:text-[18px]">
                  Investment Opportunity
                </p>
              </div>
              <div>
                <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary py-1">
                  <Link href="/investment-opportunity">View More</Link>
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-[15px] mb-[15px] px-5">
              <div>
                <ul className="flex mb-2 items-center">
                  {IPA?.map((route, id) => {
                    return (
                      <>
                        <li key={id} style={{ fontFamily: "poppins" }}>
                          <div>
                            <button
                              onClick={() => {
                                setRouteActive(id);
                                setKey(route?.value);
                              }}
                              className={`${
                                routeActive === id
                                  ? "bg-black text-secondary"
                                  : "bg-secondary text-primary border border-black"
                              } border border-gray-200 w-[200px] font-semibold lg:w-auto cursor-pointer px-2 py-4 lg:px-4 lg:py-2 lg:text-xs text-2xl leading-5 mr-3 rounded-full mb-4`}
                            >
                              {route?.label}
                            </button>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
            {routeActive === 0 && (
              <HomeInvestOppurtunity latestOpenIpo={latestOpenIpo} />
            )}
            {routeActive === 1 && (
              <HomeInvestOppurtunity latestOpenIpo={latestOpenIpo} />
            )}
            {routeActive === 2 && (
              <HomeInvestOppurtunity latestOpenIpo={latestOpenIpo} />
            )}
            {routeActive === 3 && (
              <HomeInvestOppurtunity latestOpenIpo={latestOpenIpo} />
            )}
          </div>

          <div className="rounded-[20px] bg-secondary mt-[20px] shadow-md">
            <div className="flex p-5 justify-between items-center">
              <div>
                <p className="font-[500] text-[32px] lg:text-[18px]">
                  Broker Information
                </p>
              </div>
              <div>
                <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary py-1">
                  <Link href="/broker/1">View More</Link>
                </button>
              </div>
            </div>
            <div className="flex justify-between lg:mt-[10px] mt-[25px] lg:mb-[10px] mb-[25px] px-5">
              <div>
                <ul className="flex items-center">
                  {broker?.map((route, id) => {
                    return (
                      <>
                        <li key={id} style={{ fontFamily: "poppins" }}>
                          <div>
                            <button
                              onClick={() => {
                                setBrokerRoute(id);
                              }}
                              className={`${
                                brokerRoute === id
                                  ? "bg-black text-secondary"
                                  : "bg-secondary text-primary border border-black"
                              } border border-gray-200 font-semibold w-[200px] lg:w-auto cursor-pointer px-2 py-4 lg:px-4 lg:py-2 lg:text-xs text-2xl leading-5 mr-3 rounded-full mb-4`}
                            >
                              {route?.label}
                            </button>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
            {brokerRoute === 0 && <HomeBrokerInfo data={buyers} />}
            {brokerRoute === 1 && <HomeBrokerInfo data={sellers} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
