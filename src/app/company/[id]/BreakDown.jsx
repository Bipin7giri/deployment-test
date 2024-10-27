import React, { useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineInfoCircle,
  AiFillLock,
  AiOutlineMinus,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import BreakDownChart from "../../../components/Charts/BreakDownChart";
import BreakDownPieChart from "../../../components/Charts/BreakDownPieChart";
import { formatMoney } from "../../../utils/formatMoney";
import BarChart from "./component/BarChart";
import IncomeBreakdownBarChart from "./component/IncomeBreakdownBarChart";
import DoubleLineChart from "./component/DoubleLIneChart";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Tag, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../../api/axios";
import MarketInformationCompare from "./component/MarketInformationCompare";
import actions from "./redux/actions";
import { StackedLineChart } from "./component/StackedLineChart";
import { SaralRatingText } from "./component/SaralRatingText";
import DummyPieChart from "./component/DummyPieChart";
import { GiMoneyStack } from "react-icons/gi";
import CompaniesMutualFundStatus from "./component/CompaniesMutualFundStatus";
import homeActions from "./../../(home)/redux/actions";
import { formatYear } from "../../../utils/formatYear";
import PERatio from "./component/PERatio";

const BreakDown = ({ sector }) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);
  const { sectorWiseRecentYearsQuater } = useSelector((state) => state.home);
  const {
    company,
    quickSypnosisList,
    marketSharesLoan,
    marketSharesDepost,
    productWiseData,
    allRatios,
    isCompanyloading,
    isChartLoading,
    currentQuarter,
    mutualFundsHoldingsByStock,
    lifeInsurancePremium,
    camelRatingIndividual,
    altMan,
    companyProductwiseLoan,
  } = useSelector((state) => state.company);

  const [routeActive, setRouteActive] = useState(0);
  const [isSuscribeHover, setIsSuscribehover] = useState(false);

  // sorting data for financial for life-insurance
  let sortedData = {};
  const data = allRatios?.companyBarChart;
  let allYears = new Set();
  for (let key in data) {
    data[key]?.forEach((item) => {
      let year = Object.keys(item)[0];
      allYears?.add(year);
    });
  }
  allYears = Array?.from(allYears)
    ?.map(Number)
    ?.sort((a, b) => a - b);

  for (let key in data) {
    sortedData[key] = allYears?.map((year) => {
      let item = data[key]?.find((item) => item[year]);
      return item ? { [year]: item[year]?.toFixed(2) } : {};
    });
  }
  // recentyear
  useEffect(() => {
    dispatch(
      homeActions.sectorwiseRecentYearQuater({
        sector: company?.[0]?.sectorName,
      })
    );
  }, [company?.[0]?.sectorName]);

  // const [currentQuarter, setcurrentQuarter] = useState();

  // useEffect(() => {
  //   const apiEndpoint1 = '/financial_breakdown/deposit/compare';
  //   const apiEndpoint2 = '/financial_breakdown/loan/compare';

  //   // Request bodies for the API calls
  //   const requestBody = {
  //     "symbols": selectedCheckboxes,
  //     "sector": sector
  //   }

  //   // Create an array of promise functions that make the API calls
  //   const apiPromises = [
  //     api.post(apiEndpoint1, requestBody),
  //     api.post(apiEndpoint2, requestBody)
  //   ];
  //   // Use Promise.all to execute the promises concurrently
  //   Promise.allSettled(apiPromises)
  //     .then((responses) => {
  //       // console.log(responses[0].data);
  //       // console.log(responses[1].data);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));

  // }, [selectedCheckboxes])

  useEffect(() => {
    if (company[0]?.sectorName === "Life Insurance") {
      dispatch(actions.getLifeInsurancePremium({ symbol: company[0]?.symbol }));
    }
  }, [company]);

  useEffect(() => {
    if (
      (sector === "Development Banks" ||
        sector === "Commercial Banks" ||
        sector === "Finance") &&
      isLoggedIn
    ) {
      dispatch(
        actions.getCompanyProductwiseLoan({ symbol: company[0]?.symbol })
      );
    }
  }, [company]);

  let productWiseResult = [];
  if (
    companyProductwiseLoan !== null &&
    companyProductwiseLoan !== undefined &&
    companyProductwiseLoan?.data?.length > 0
  ) {
    productWiseResult = companyProductwiseLoan?.data?.map((item) => {
      const { symbol, period, ...rest } = item;
      const cleanedItem = {};
      for (let key in rest) {
        cleanedItem[key] =
          rest[key] === " -   "
            ? 0
            : parseFloat(rest[key]?.replace(/\s/g, "")?.replace(/,/g, ""));
      }
      let transformedArray = Object?.keys(cleanedItem)?.map((key) => {
        return { name: key, value: cleanedItem[key] };
      });
      return transformedArray;
    });
  }

  const saralRatingRoutes = ["Saral Rating", "Quick Synopsis"];

  const boldPercentage = (text) => {
    const depositText = text;
    const boldPercentage = (text) => {
      const regex = /(\d+(\.\d+)?%)/g;
      return text?.replace(regex, "<strong>$&</strong>");
    };
    const formattedText = boldPercentage(depositText);
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  const handlePaidFeature = () => {
    Router.push(`/subscription-plan`);
  };
  const navigateLogin = () => {
    Router.push(`/login`);
  };

  let camelRatingValue;
  if (camelRatingIndividual !== undefined && camelRatingIndividual !== null) {
    camelRatingValue = camelRatingIndividual?.data?.reduce(
      (total, currentItem) => {
        return (total + currentItem.value) / 5;
      },
      0
    );
  }

  // fake data
  const [fakeData, setFakeData] = useState([]);
  const symbols = [
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
    "NABIL",
  ];

  useEffect(() => {
    // Generate random data for the table
    const generateRandomData = () => {
      const newData = [];
      for (let i = 0; i < 20; i++) {
        // You can change the number of rows as needed
        const investedSymbol =
          symbols[Math.floor(Math.random() * symbols.length)]; // Select a random symbol from the array
        const unitDifference = Math.floor(Math.random() * 1000); // Generate a random number of shares
        const shareValue = (Math.random() * 100).toFixed(2); // Generate a random share value with 2 decimal places
        newData.push({ investedSymbol, unitDifference, shareValue });
      }
      setFakeData(newData);
    };
    generateRandomData();
  }, []);

  // logic for removing the duplicate Quick Synopsis starts
  const uniqueTitles = new Set();

  const newArray = quickSypnosisList?.dataList?.filter((obj) => {
    if (!uniqueTitles.has(obj.title)) {
      uniqueTitles.add(obj.title);
      return true;
    }
    return false;
  });

  return (
    <div className="w-full">
      {quickSypnosisList && Object.keys(quickSypnosisList).length === 0 ? (
        <>
          <div className="flex  flex-col items-center justify-center h-screen">
            <svg
              className="h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM10 20v-2m0 0V6m0 2h4m-4 10h4m-4-8h4"
              ></path>
            </svg>
            <h2 className="mt-2 text-xl font-medium text-gray-900">
              No Data Found
            </h2>
            <p className="mt-1 text-gray-500">
              Please Navgate to Other Tab To View More On This Stock.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
            <div className="flex justify-between items-center pb-[30px] ">
              <h1 className="text-2xl font-bold lg:text-lg uppercase">
                Quick Synopsis
              </h1>
              <p>
                <Tag color="cyan">
                  as of {quickSypnosisList?.quarter}, {quickSypnosisList?.year}{" "}
                </Tag>
              </p>
            </div>
            <div className="flex lg:flex-row flex-col gap-5">
              <div className="grid lg:w-[100%]  lg:grid-cols-3 grid-cols-1 gap-6">
                {isLoggedIn ? (
                  <>
                    {newArray?.map((syp, id) => {
                      if (syp) {
                        return (
                          <>
                            <div key={syp?.id} className="flex gap-5">
                              <div>
                                {syp && syp.is_good == 1 ? (
                                  <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                ) : syp.is_good == 2 ? (
                                  <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                ) : (
                                  <AiOutlineMinus className="text-secondary  bg-info lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                )}
                              </div>
                              <div>
                                <div className="flex items-start gap-2">
                                  <h1 className="lg:text-sm text-2xl font-semibold">
                                    {syp?.title}
                                  </h1>
                                  <Tooltip
                                    className="cursor-pointer"
                                    title={
                                      syp?.qs_description +
                                      ` (${syp?.performance})`
                                    }
                                  >
                                    <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                  </Tooltip>
                                </div>
                                <div>
                                  <span className="lg:text-sm text-2xl font-extralight">
                                    {boldPercentage(syp?.description)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                    })}
                  </>
                ) : (
                  <>
                    {quickSypnosisList?.dataList
                      ?.slice(0, 3)
                      ?.map((syp, id) => {
                        if (syp) {
                          return (
                            <>
                              <div key={id} className="flex gap-5">
                                <div>
                                  {syp && syp.is_good == 1 ? (
                                    <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                  ) : syp && syp.is_good == 2 ? (
                                    <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                  ) : (
                                    <AiOutlineMinus className="text-secondary  bg-info lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-start gap-2">
                                    <h1 className="lg:text-sm text-2xl font-semibold">
                                      {syp?.title}
                                    </h1>
                                    <Tooltip
                                      className="cursor-pointer"
                                      title={
                                        syp?.qs_description +
                                        ` (${syp?.performance})`
                                      }
                                    >
                                      <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                    </Tooltip>
                                  </div>
                                  <div>
                                    <span className="lg:text-sm text-2xl font-extralight">
                                      {boldPercentage(syp?.description)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                    <div className="relative mb-24 flex  flex-col">
                      <div className="flex justify-center  w-[800px] lg:w-[1100px] 2xl:w-[1300px] ">
                        <Link className="z-20" href="/login">
                          <button className="bg-primary hover:bg-primary-2 font-serif mt-24 lg:mt-8 w-28 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center">
                            Log in
                            <span className="text-secondary text-3xl lg:text-xl ml-2">
                              <AiFillLock />
                            </span>
                          </button>
                        </Link>
                      </div>
                      <div
                        className="absolute grid w-auto  lg:w-[1100px] 2xl:w-[1300px]  lg:grid-cols-3 grid-cols-1 py-5 gap-6 inset-0 border-[2px] bg-[#ffffff] opacity-40"
                        style={{ filter: "blur(3px)" }}
                      >
                        {quickSypnosisList?.dataList
                          ?.slice(0, 3)
                          ?.map((syp, id) => {
                            if (syp) {
                              return (
                                <>
                                  <div key={id} className="flex gap-5">
                                    <div>
                                      {syp && syp.is_good == 1 ? (
                                        <AiOutlineCheck className="bg-success text-secondary  lg:text-2xl text-4xl  p-1 rounded-full font-semibold " />
                                      ) : syp.is_good == 2 ? (
                                        <RxCross2 className="text-secondary  bg-danger lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                      ) : (
                                        <AiOutlineMinus className="text-secondary  bg-info lg:text-2xl text-4xl   p-1 rounded-full font-semibold " />
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex items-start gap-2">
                                        <h1 className="lg:text-sm text-2xl font-semibold">
                                          {syp?.title}
                                        </h1>
                                        <Tooltip
                                          className="cursor-pointer"
                                          title={
                                            syp?.qs_description +
                                            ` (${syp?.performance})`
                                          }
                                        >
                                          <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                        </Tooltip>
                                      </div>
                                      <div>
                                        <span className="lg:text-sm text-2xl font-extralight">
                                          {boldPercentage(syp?.description)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <PERatio />

          <MarketInformationCompare sector={sector} />

          {sector === "Life Insurance" ||
          sector === "Non Life Insurance" ||
          sector === "Development Banks" ||
          sector === "Commercial Banks" ||
          sector === "Finance" ? (
            <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
              {is_subscribed ? (
                <>
                  <div className="relative w-[100%] flex lg:flex-row flex-col gap-10 justify-between">
                    <div className="lg:w-[50%] w-[100%]">
                      <div>
                        <div className="flex justify-between">
                          {sector === "Life Insurance" ||
                          sector === "Non Life Insurance" ? (
                            <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                              Sector wise Premium
                            </p>
                          ) : (
                            <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                              Sector wise loan
                            </p>
                          )}
                          {productWiseData?.length > 0 && (
                            <div>
                              <Tag color="cyan" className="lg:text-sm text-2xl">
                                as of {productWiseData?.[0]?.time}
                              </Tag>
                            </div>
                          )}
                        </div>
                        <div className="md:flex justify-center">
                          <BreakDownPieChart chartData={productWiseData} />
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-[50%] w-[100%]">
                      {sector === "Life Insurance" ? (
                        <>
                          <div className="">
                            <div className="flex justify-between items-center pb-[30px]">
                              <div className="w-full flex justify-between">
                                <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                                  Business Segment
                                </p>
                                <div className="text-center">
                                  <Tag
                                    color="cyan"
                                    className="lg:text-sm text-2xl capitalize font-[500]"
                                  >
                                    in lakh
                                  </Tag>
                                </div>
                              </div>
                            </div>
                            <div>
                              <StackedLineChart data={lifeInsurancePremium} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {sector === "Development Banks" ||
                          sector === "Commercial Banks" ||
                          sector === "Finance" ? (
                            <>
                              <div className="">
                                <div className="flex justify-between items-center pb-[30px]">
                                  <div className="flex justify-between w-full">
                                    <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                                      Product Wise Loan
                                    </p>
                                    {companyProductwiseLoan?.data?.length >
                                      0 && (
                                      <div>
                                        <Tag
                                          color="cyan"
                                          className="lg:text-sm text-2xl"
                                        >
                                          as of{" "}
                                          {
                                            companyProductwiseLoan?.data?.[0]
                                              ?.period
                                          }
                                        </Tag>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="md:flex justify-center">
                                  <BreakDownPieChart
                                    chartData={productWiseResult?.[0]}
                                  />
                                </div>
                              </div>
                            </>
                          ) : (
                            <> </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[100%] flex lg:flex-row flex-col gap-10 justify-between">
                    <div className="lg:w-[50%] w-[100%]">
                      <div className="">
                        <div className="relative mb-24 flex flex-col min-h-[300px]">
                          <div className="flex justify-center w-[800px] lg:w-[1100px] 2xl:w-[1300px]">
                            {/* <Link className="z-20" href="/subscription-plan">
                                        <button className="bg-primary hover:bg-primary-2 font-serif mt-24 lg:mt-36 w-28 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center">
                                          Log in
                                          <span className="text-secondary text-3xl lg:text-xl ml-2">
                                            <AiFillLock />
                                          </span>
                                        </button>
                                      </Link> */}

                            {/* remove this */}
                            <Link
                              className="z-20 mt-28"
                              href="/subscription-plan"
                            >
                              <button className="bg-primary m-4 hover:bg-primary-2 font-serif lg:mt-8 w-44 lg:w-32 text-secondary rounded-full py-1 cursor-pointer lg:text-sm text-2xl flex items-center justify-center">
                                Subscribe
                                <span className="text-secondary text-3xl lg:text-xl ml-2">
                                  <AiFillLock />
                                </span>
                              </button>
                            </Link>
                            {/* remove this */}
                            {/* <div className="cursor-pointer z-[99]">
                                    <Tooltip
                                      title="Suscribe SaralLagani for this feature"
                                      className="flex gap-2 mt-24 lg:mt-36"
                                    >
                                      <button
                                        className="bg-primary hover:bg-primary-2 font-serif lg:w-44 w-12 text-secondary rounded-full py-1 cursor-pointer lg:text-sm text-2xl flex items-center justify-center"
                                        onClick={() => {
                                          handlePaidFeature();
                                        }}
                                        onMouseOver={() =>
                                          setIsSuscribehover(true)
                                        }
                                        onMouseOut={() =>
                                          setIsSuscribehover(false)
                                        }
                                      >
                                        Subscribe
                                        {isSuscribeHover && (
                                          <div className="text-secondary">
                                            {" "}
                                            <GiMoneyStack className="text-2xl text-secondary" />{" "}
                                          </div>
                                        )}
                                      </button>
                                    </Tooltip>
                                  </div> */}
                          </div>
                          <div
                            className="absolute py-5 gap-6 bg-[#ffffff] opacity-40 w-full"
                            style={{ filter: "blur(3px)" }}
                          >
                            <div className="flex justify-between w-full">
                              <div className="lg:w-full w-1/2">
                                {sector === "Life Insurance" ||
                                sector === "Non Life Insurance" ? (
                                  <>
                                    <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                                      Sector wise Premium
                                    </p>
                                  </>
                                ) : (
                                  <div className="flex justify-between items-end ">
                                    <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                                      Sector wise loan
                                    </p>
                                  </div>
                                )}
                                <DummyPieChart />
                              </div>
                              <div className="lg:w-full w-1/2">
                                {sector === "Life Insurance" ||
                                sector === "Non Life Insurance" ? (
                                  <>
                                    <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                                      Business Segment
                                    </p>
                                  </>
                                ) : (
                                  <div className="flex justify-between items-end ">
                                    <p className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                                      Sector wise loan
                                    </p>
                                  </div>
                                )}
                                <DummyPieChart />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="lg:w-[50%] w-[100%]">
                                {sector === "Life Insurance" ? (
                                  <>
                                    <div className="">
                                      <div className="flex justify-between items-center pb-[30px]">
                                        <p className="uppercase text-xl lg:text-lg font-[500]">
                                          Business Segment
                                        </p>
                                        <p className="text-[14px] capitalize text-primary font-[600]">
                                          in lakh
                                        </p>
                                      </div>
                                      <div>
                                        <StackedLineChart
                                          data={lifeInsurancePremium}
                                        />
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div> */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <></>
          )}

          {
            <div className="relative bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
              <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[20px]">
                Mutual Funds Holdings
              </h2>
              {mutualFundsHoldingsByStock?.data?.length > 0 && (
                <div className="absolute top-6 right-8 block">
                  <Tag color="cyan" className="lg:text-sm text-2xl">
                    as of {mutualFundsHoldingsByStock?.data?.[0]?.period}
                  </Tag>
                </div>
              )}
              {is_subscribed ? (
                <div className="w-[100%] flex lg:flex-row flex-col gap-16 justify-between">
                  <div className="bg-secondary lg:w-[50%] w-[100%]">
                    <div className="suggestions-list max-h-[400px] overflow-y-scroll">
                      <table className="table w-[100%] table-fixed">
                        <thead className="sticky top-0 bg-[#000] text-[#fff] rounded-t-lg">
                          <tr>
                            <th className="px-4 lg:text-sm text-[24px] py-2 rounded-tl-xl">
                              SYMBOL
                            </th>
                            <th className="px-4 lg:text-sm text-[24px] py-2">
                              No of Share
                            </th>
                            <th className="px-4 lg:text-sm text-[24px] py-2 rounded-tr-xl">
                              Share Value
                            </th>
                            {/* <th className="px-4 lg:text-sm text-[24px py-2 rounded-tr-xl">Weightage</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {mutualFundsHoldingsByStock?.data?.length > 0 ? (
                            mutualFundsHoldingsByStock?.data?.map(
                              (item, id) => (
                                <tr
                                  className={
                                    (id + 1) % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={item?.id}
                                >
                                  <td className="text-center py-2">
                                    <Link
                                      href={`/company/${item?.invested_symbol}`}
                                      className="hover:text-BlueInfo"
                                    >
                                      {item?.symbol}
                                    </Link>
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    {formatMoney(item?.units)}
                                  </td>
                                  <td className=" px-4 py-2 text-GreenSuccess">
                                    {formatMoney(item?.total)}
                                  </td>
                                  {/* <td className=" px-4 py-2 text-GreenSuccess">
                                {formatMoney(((item?.units) / (item?.stock_equity_value)) * 100)}%
                              </td> */}
                                </tr>
                              )
                            )
                          ) : (
                            <tr className="text-center">
                              <td colSpan="3">No Data Available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-secondary lg:w-[50%] w-[100%]">
                    <CompaniesMutualFundStatus />
                  </div>
                </div>
              ) : (
                <div className="relative mb-24 flex flex-col min-h-[300px] overflow-y-hidden">
                  <div className="flex justify-center">
                    {/* remove this */}
                    <Link className="z-20 mt-28" href="/subscription-plan">
                      <button className="bg-primary m-4 hover:bg-primary-2 font-serif lg:mt-8 w-44 lg:w-32 text-secondary rounded-full py-1 cursor-pointer lg:text-sm text-2xl flex items-center justify-center">
                        Subscribe
                        <span className="text-secondary text-3xl lg:text-xl ml-2">
                          <AiFillLock />
                        </span>
                      </button>
                    </Link>
                    {/* remove this */}
                    {/* <div className="cursor-pointer z-[99]">
                        <Tooltip
                          title="Suscribe SaralLagani for this feature"
                          className="flex gap-2 mt-24 lg:mt-36"
                        >
                          <button
                            className="bg-primary hover:bg-primary-2 font-serif lg:w-44 w-12 text-secondary rounded-full py-1 cursor-pointer lg:text-sm text-2xl flex items-center justify-center"
                            onClick={() => {
                              handlePaidFeature();
                            }}
                            onMouseOver={() => setIsSuscribehover(true)}
                            onMouseOut={() => setIsSuscribehover(false)}
                          >
                            Subscribe
                            {isSuscribeHover && (
                              <div className="text-secondary">
                                {" "}
                                <GiMoneyStack className="text-2xl text-secondary" />{" "}
                              </div>
                            )}
                          </button>
                        </Tooltip>
                      </div> */}
                  </div>
                  <div
                    className="absolute py-5 gap-6 bg-[#ffffff] opacity-40"
                    style={{ filter: "blur(3px)" }}
                  >
                    <div className="w-[100%] flex gap-16 justify-between">
                      <div className="bg-secondary w-[50%]">
                        <div className="max-h-[400px] overflow-y-scroll">
                          <table className="table w-[100%] table-fixed">
                            <thead className="sticky top-0 bg-[#000] text-[#fff] rounded-t-lg">
                              <tr>
                                <th className="px-4 lg:text-sm text-[16px] py-2 rounded-tl-xl">
                                  SYMBOL
                                </th>
                                <th className="px-4 lg:text-sm text-[16px] py-2">
                                  No of Share
                                </th>
                                <th className="px-4 lg:text-sm text-[16px] py-2 rounded-tl-xl">
                                  Share Value
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {fakeData.map((item, index) => (
                                <tr
                                  className={
                                    index % 2 === 0
                                      ? "text-center text-[24px] lg:text-sm"
                                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                                  }
                                  key={index}
                                >
                                  <td className="text-center py-2">
                                    <span className="hover:text-BlueInfo">
                                      {item.investedSymbol}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2">
                                    {item.unitDifference}
                                  </td>
                                  <td className="px-4 py-2 text-GreenSuccess">
                                    {item.shareValue}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="bg-secondary w-[50%]">
                        <CompaniesMutualFundStatus fakeData={fakeData} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          }

          {allRatios[0] !== "no data" && (
            <>
              {sector != "Others" && (
                <>
                  <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
                    {!isChartLoading ? (
                      <>
                        <div className="flex justify-between">
                          <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                            Financials
                          </h2>
                          <p>
                            <Tag color="cyan" className="lg:text-sm text-2xl">
                              {" "}
                              as of {formatYear(quickSypnosisList?.year)}{" "}
                            </Tag>
                          </p>
                        </div>
                        <div className="lg:grid lg:grid-cols-10  lg:min-h-[45vh]   gap-4">
                          {sector === "Development Banks" ||
                          sector === "Micro Finance" ||
                          sector === "Finance" ||
                          sector === "Finance" ||
                          sector === "Commercial Banks" ? (
                            <>
                              <div className="lg:col-span-10 xl:col-span-5 pr-5">
                                <BarChart
                                  deposit={marketSharesDepost?.depositData}
                                  loan={marketSharesLoan?.loanData}
                                  legend={["Deposit", "Loan"]}
                                />
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                          <div className="lg:col-span-10 xl:col-span-5 pl-5">
                            <IncomeBreakdownBarChart
                              companyBarChart={sortedData}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <Skeleton paragraph={{ rows: 10 }} />
                    )}
                  </div>
                </>
              )}

              {/* Profitability */}
              <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
                {!isChartLoading ? (
                  <>
                    <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                      Profitablility
                    </h2>
                    <div className="lg:grid lg:grid-cols-6 gap-4">
                      <div className="lg:col-span-6 xl:col-span-2  ">
                        <div className="">
                          <BreakDownChart
                            lineData={allRatios?.returnonEquity}
                          />
                        </div>
                        <div className="text-center">
                          <p>
                            <span className="text-xl  font-semibold">
                              {allRatios?.returnonEquity?.datas?.[
                                allRatios?.returnonEquity?.datas?.length - 1
                              ] || 0}
                              %
                            </span>{" "}
                            <span className="lg:text-sm text-xl font-medium">
                              [as of{" "}
                              {formatYear(
                                allRatios?.returnonEquity?.years?.[
                                  allRatios?.returnonEquity?.datas?.length - 1
                                ]
                              )}
                              ] ({currentQuarter})]
                            </span>
                          </p>
                          <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                            Return on Equity
                          </p>
                        </div>
                      </div>

                      <div className=" pb-5 px-4 lg:col-span-6 xl:col-span-2  ">
                        <div>
                          <BreakDownChart
                            lineData={allRatios?.returnonAssets}
                          />
                        </div>
                        <div className="text-center  ">
                          <p>
                            <span className="text-xl font-semibold">
                              {
                                allRatios?.returnonAssets?.datas?.[
                                  allRatios?.returnonAssets?.datas?.length - 1
                                ]
                              }
                              %
                            </span>{" "}
                            <span className="lg:text-sm text-xl font-medium">
                              [as of{" "}
                              {formatYear(
                                allRatios?.returnonAssets?.years?.[
                                  allRatios?.returnonAssets?.datas?.length - 1
                                ]
                              )}
                              ]
                            </span>
                          </p>
                          <p className="pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                            Return on Asset
                          </p>
                        </div>
                      </div>
                      {sector === "Life Insurance" ||
                      sector === "Non Life Insurance" ? (
                        <>
                          <div className=" pb-5 px-4  col-span-2  ">
                            <div>
                              <BreakDownChart
                                lineData={allRatios?.combinedRatio}
                              />
                            </div>
                            <div className="text-center  ">
                              <p>
                                <span className="text-xl font-semibold">
                                  {(
                                    allRatios?.combinedRatio?.datas?.[
                                      allRatios?.combinedRatio.datas.length - 1
                                    ] || 0
                                  ).toFixed(2)}
                                  %
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  [as of{" "}
                                  {formatYear(
                                    allRatios?.combinedRatio?.years?.[
                                      allRatios?.combinedRatio?.datas.length - 1
                                    ]
                                  )}
                                  {/* ({currentQuarter})] */}
                                </span>
                              </p>
                              <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                Combined Ratio
                              </p>
                            </div>
                          </div>

                          <div className=" pb-5 px-4 col-span-2">
                            <div>
                              <BreakDownChart
                                lineData={allRatios?.returnOnInvestment}
                              />
                            </div>
                            <div className="text-center">
                              <p>
                                <span className="text-xl font-semibold">
                                  {(
                                    allRatios?.returnOnInvestment?.datas?.[
                                      allRatios?.returnOnInvestment?.datas
                                        ?.length - 1
                                    ] || 0
                                  ).toFixed(2)}
                                  %
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  [as of{" "}
                                  {formatYear(
                                    allRatios?.returnOnInvestment?.years?.[
                                      allRatios?.returnOnInvestment?.datas
                                        ?.length - 1
                                    ]
                                  )}
                                  ({currentQuarter})]
                                </span>
                              </p>
                              <p className="pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                Return on Investment
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      {sector === "Hydro Power" ||
                      sector === "Manufacturing And Processing" ||
                      sector === "Hotel And Tourism" ? (
                        <>
                          <div className=" pb-5 px-4 lg:col-span-6 xl:col-span-2">
                            <div className="">
                              <BreakDownChart
                                lineData={allRatios?.returnOnCapitalEmployed}
                              />
                            </div>
                            <div className="text-center">
                              <p>
                                <span className="text-xl font-semibold">
                                  {(
                                    allRatios?.returnOnCapitalEmployed?.datas?.[
                                      allRatios?.returnOnCapitalEmployed?.datas
                                        ?.length - 1
                                    ] ||
                                    0 ||
                                    0
                                  ).toFixed(2)}
                                  %
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  [as of{" "}
                                  {formatYear(
                                    allRatios?.returnOnCapitalEmployed?.years?.[
                                      allRatios?.returnOnCapitalEmployed?.datas
                                        ?.length - 1
                                    ]
                                  )}
                                  ({currentQuarter})]
                                </span>
                              </p>
                              <p className="pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                Return on Capital Employed
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {sector === "Hydro Power" && (
                        <>
                          <div className=" pb-5 px-4 lg:col-span-6 xl:col-span-2   ">
                            <div className="">
                              <BreakDownChart
                                lineData={allRatios?.grossProfit}
                              />
                            </div>
                            <div className="text-center">
                              <p>
                                <span className="text-xl font-semibold">
                                  {(
                                    allRatios?.grossProfit?.datas?.[
                                      allRatios?.grossProfit?.datas?.length - 1
                                    ] || 0
                                  ).toFixed(2)}
                                  %
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  [as of{" "}
                                  {formatYear(
                                    allRatios?.grossProfit?.years?.[
                                      allRatios?.grossProfit?.datas?.length - 1
                                    ]
                                  )}
                                  ({currentQuarter})]
                                </span>
                              </p>
                              <p className="pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                Gross Profit Margin
                              </p>
                            </div>
                          </div>
                          <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2   ">
                            <div className="">
                              <BreakDownChart
                                lineData={allRatios?.operationProfitMargin}
                              />
                            </div>
                            <div className="text-center  ">
                              <p>
                                <span className="text-xl font-semibold">
                                  {(
                                    allRatios?.operationProfitMargin?.datas?.[
                                      allRatios?.operationProfitMargin?.datas
                                        ?.length - 1
                                    ] || 0
                                  ).toFixed(2)}
                                  %
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  [as of{" "}
                                  {formatYear(
                                    allRatios?.operationProfitMargin?.years?.[
                                      allRatios?.operationProfitMargin?.datas
                                        ?.length - 1
                                    ]
                                  )}
                                  ({currentQuarter})]
                                </span>
                              </p>
                              <p className="pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                Operating Profit Margin
                              </p>
                            </div>
                          </div>
                          <div className=" pb-5 px-4 lg:col-span-6 xl:col-span-2">
                            <div className="">
                              <BreakDownChart
                                lineData={allRatios?.netProfitMargin}
                              />
                            </div>
                            <div className="text-center  ">
                              <p>
                                <span className="text-xl font-semibold">
                                  {(
                                    allRatios?.netProfitMargin?.datas?.[
                                      allRatios?.netProfitMargin?.datas
                                        ?.length - 1
                                    ] || 0
                                  ).toFixed(2)}
                                  %
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  [as of{" "}
                                  {formatYear(
                                    allRatios?.netProfitMargin?.years?.[
                                      allRatios?.netProfitMargin?.datas
                                        ?.length - 1
                                    ]
                                  )}
                                  ({currentQuarter})]
                                </span>
                              </p>
                              <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                Net Profit Margin
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <Skeleton paragraph={{ rows: 10 }} />
                )}
              </div>

              {sector === "Development Banks" ||
              sector === "Micro Finance" ||
              sector === "Finance" ||
              sector === "Finance" ||
              sector === "Commercial Banks" ? (
                <>
                  {(allRatios?.npl?.datas?.length > 0 ||
                    allRatios?.costOfFunds?.datas?.length > 0 ||
                    allRatios?.interestSpread?.datas?.length > 0) && (
                    <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px] mb-[40px]">
                      <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                        Ratios
                      </h2>
                      <div className="lg:grid lg:grid-cols-6 gap-4">
                        {sector === "Micro Finance" ||
                        sector === "Development Banks" ||
                        sector === "Finance" ||
                        sector === "Commercial Banks" ? (
                          <>
                            {allRatios?.npl?.datas?.length > 0 && (
                              <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2  ">
                                <div className="">
                                  <BreakDownChart lineData={allRatios?.npl} />
                                </div>
                                <div className="text-center  ">
                                  <p>
                                    <span className="text-xl font-semibold">
                                      {(allRatios?.npl &&
                                      allRatios?.npl.datas &&
                                      allRatios?.npl.datas.length > 0
                                        ? allRatios?.npl.datas?.[
                                            allRatios?.npl?.datas?.length - 1
                                          ]
                                        : 0
                                      ).toFixed(2)}
                                      %
                                    </span>{" "}
                                    <span className="lg:text-sm text-xl font-medium">
                                      [as of{" "}
                                      {formatYear(
                                        allRatios?.npl?.years?.[
                                          allRatios?.npl?.datas?.length - 1
                                        ]
                                      )}
                                      ({currentQuarter})]
                                    </span>
                                  </p>
                                  <p className="pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                    Non Performing Loan
                                  </p>
                                </div>
                              </div>
                            )}
                            {allRatios?.costOfFunds?.datas?.length > 0 && (
                              <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2  ">
                                <div className="">
                                  <BreakDownChart
                                    lineData={allRatios?.costOfFunds}
                                  />
                                </div>
                                <div className="text-center  ">
                                  <p>
                                    <span className="text-xl font-semibold">
                                      {(
                                        allRatios?.costOfFunds?.datas?.[
                                          allRatios?.costOfFunds?.datas
                                            ?.length - 1
                                        ] ?? 0
                                      ).toFixed(2)}
                                      %
                                    </span>{" "}
                                    <span className="lg:text-sm text-xl font-medium">
                                      [as of{" "}
                                      {formatYear(
                                        allRatios?.costOfFunds?.years?.[
                                          allRatios?.costOfFunds?.datas
                                            ?.length - 1
                                        ]
                                      )}
                                      ({currentQuarter})]
                                    </span>
                                  </p>
                                  <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                    Cost of Funds
                                  </p>
                                </div>
                              </div>
                            )}
                            {allRatios?.interestSpread?.datas?.length > 0 && (
                              <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2  ">
                                <div className="">
                                  <BreakDownChart
                                    lineData={allRatios?.interestSpread}
                                  />
                                </div>
                                <div className="text-center  ">
                                  <p>
                                    <span className="text-xl font-semibold">
                                      {(
                                        allRatios?.interestSpread?.datas?.[
                                          allRatios?.interestSpread?.datas
                                            ?.length - 1
                                        ] || 0
                                      ).toFixed(2)}
                                      %
                                    </span>{" "}
                                    <span className="lg:text-sm text-xl font-medium">
                                      [as of{" "}
                                      {formatYear(
                                        allRatios?.interestSpread?.years?.[
                                          allRatios?.interestSpread?.datas
                                            ?.length - 1
                                        ]
                                      )}
                                      ({currentQuarter})]
                                    </span>
                                  </p>
                                  <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                    Interest Spread
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}

              {/* Valuation  */}
              <div className="bg-secondary px-9 py-5 shadow-md rounded-[20px]">
                {!isChartLoading ? (
                  <>
                    <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                      Valuation
                    </h2>
                    <div className="lg:grid lg:grid-cols-6 gap-4">
                      <div className="lg:col-span-6 xl:col-span-2   ">
                        {/* <p className="pt-3 pl-3 uppercase font-semibold">Market Cap</p> */}
                        <div className="">
                          <BreakDownChart lineData={allRatios?.marketCap} />
                        </div>
                        <div className="text-center ">
                          <p>
                            <span className="text-xl font-semibold">
                              Rs.{" "}
                              {formatMoney(
                                allRatios?.marketCap?.datas?.[
                                  allRatios?.marketCap?.datas?.length - 1
                                ]?.toFixed(0)
                              )}
                            </span>{" "}
                            <span className="lg:text-sm text-xl font-medium">
                              {" "}
                              [as of{" "}
                              {formatYear(
                                allRatios?.marketCap?.years?.[
                                  allRatios?.marketCap?.datas?.length - 1
                                ]
                              )}
                              ({currentQuarter})]
                            </span>
                          </p>
                          <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                            Market Cap
                          </p>
                        </div>
                      </div>
                      <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2    ">
                        {/* <p className="pt-3 pl-3 uppercase font-semibold">P/E Ratio</p> */}
                        <div>
                          <BreakDownChart lineData={allRatios?.peRatio} />
                        </div>
                        <div className="text-center ">
                          <p>
                            <span className="text-lg font-semibold">
                              {allRatios?.peRatio?.datas?.[
                                allRatios?.peRatio?.datas?.length - 1
                              ]?.toFixed(2)}{" "}
                              x
                            </span>{" "}
                            <span className="lg:text-sm text-xl font-medium">
                              [as of{" "}
                              {formatYear(
                                allRatios?.peRatio?.years?.[
                                  allRatios?.peRatio?.datas?.length - 1
                                ]
                              )}{" "}
                              ({currentQuarter})]
                            </span>
                          </p>
                          <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                            Price to Earnings
                          </p>
                        </div>
                      </div>

                      <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2  ">
                        {/* <p className="pt-3 pl-3 uppercase font-semibold">Assets Turn Over</p> */}
                        <div>
                          <BreakDownChart lineData={allRatios?.pricetoBook} />
                        </div>
                        <div className="text-center ">
                          <p>
                            <span className="text-xl font-semibold">
                              <span className="text-lg font-semibold">
                                {allRatios?.pricetoBook?.datas?.[
                                  allRatios?.pricetoBook?.datas?.length - 1
                                ]?.toFixed(2)}{" "}
                                x
                              </span>{" "}
                            </span>{" "}
                            <span className="lg:text-sm text-xl font-medium">
                              [as of{" "}
                              {formatYear(
                                allRatios?.pricetoBook?.years?.[
                                  allRatios?.pricetoBook?.datas?.length - 1
                                ]
                              )}{" "}
                              ({currentQuarter})]
                            </span>
                          </p>
                          <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                            Price to Book
                          </p>
                        </div>
                      </div>
                      {sector === "Development Banks" ||
                        sector === "Micro Finance" ||
                        sector === "Finance" ||
                        (sector === "Commercial Banks" && (
                          <>
                            <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2   ">
                              {/* <p className="pt-3 pl-3 uppercase font-semibold">Assets Turn Over</p> */}
                              <div className="">
                                <BreakDownChart
                                  lineData={allRatios?.pricetoLoan}
                                />
                              </div>
                              <div className="text-center ">
                                <p>
                                  <span className="text-xl font-semibold">
                                    {(
                                      allRatios?.pricetoLoan?.datas?.[
                                        allRatios?.pricetoLoan?.datas?.length -
                                          1
                                      ] || 0
                                    ).toFixed(2)}
                                    x
                                  </span>{" "}
                                  <span className="lg:text-sm text-xl font-medium">
                                    [as of{" "}
                                    {formatYear(
                                      allRatios?.pricetoLoan?.years?.[
                                        allRatios?.pricetoLoan?.datas?.length -
                                          1
                                      ]
                                    )}{" "}
                                    ({currentQuarter})]
                                  </span>
                                </p>
                                <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                  Price to Loans
                                </p>
                              </div>
                            </div>
                          </>
                        ))}

                      {sector === "Non Life Insurance" ||
                        (sector === "Life Insurance" && (
                          <>
                            <div className=" pb-5 px-4   lg:col-span-6 xl:col-span-2   ">
                              {/* <p className="pt-3 pl-3 uppercase font-semibold">Assets Turn Over</p> */}
                              <div className="">
                                <BreakDownChart
                                  lineData={allRatios?.priceToPremium}
                                />
                              </div>
                              <div className="text-center ">
                                <p>
                                  <span className="text-xl font-semibold">
                                    {allRatios?.priceToPremium?.datas &&
                                      allRatios?.priceToPremium?.datas.length >
                                        0 &&
                                      allRatios?.priceToPremium?.datas?.[
                                        allRatios?.priceToPremium?.datas
                                          ?.length - 1
                                      ]?.toFixed(2)}
                                  </span>{" "}
                                  <span className="lg:text-sm text-xl font-medium">
                                    [as of{" "}
                                    {allRatios?.priceToPremium?.years &&
                                      allRatios?.priceToPremium?.datas &&
                                      allRatios?.priceToPremium?.datas?.length >
                                        0 && (
                                        <>
                                          {
                                            allRatios?.priceToPremium?.years?.[
                                              allRatios?.priceToPremium?.datas
                                                ?.length - 1
                                            ]
                                          }{" "}
                                          ({currentQuarter})
                                        </>
                                      )}
                                    ]
                                  </span>
                                </p>
                                <p className=" pl-3 text-gray-600 lg:text-sm text-xl font-medium">
                                  Price to Premium
                                </p>
                              </div>
                            </div>
                          </>
                        ))}
                      {sector === "Hydro Power" && (
                        <>
                          <div className="pb-5 mt-[30px] col-span-5">
                            <h2 className="text-2xl font-bold lg:text-lg uppercase pb-[30px]">
                              Market Cap and Revenue
                            </h2>
                            <div className="px-4c">
                              <DoubleLineChart
                                lineData1={allRatios?.marketCap}
                                lineData2={allRatios?.companyBarChart?.revenue}
                              />
                            </div>
                            <div className="text-center ">
                              <p>
                                <span className="text-xl font-semibold">
                                  {/* {assetsTurnOversLineData?.datas[
                    assetsTurnOversLineData?.datas.length - 1
                  ]?.toFixed(2)} */}
                                </span>{" "}
                                <span className="lg:text-sm text-xl font-medium">
                                  {/* [as of{" "}
                  {
                    assetsTurnOversLineData?.years[
                      assetsTurnOversLineData?.datas.length - 1
                    ]
                  }
                  ({currentQuarter}) ] */}
                                </span>
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <Skeleton paragraph={{ rows: 10 }} />
                )}
              </div>
            </>
          )}
        </>
      )}
      <div className="pb-[40px] "> </div>
    </div>
  );
};
export default BreakDown;
