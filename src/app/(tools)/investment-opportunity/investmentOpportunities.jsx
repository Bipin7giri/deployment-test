"use client";
import { useEffect, useState } from "react";
import Opeaning from "./opening";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import logo from "../../../assets/icon/logo.jpeg";
import { Helmet } from "react-helmet";
import { FiExternalLink, FiSearch } from "react-icons/fi";
import axios from "axios";
import { formatMoney } from "@/utils/formatMoney";

const Investment = () => {
  const colorTyep = {
    Open: ["#EAF9F1", "#1DCE92"],
    Close: ["#FDE5E6", "#FF433D"],
    Closed: ["#FDE5E6", "#FF433D"],
    "Coming Soon": ["#EAF9F1", "#1D73D1"],
  };
  const dispatch = useDispatch();

  const [routeActive, setRouteActive] = useState(0);
  const marketRoutes = [
    "IPO",
    "FPO",
    "Right Share",
    "Debentures",
    "Mutual Fund",
    "Auction",
  ];
  const [key, setKey] = useState("IPO");
  const formattedDate = new Date().toISOString().split("T")[0];

  let finalIpoData = [];

  const { ipoData, auctionData } = useSelector((state) => state.tools);

  let finalAuctionData = auctionData?.data?.map((item, id) => {
    return {
      key: id + 1,
      company_name: item?.symbol,
      auction_type: item?.isPromoter ? "Promoter" : "Ordinary",
      unit: formatMoney(item?.unit),
      issuemanager: item?.issueManager,
      opening_date: (item?.openDate).split("T")[0],
      closing_date: (item?.closeDate).split("T")[0],
      cutoff: item?.cutoff,
      status: item?.Status === "Closed" ? "Close" : "Open",
    };
  });

  let sortedIPOData = [];

  if (ipoData?.data !== undefined) {
    let allIpoData = ipoData?.data?.[key]?.[0]["open"]
      .concat(ipoData?.data[key][1].close)
      .concat(ipoData?.data[key][2]["approved"]);

    finalIpoData = allIpoData
      ?.map((item, id) => {
        let status;
        if (item.openDate <= formattedDate && item.closeDate >= formattedDate) {
          status = "Open";
        } else if (item.closeDate < formattedDate) {
          status = "Closed";
        } else if (item.openDate > formattedDate) {
          status = "Coming Soon";
        }
        return {
          key: id + 1,
          company_name: item?.company_name,
          sector: item.sector,
          unit: formatMoney(item?.unit),
          mutualFundType: item?.mutual_fund_type,
          maturityYear: item?.maturity_year,
          shareValuePerUnit: formatMoney(item?.shareValuePerUnit),
          rightShare: item?.ratio,
          opening_date: item?.openDate,
          closing_date: item?.closeDate,
          status: status,
        };
      })
      .sort((a, b) => new Date(b.closing_date) - new Date(a.closing_date));

    finalIpoData = finalIpoData?.sort((a, b) => {
      if (a.status === "Open") return -1;
      if (a.status === "Coming Soon" && b.status !== "Open") return -1;
      return 1;
    });
  }
  function compareOpeningDates(a, b) {
    const dateA = new Date(a.opening_date);
    const dateB = new Date(b.opening_date);
    return dateA - dateB;
  }

  // Create empty arrays for each status
  const openCompanies = [];
  const comingSoonCompanies = [];
  const closedCompanies = [];

  // Iterate through the companies and categorize them based on status
  sortedIPOData.forEach((company) => {
    if (company.status === "Open") {
      openCompanies.push(company);
    } else if (company.status === "Coming Soon") {
      comingSoonCompanies.push(company);
    } else if (company.status === "Closes") {
      closedCompanies.push(company);
    }
  });

  // Sort each status array based on opening dates
  openCompanies.sort(compareOpeningDates);
  comingSoonCompanies.sort(compareOpeningDates);
  closedCompanies.sort(compareOpeningDates);

  // Concatenate the arrays in the desired order
  const sortedCompanies = openCompanies.concat(
    comingSoonCompanies,
    closedCompanies
  );

  sortedIPOData = sortedCompanies;
  useEffect(() => {
    dispatch(actions.getAllIpoData());
    dispatch(actions.getAuctionData());
  }, []);

  let columns = [
    {
      title: "Name Of Company",
      dataIndex: "company_name",
    },
    //Comparing The Type Of Investment Oppurtnity if they are IPO, Mutual Fund, Right Share or Debenture and showing column based on it
    key === "IPO" || key === "FPO"
      ? {
          title: "Sector",
          dataIndex: "sector",
        }
      : key === "Mutual Fund" || key == "Debentures"
      ? {
          title: "Maturity Year",
          dataIndex: "maturityYear",
        }
      : key === "Right Share"
      ? {
          title: "Ratio",
          dataIndex: "rightShare",
        }
      : {
          title: "Auction Type",
          dataIndex: "auction_type",
        },

    key === "Auction"
      ? {
          title: "Issue Manager",
          dataIndex: "issuemanager",
        }
      : {
          title: "Share Value Per Unit",
          dataIndex: "shareValuePerUnit",
        },
    {
      title: "Units",
      dataIndex: "unit",
    },
    {
      title: "Opening Date",
      dataIndex: "opening_date",
      sorter: (a, b) => new Date(a.opening_date) - new Date(b.opening_date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Closing Date",
      dataIndex: "closing_date",
      sorter: (a, b) => new Date(a.closing_date) - new Date(b.closing_date),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <div
          style={{
            padding: "4px 8px",
            borderRadius: "4px",
            color: colorTyep[status]?.[1],
            textAlign: "left",
          }}
        >
          {status}
        </div>
      ),
    },
  ];

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <title>IPO | Saral Lagani</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          name="description"
          content="Get all the data about IPO, FPO mutual funds and debenture that are opening in NEPSE. Also get the data of closed, opening and upcoming investment oppurtunity"
        />
        <meta
          name="keywords"
          content="IPO NEPAL, FPO NEPAL, Investment Oppurtunity, NEPSE, upcoming IPO, approved IPO, upcoming debenture"
        />
        <meta
          property="og:image"
          src="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta
          property="og:title"
          content="Find All about IPO, FPO For General, Local And Foreign Employnment"
        />
        <meta
          property="og:description"
          content="Get Details about upcoming, closed, approved IPO,FPO that are coming to NEPSE for hydropower, microfinance and other various sector"
        />
        <meta property="og:url" content="https://sarallagani.com" />
      </Helmet>
      <div>
        <div className="bg-[#F4F6F9] lg:px-0 px-[40px]">
          <div className="lg:container w-full lg:px-28 lg:mx-auto py-5 lg:pt-0 pt-44  lg:mt-0 gap-10 px-4 mx-auto">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="lg:text-[20px] font-[600] py-2 pt-[50px] text-[32px]">
                Investment Opportunity
              </p>
              <div className="pt-[50px]">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open("https://meroshare.cdsc.com.np", "_blank");
                    }
                  }}
                  className="flex items-center justify-center px-4 py-2 font hover:bg-gray-800 bg-[#5e6ea7] text-secondary rounded-md"
                >
                  <FiExternalLink className="border-1 lg:text-[20px] xl:text-[24px]  p-1 rounded-full text-secondary linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))" />
                  Apply
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-[35px] mb-[30px] ">
              <div>
                <ul className="flex mb-2 items-center gap-10  ">
                  {marketRoutes.map((route, id) => {
                    return (
                      <>
                        <li
                          key={id}
                          style={{ fontFamily: "poppins" }}
                          className="text-primary    text-[15px] text-3xl hover:bg-blue-100 px-[5px] pt-3 mt-[-12px]  cursor-pointer"
                        >
                          <button
                            onClick={() => {
                              setRouteActive(id);
                              setKey(route);
                              // navigateRoute(route);
                            }}
                            style={{ paddingBottom: "14px" }}
                            className={`${
                              routeActive === route
                                ? "text-black"
                                : "text-[#3A6FF8]"
                            }  text-[24px] xl:text-[18px]`}
                          >
                            {route}
                          </button>
                          {routeActive === id && (
                            <div className="border-[#3A6FF8] ml-[-5px]  w-[115%]  border-b-[3px]"></div>
                          )}
                        </li>
                      </>
                    );
                  })}
                </ul>
                <div className="border-b-[3px] mt-[-11px]  border-[#dadaee]"></div>
              </div>
            </div>
            {routeActive === 0 && (
              <Opeaning columns={columns} data={finalIpoData} />
            )}
            {routeActive === 1 && (
              <Opeaning columns={columns} data={finalIpoData} />
            )}
            {routeActive === 2 && (
              <Opeaning columns={columns} data={finalIpoData} />
            )}
            {routeActive === 3 && (
              <Opeaning columns={columns} data={finalIpoData} />
            )}
            {routeActive === 4 && (
              <Opeaning columns={columns} data={finalAuctionData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Investment;
