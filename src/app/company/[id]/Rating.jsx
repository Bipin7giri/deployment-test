import React, { useEffect, useState } from "react";
import { SaralRatingScale } from "./component/SaralRatingScale";
import { Pagination, Progress, Rate, Skeleton, Tag, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import actions from "./redux/actions";
import {
  AiFillLock,
  AiFillStar,
  AiOutlineCheck,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import NotEnoughData from "../../../components/NotEnoughData";
import TableShimmer from "../../../components/TableShimmer";
import Loader from "../../../components/Loader";
import {
  getAltmanDescription,
  getCamelRatingDescription,
  getPiotroskiRatingDescription,
  getSaralRatingDescription,
} from "./helpers";
import PiotroskiRating from "./component/Rating/PiotroskiRating";
import { GiMoneyStack } from "react-icons/gi";
import request from "../../../api/request";

const Rating = ({ symbol }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const camelSectors = [
    "Micro Finance",
    "Development Banks",
    "Commercial Banks",
    "Finance",
  ];

  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);
  const [isLoading, setisLoading] = useState(false);
  const {
    altmanCamelLoading,
    altMan,
    camelRatingIndividual,
    company,
    quickSypnosisList,
    saralRating,
  } = useSelector((state) => state.company);
  let currentItems;

  useEffect(() => {
    setisLoading(true);
    if (isLoggedIn && is_subscribed) {
      dispatch(actions.getSaralRating({ symbol: company?.[0]?.symbol }));
    }
    setisLoading(false);
  }, [company, symbol]);

  // // camel rating
  let saralRatin = [];
  let filteredData = [];
  if (
    saralRating !== null &&
    saralRating !== undefined &&
    saralRating?.data?.length > 0
  ) {
    saralRatin = saralRating?.data;
    filteredData = saralRating?.data?.filter(
      (item) => item?.description !== null
    );
  }

  const [isSuscribeHover, setIsSuscribehover] = useState(false);
  const handlePaidFeature = () => {
    router.push(`/subscription-plan`);
    // router.push(`/login`);
  };

  useEffect(() => { }, [altMan]);

  const itemsPerPage = 4; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter the data to only include items for the current page
  currentItems = filteredData?.slice(startIndex, endIndex);

  // altman + camel
  const averageCamelRating =
    camelRatingIndividual?.data?.length > 0 &&
    camelRatingIndividual?.data?.reduce(
      (accumulator, currentData) => accumulator + currentData.value,
      0
    ) / camelRatingIndividual?.data?.length;

  const unformattedAltmanValue =
    altMan?.data?.length > 0 && parseFloat(altMan?.data?.[0]?.value);
  const altmanRating = isNaN(unformattedAltmanValue)
    ? "N/A"
    : (unformattedAltmanValue * 1).toFixed(1);

  const getDataOfCamelRating = (key) => {
    const data = camelRatingIndividual?.data;
    const selecteddata = data?.filter((da) => da.key === key);
    console.log(selecteddata);
    if (selecteddata) {
      return selecteddata[0].value;
    }
  };

  const loadRating = () => {
    if (
      company?.[0]?.symbol !== undefined &&
      is_subscribed &&
      company?.[0]?.instrumentType !== "Mutual Funds" &&
      company?.[0]?.instrumentType !== "Non-Convertible Debentures"
    ) {
      if (
        company?.[0]?.sectorName === "Micro Finance" ||
        company?.[0]?.sectorName === "Development Banks" ||
        company?.[0]?.sectorName === "Commercial Banks" ||
        company?.[0]?.sectorName === "Finance"
      ) {
        const percentage = (averageCamelRating / 5) * 100;
        return (
          // <Rate
          //   allowHalf
          //   disabled
          //   value={averageCamelRating ? averageCamelRating : 0}
          //   allowClear={true}
          //   className={`text-[24px] font-[700] bg-secondary ${
          //     averageCamelRating > 3 ? "text-success" : "text-orange-500"
          //   }`}
          // />
          <Progress
            strokeColor={averageCamelRating > 3 ? "#52c41a" : "#f5222d"}
            status="active"
            showInfo={false}
            className="text-[22px] lg:text-[16px]"
            value={percentage ? percentage : 0}
            percent={isLoggedIn ? percentage : 20}
            style={{
              height: "60px",
              marginLeft: -40,
              paddingLeft: 30,
            }}
          />
        );
      } else {
        const percantage = (altmanRating / 5) * 100;
        return (
          // <Rate
          //   allowHalf
          //   disabled
          //   value={altmanRating ? altmanRating : 0}
          //   className={`text-[24px] font-[700] bg-secondary ${
          //     altmanRating > 3 ? "text-success" : "text-orange-500"
          //   }`}
          // />
          <Progress
            strokeColor={
              altmanRating > 3
                ? "#52c41a"
                : altmanRating > 1.833 && altmanRating < 3
                  ? "#4096ff"
                  : "#f5222d"
            }
            status="active"
            showInfo={false}
            className="text-[22px] lg:text-[16px]"
            value={percantage ? percantage : 0}
            percent={percantage ? percantage : 20}
            style={{
              height: "60px",
              marginLeft: -30,
              paddingLeft: 30,
            }}
          />
        );
      }
    }
    return null;
  };

  useEffect(() => {
    dispatch(actions.getCamelRatingIndividual({ symbol }));
    dispatch(actions.getAltmanRatingIndividual({ symbol }));
  }, [symbol]);

  useEffect(() => {
    loadRating();
  });
  const _isCamel = camelSectors.includes(company?.[0]?.sectorName)
    ? true
    : false;

  // PiotrokshiRating starts
  const [piotrokshiRatingPercentage, setpiotrokshiRatingPercentage] =
    useState(null);
  const [totalPiotrokshiRating, settotalPiotrokshiRating] = useState(null);
  const [totalPiotrokshiRatingSecured, settotalPiotrokshiRatingSecured] =
    useState(null);
  const getData = async () => {
    try {
      const response = await request({
        method: "get",
        url: `/company_analysis/get_piotroski_rating/${symbol}`,
      });
      if (response?.data?.data.length > 0) {
        let ratingPerc, totalRating;
        totalRating = response?.data?.data.reduce((accumulator, item) => {
          if (item?.rating === 1) {
            return accumulator + 1;
          } else {
            return accumulator;
          }
        }, 0);
        const totalCount = response?.data?.data.length;
        ratingPerc = (totalRating / totalCount) * 100;
        setpiotrokshiRatingPercentage(ratingPerc);
        settotalPiotrokshiRatingSecured(totalRating);
        settotalPiotrokshiRating(totalCount);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // PiotrokshiRating ends

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="min-h-[400px] ">
        {/* saral rating */}
        <div>
          <div className="mb-[40px] bg-secondary px-9 py-5 shadow-xl rounded-[20px]">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <h1 className="text-xl lg:text-lg font-bold uppercase">
                  saral rating
                </h1>
                <div className="">
                  <Tooltip
                    className="cursor-pointer"
                    title={getSaralRatingDescription()}
                  >
                    <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                  </Tooltip>
                </div>
              </div>

              {/* <p>
                {quickSypnosisList !== undefined && quickSypnosisList !== null ? (
                  <Tag color="cyan">
                    as of {quickSypnosisList?.quarter}, {quickSypnosisList?.year}{" "}
                  </Tag>
                ) : ""}
              </p> */}
            </div>
            {is_subscribed && currentItems.length > 0 ? (
              <div className="flex lg:flex-row flex-col gap-10 w-full">
                <div className="lg:w-[40%] min-h-[300px] w-full mt-[20px] mb-20">
                  <SaralRatingScale symbol={company?.[0]?.symbol} />
                </div>
                <div className="lg:w-[60%] min-h-[300px] w-full">
                  <h1 className="text-xl lg:text-lg font-bold uppercase lg:mt-[-26px] mt-0">
                    description
                  </h1>
                  <div className="pt-[16px]">
                    {currentItems?.length > 0 &&
                      currentItems?.map((item, id) => {
                        return (
                          <>
                            <div
                              className="flex gap-5 py-[12px] rounded-xl px-[8px] mb-[16px] "
                              key={id}
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px, rgba(0, 0, 0, 0.1) 0px 0px 0px 0px",
                              }}
                            >
                              <div>
                                {item?.rating == 1 ? (
                                  <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                ) : (
                                  <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                )}
                              </div>

                              <div>
                                <div className="flex items-start gap-2">
                                  <h1 className="lg:text-sm text-2xl font-semibold">
                                    {item?.description}.
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    <Pagination
                      current={currentPage}
                      onChange={(page) => setCurrentPage(page)}
                      total={filteredData?.length}
                      pageSize={itemsPerPage}
                      className="text-2xl lg:text-sm sm:flex justify-center items-center"
                    />
                  </div>
                </div>
              </div>
            ) : !is_subscribed ? (
              <>
                <div
                  className="inset-0 border-[2px] border-gray-500 bg-[#ffffff] opacity-40"
                  style={{ filter: "blur(3px)" }}
                >
                  <div className="flex lg:flex-row flex-col gap-10 w-full overflow-hidden">
                    <div className="lg:w-[50%] min-h-[300px] w-full">
                      <SaralRatingScale />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="absolute 2xl:-mt-[30vh] xl:-mt-[44vh] lg:-mt-[44vh] -mt-[60vh] sm:-mt-[20vh] px-5 z-[99]">
                    <Tooltip
                      title="Subscribe for this feature"
                      className="flex gap-2 mt-24 lg:mt-36"
                    >
                      <button
                        className="bg-primary hover:bg-primary-2 font-serif w-32 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center"
                        onClick={() => {
                          handlePaidFeature();
                        }}
                        onMouseOver={() => setIsSuscribehover(true)}
                        onMouseOut={() => setIsSuscribehover(false)}
                      >
                        Subscribe
                        {/* {isSuscribeHover && (
                        <div className="text-secondary">
                          <GiMoneyStack className="text-2xl text-secondary" />
                        </div>
                      )} */}
                        <span className="text-secondary text-3xl lg:text-xl">
                          <AiFillLock />
                        </span>
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </>
            ) : (
              <NotEnoughData />
            )}
          </div>
        </div>

        {/* saral rating ends  */}

        <div>
          {(altMan?.data?.length > 0 ||
            camelRatingIndividual?.data?.length > 0) && (
              <div className="mb-[40px] bg-secondary px-9 shadow-xl rounded-[20px]">
                <div className="flex justify-between items-center">
                  {company?.[0]?.instrumentType === "Mutual Funds" ? (
                    " "
                  ) : company?.[0]?.sectorName === "Micro Finance" ||
                    company?.[0]?.sectorName === "Development Banks" ||
                    company?.[0]?.sectorName === "Commercial Banks" ||
                    company?.[0]?.sectorName === "Finance" ? (
                    <div className="flex gap-3 items-center">
                      <h1 className="text-xl lg:text-lg font-bold uppercase mt-[20px] mb-[20px]">
                        {/* Camel rating  */}
                      </h1>
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center">
                      <h1 className="text-xl lg:text-lg font-bold uppercase mt-[20px] mb-[20px]">
                        Altman rating
                      </h1>
                      <div className="">
                        <Tooltip
                          className="cursor-pointer"
                          title={getSaralRatingDescription()}
                        >
                          <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                        </Tooltip>
                      </div>
                    </div>
                  )}
                  <p>
                    {quickSypnosisList !== undefined &&
                      quickSypnosisList !== null ? (
                      <Tag color="cyan">
                        as of {quickSypnosisList?.quarter},{" "}
                        {quickSypnosisList?.year}{" "}
                      </Tag>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
                <p></p>
                {company?.[0]?.instrumentType === "Mutual Funds" ? (
                  " "
                ) : company?.[0]?.sectorName === "Micro Finance" ||
                  company?.[0]?.sectorName === "Development Banks" ||
                  company?.[0]?.sectorName === "Commercial Banks" ||
                  company?.[0]?.sectorName === "Finance" ? (
                  <div className="flex flex-col align-middle">
                    {isLoggedIn ? (
                      <>
                        {is_subscribed ? (
                          <div className="flex lg:flex-row flex-col w-full justify-between  mt-[10px] ">
                            <div className="lg:w-[40%] w-full mt-[-60px] text-start">
                              {altmanCamelLoading ? (
                                <Skeleton />
                              ) : (
                                <>
                                  <div className="flex gap-3 items-center my-2">
                                    <h1 className="text-xl lg:text-lg font-bold uppercase mt-[30px] mb-[20px]">
                                      Camel rating
                                    </h1>
                                    <div className="">
                                      <Tooltip
                                        className="cursor-pointer"
                                        title={getCamelRatingDescription()}
                                      >
                                        <AiOutlineInfoCircle className="mt-1 text-[28px] lg:text-[16px]" />
                                      </Tooltip>
                                    </div>
                                  </div>
                                  <div className=" my-8 pt-3 text-center  ">
                                    {is_subscribed && (
                                      <>
                                        <div className={`rounded-[30px] gap-1`}>
                                          <div className="relative  flex flex-col justify-center items-center">
                                            <p className="absolute vertical-progress-wrapper inline-block transform -rotate-90 w-[30%] lg:w-[50%] border-[1px] rounded-lg mx-[35px]   shadow-sm p-10">
                                              <p className="ms-6">
                                                {loadRating()}
                                              </p>
                                            </p>
                                            <p className="mt-[45%] font-medium">
                                              {" "}
                                              {averageCamelRating
                                                ? averageCamelRating?.toFixed(1)
                                                : 0}
                                              <span className="text-gray-400 ms-1">
                                                / 5
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className="lg:w-[57%] w-full mt-[-30px]">
                              <div className="">
                                <h1 className="text-xl  lg:text-lg font-bold uppercase mt-[20px] mb-[-30px]">
                                  Description
                                </h1>
                              </div>
                              <div
                                className={`bg-secondary opacity-100 py-[10px]`}
                              >
                                <p className="lg:text-sm text-2xl font-semibold mt-10 w-[200px] bg-white shadow-md px-4 py-3 rounded-lg flex gap-2 items-center">
                                  C (Capital Adequncy)
                                  {getDataOfCamelRating("C") > 2 ? (
                                    <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                  ) : (
                                    <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                  )}
                                </p>
                                <p className="lg:text-sm text-2xl font-semibold mt-10 w-[200px] bg-white shadow-md px-4 py-3 rounded-lg flex gap-2 items-center">
                                  A (Asset Quality)
                                  {getDataOfCamelRating("A") > 2 ? (
                                    <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                  ) : (
                                    <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                  )}
                                </p>
                                <p className="lg:text-sm text-2xl font-semibold mt-10 bg-white shadow-md px-4 w-[200px] py-3 rounded-lg flex gap-2 items-center">
                                  M (Management)
                                  {getDataOfCamelRating("M") > 2 ? (
                                    <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                  ) : (
                                    <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                  )}
                                </p>
                                <p className="lg:text-sm text-2xl font-semibold mt-10 w-[200px] bg-white shadow-md px-4 py-3 rounded-lg flex gap-2 items-center">
                                  E (Earnings)
                                  {getDataOfCamelRating("E") > 2 ? (
                                    <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                  ) : (
                                    <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                  )}
                                </p>
                                <p className="lg:text-sm text-2xl font-semibold mt-10 w-[200px] bg-white shadow-md px-4 py-3 rounded-lg flex gap-2 items-center">
                                  L (Liquidity)
                                  {getDataOfCamelRating("L") > 2 ? (
                                    <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                  ) : (
                                    <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="  w-full flex justify-center items-center">
                              <Tooltip
                                title="Subscribe for this feature"
                                className="flex gap-2  "
                              >
                                <button
                                  className="bg-primary hover:bg-primary-2 font-serif w-32 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center mb-[100px] "
                                  onClick={() => {
                                    handlePaidFeature();
                                  }}
                                  onMouseOver={() => setIsSuscribehover(true)}
                                  onMouseOut={() => setIsSuscribehover(false)}
                                >
                                  Subscribe
                                  {/* {isSuscribeHover && (
                        <div className="text-secondary">
                          <GiMoneyStack className="text-2xl text-secondary" />
                        </div>
                      )} */}
                                  <span className="text-secondary text-3xl lg:text-xl">
                                    <AiFillLock />
                                  </span>
                                </button>
                              </Tooltip>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className="inset-0 border-[2px] border-gray-500 bg-[#ffffff] opacity-40"
                          style={{ filter: "blur(3px)" }}
                        >
                          <div className="flex lg:flex-row flex-col gap-10 w-full overflow-hidden">
                            <div className=" px-44 lg:px-16 xl:px-28 my-8 pt-3 text-center">
                              <div
                                className={`rounded-[30px] px-[16px] py-[20px] xl:py-[50px] gap-1`}
                                style={{
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px, rgba(0, 0, 0, 0.1) 0px 0px 0px 0px",
                                }}
                              >
                                <p
                                  className={`text-[32px] font-[700] bg-secondary text-success`}
                                >
                                  3.99
                                </p>
                                <p className="mt-[8px]">
                                  <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={4.3}
                                    className={`text-[24px] font-[700] bg-secondary text-orange-500`}
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <div className="absolute 2xl:-mt-[30vh] xl:-mt-[44vh] lg:-mt-[44vh] -mt-[60vh] sm:-mt-[20vh] px-5 z-[99]">
                            <Tooltip
                              title="Login SaralLagani for this feature"
                              className="flex gap-2 mt-24 lg:mt-36"
                            >
                              <button
                                className="bg-primary hover:bg-primary-2 font-serif w-32 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center"
                                onClick={() => {
                                  handlePaidFeature();
                                }}
                                onMouseOver={() => setIsSuscribehover(true)}
                                onMouseOut={() => setIsSuscribehover(false)}
                              >
                                Subscribe
                                {isSuscribeHover && (
                                  <div className="text-secondary">
                                    <GiMoneyStack className="text-2xl text-secondary" />
                                  </div>
                                )}
                                <span className="text-secondary text-3xl lg:text-xl">
                                  {" "}
                                  <AiFillLock />{" "}
                                </span>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col align-middle">
                    {isLoggedIn ? (
                      <>
                        {is_subscribed ? (
                          <div className="flex">
                            <div className="flex lg:flex-row  flex-col w-full justify-between py-2">
                              <div className="lg:w-[60%] w-full mt-[20px">
                                {altmanCamelLoading ? (
                                  <Skeleton />
                                ) : (
                                  <div className="   pt-3 text-center  ">
                                    {is_subscribed && (
                                      <>
                                        <div
                                          className={`rounded-[30px] px-[16px] py-[20px] xl:py-[50px] gap-1 mt-[20px]`}
                                        >
                                          {/* <p
                                    className={`text-[32px] font-[700] bg-secondary  ${
                                      averageCamelRating > 3
                                        ? "text-success"
                                        : "text-orange-500"
                                    }`}
                                  >
                                    {averageCamelRating
                                      ? averageCamelRating?.toFixed(1)
                                      : 0}
                                  </p> */}
                                          <div className="relative  mt-[-40px] flex flex-col justify-center items-center">
                                            <p className="absolute vertical-progress-wrapper inline-block transform -rotate-90 w-[300px] lg:w-[300px] border-[1px] rounded-lg mx-[36px]   shadow-sm p-10">
                                              <p className="ms-5">
                                                {loadRating()}
                                              </p>
                                            </p>
                                            <p className="mt-[263px] font-medium">
                                              {" "}
                                              {altmanRating}
                                              <span className="text-gray-400 ms-1">
                                                / 5
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flex justify-center flex-col items-center">
                                          <h1 className="border p-2 w-[150px] mb-[20px] text-medium">
                                            {altmanRating < 1.883
                                              ? "Bankruptcy"
                                              : altmanRating < 3.0 &&
                                                altmanRating > 1.883
                                                ? "Gray Zone"
                                                : "Safe Zone"}
                                          </h1>
                                          <div className="flex  justify-center mt-[10px] gap-5 flex-wrap px-3">
                                            <p className="flex gap-1 items-center justify-center">
                                              {" "}
                                              <span className="bg-[#EF534F] h-[10px] w-[30px] text-[#EF534F] rounded-sm mt-[2px] ">
                                                {" "}
                                              </span>
                                              Bankruptcy(&lt; 1.883)
                                            </p>
                                            <p className="flex gap-1 items-center">
                                              <span className="bg-[#4096ff] h-[10px] w-[30px] text-[#4096ff] rounded-sm mt-[2px]">
                                                {" "}
                                              </span>
                                              Gray Zone(&lt;3.0 & &gt;1.883)
                                            </p>
                                            <p className="flex gap-1 items-center ">
                                              <span className="bg-[#92D050] h-[10px] w-[30px] text-[#92D050] rounded-sm mt-[2px]">
                                                {" "}
                                              </span>
                                              Safe Zone(&gt;3.0)
                                            </p>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="lg:w-[50%] w-full mt-[-30px]">
                                {is_subscribed &&
                                  totalPiotrokshiRating &&
                                  totalPiotrokshiRatingSecured &&
                                  piotrokshiRatingPercentage && (
                                    <div className="flex justify-between  mb-[60px] flex-col  md:flex-row px-20 md:px-2 rounded-md ]">
                                      <div className="ms-[10%]">
                                        <div className="text-xl  lg:text-lg font-bold uppercase mt-[100px] lg:mt-[-30px] mb-[-30px] lg:ms-[-40%] ms-[-15%] flex gap-3 ">
                                          <span className="">
                                            Piotroski Rating
                                          </span>
                                          <div className="">
                                            <Tooltip
                                              className="cursor-pointer"
                                              title={getPiotroskiRatingDescription()}
                                            >
                                              <AiOutlineInfoCircle className="mt-2 text-[28px] lg:text-[16px]" />
                                            </Tooltip>
                                          </div>
                                        </div>
                                        <div className="relative  mt-[150px] flex flex-col px-32 items-center py-10">
                                          <p className="absolute vertical-progress-wrapper flex  transform -rotate-90 w-[300px] lg:w-[300px] border-[1px] rounded-lg mx-[35px] shadow-sm ">
                                            <p className="ms-10">
                                              <Progress
                                                strokeColor={
                                                  totalPiotrokshiRatingSecured >=
                                                    8
                                                    ? "#92D050"
                                                    : totalPiotrokshiRatingSecured <=
                                                      2
                                                      ? "#f5222d"
                                                      : "#4096ff"
                                                }
                                                status="active"
                                                showInfo={false}
                                                className="text-[22px] lg:text-[16px]"
                                                value={20 ? 20 : 0}
                                                percent={
                                                  piotrokshiRatingPercentage
                                                    ? piotrokshiRatingPercentage
                                                    : 20
                                                }
                                                style={{
                                                  height: "60px",
                                                  marginLeft: -30,
                                                  paddingLeft: 30,
                                                }}
                                              />
                                            </p>
                                          </p>
                                          <p className=" font-medium mt-[120px] lg:mt-[159px] ">
                                            {" "}
                                            {totalPiotrokshiRatingSecured}
                                            <span className="text-gray-400 ms-1">
                                              / {totalPiotrokshiRating}
                                            </span>
                                          </p>
                                        </div>
                                        <div className="flex justify-center flex-col items-center  mt-[30px] ">
                                          <h1 className="border p-2 w-[150px] mb-[20px] text-medium text-center">
                                            {totalPiotrokshiRatingSecured <= 2
                                              ? "Bankruptcy"
                                              : totalPiotrokshiRatingSecured >
                                                2 &&
                                                totalPiotrokshiRatingSecured <= 7
                                                ? "Stable"
                                                : "Strong"}
                                          </h1>
                                          <div className="flex justify-between gap-5 flex-wrap px-3 ">
                                            <p className="flex gap-1 items-center justify-center">
                                              {" "}
                                              <span className="bg-[#EF534F] h-[10px] w-[30px] text-[#EF534F] rounded-sm mt-[2px]">
                                                {" "}
                                              </span>
                                              Bankruptcy(&lt;=2)
                                            </p>
                                            <p className="flex gap-1 items-center">
                                              <span className="bg-[#4096ff] h-[10px] w-[30px] text-[#4096ff] rounded-sm mt-[2px]">
                                                {" "}
                                              </span>
                                              Stable(&gt;2 & &lt;=7)
                                            </p>
                                            <p className="flex gap-1 items-center ">
                                              <span className="bg-[#92D050] h-[10px] w-[30px] text-[#92D050] rounded-sm mt-[2px]">
                                                {" "}
                                              </span>
                                              Strong(&gt;=8)
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>

                            {/* <div
                            className={`bg-secondary opacity-100 mt-[70px] py-[10px]`}
                          >
                            <div
                              className="flex gap-5 py-[12px] rounded-xl px-[8px] mb-[16px] "
                              key={altmanRating}
                              style={{
                                boxShadow:
                                  "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px, rgba(0, 0, 0, 0.1) 0px 0px 0px 0px",
                              }}
                            >
                              <div>
                                {altmanRating > 3 ? (
                                  <AiOutlineCheck className="bg-success text-secondary lg:text-xl text-4xl p-1 rounded-full font-semibold" />
                                ) : (
                                  <RxCross2 className="text-secondary bg-danger lg:text-lg text-4xl p-1 rounded-full font-semibold" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-start gap-2">
                                  <h1 className="lg:text-sm text-2xl font-semibold">
                                    {getAltmanDescription(altmanRating)}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          </div>
                        ) : (
                          <>
                            <h1 className="text-center relative mb-[100px] font-semibold">
                              {" "}
                              Camel &Piotroski & Altman Rating{" "}
                            </h1>
                            <div className="  w-full flex justify-center items-center">
                              <Tooltip
                                title="Subscribe for this feature"
                                className="flex gap-2  "
                              >
                                <button
                                  className="bg-primary hover:bg-primary-2 font-serif w-32 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center mb-[100px] "
                                  onClick={() => {
                                    handlePaidFeature();
                                  }}
                                  onMouseOver={() => setIsSuscribehover(true)}
                                  onMouseOut={() => setIsSuscribehover(false)}
                                >
                                  Subscribe
                                  {/* {isSuscribeHover && (
                      <div className="text-secondary">
                        <GiMoneyStack className="text-2xl text-secondary" />
                      </div>
                    )} */}
                                  <span className="text-secondary text-3xl lg:text-xl">
                                    <AiFillLock />
                                  </span>
                                </button>
                              </Tooltip>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className="inset-0 border-[2px] border-gray-500 bg-[#ffffff] opacity-40"
                          style={{ filter: "blur(3px)" }}
                        >
                          <div className="flex lg:flex-row flex-col gap-10 w-full overflow-hidden">
                            <div className=" px-44 lg:px-16 xl:px-28 my-8 pt-3 text-center">
                              <div
                                className={`rounded-[30px] px-[16px] py-[20px] xl:py-[50px] `}
                                style={{
                                  boxShadow:
                                    "rgba(0, 0, 0, 0.1) 0px 2px 10px 2px, rgba(0, 0, 0, 0.1) 0px 0px 0px 0px",
                                }}
                              >
                                <p
                                  className={`text-[32px] font-[700] bg-secondary text-success`}
                                >
                                  3.99
                                </p>
                                <p className="mt-[8px]">
                                  <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={4.3}
                                    className={`text-[24px] font-[700] bg-secondary text-orange-500`}
                                  />
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="absolute 2xl:-mt-[30vh] xl:-mt-[44vh] lg:-mt-[44vh] -mt-[60vh] sm:-mt-[20vh] px-5 z-[99]">
                            <Tooltip
                              title="Login SaralLagani for this feature"
                              className="flex gap-2 mt-24 lg:mt-36"
                            >
                              <button
                                className="bg-primary hover:bg-primary-2 font-serif w-32 text-secondary rounded-full py-1 cursor-pointer flex items-center justify-center"
                                onClick={() => {
                                  handlePaidFeature();
                                }}
                                onMouseOver={() => setIsSuscribehover(true)}
                                onMouseOut={() => setIsSuscribehover(false)}
                              >
                                Login
                                <span className="text-secondary text-3xl lg:text-xl">
                                  <AiFillLock />
                                </span>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
        </div>
      </div>
      {altMan && altMan?.data && altMan?.data[0]?.is_camel === 1 && (
        <div className="lg:w-[40%] w-full  bg-white mt-10 mb-3 shadow-lg rounded-md">
          {is_subscribed &&
            totalPiotrokshiRating &&
            totalPiotrokshiRatingSecured &&
            piotrokshiRatingPercentage && (
              <div className="">
                <div className="ms-[10%]">
                  <div className="text-xl  lg:text-lg font-bold uppercase  mb-[-30px] mt-[10px]  flex gap-3 justify-center items-center ">
                    <span className="">Piotroski Rating</span>
                    <div className="">
                      <Tooltip
                        className="cursor-pointer"
                        title={getPiotroskiRatingDescription()}
                      >
                        <AiOutlineInfoCircle className="mt-2 text-[28px] lg:text-[16px]" />
                      </Tooltip>
                    </div>
                  </div>
                  <div className="relative  mt-[150px] flex flex-col px-32 items-center py-10">
                    <p className="absolute vertical-progress-wrapper flex  transform -rotate-90 w-[300px] lg:w-[300px] border-[1px] rounded-lg mx-[35px] shadow-sm ">
                      <p className="ms-10">
                        <Progress
                          strokeColor={
                            totalPiotrokshiRatingSecured >= 8
                              ? "#92D050"
                              : totalPiotrokshiRatingSecured <= 2
                                ? "#f5222d"
                                : "#4096ff"
                          }
                          status="active"
                          showInfo={false}
                          className="text-[22px] lg:text-[16px]"
                          value={20 ? 20 : 0}
                          percent={
                            piotrokshiRatingPercentage
                              ? piotrokshiRatingPercentage
                              : 20
                          }
                          style={{
                            height: "60px",
                            marginLeft: -40,
                            paddingLeft: 30,
                          }}
                        />
                      </p>
                    </p>
                    <p className=" font-medium mt-[179px]">
                      {" "}
                      {totalPiotrokshiRatingSecured}
                      <span className="text-gray-400 ms-1">
                        / {totalPiotrokshiRating}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-center flex-col items-center ">
                    <h1 className="border p-2 w-[150px] mb-[20px] text-medium text-center">
                      {totalPiotrokshiRatingSecured <= 2
                        ? "Bankruptcy"
                        : totalPiotrokshiRatingSecured > 2 &&
                          totalPiotrokshiRatingSecured <= 7
                          ? "Stable"
                          : "Strong"}
                    </h1>
                    <div className="flex gap-5 flex-wrap justify-center   pb-10">
                      <p className="flex gap-1 items-center justify-center">
                        {" "}
                        <span className="bg-[#EF534F] h-[10px] w-[30px] text-[#EF534F] rounded-sm mt-[2px]">
                          {" "}
                        </span>
                        Bankruptcy(&lt;=2)
                      </p>
                      <p className="flex gap-1 items-center">
                        <span className="bg-[#4096ff] h-[10px] w-[30px] text-[#4096ff] rounded-sm mt-[2px]">
                          {" "}
                        </span>
                        Stable(&gt;2 & &lt;7)
                      </p>
                      <p className="flex gap-1 items-center ">
                        <span className="bg-[#92D050] h-[10px] w-[30px] text-[#92D050] rounded-sm mt-[2px]">
                          {" "}
                        </span>
                        Strong(&gt;=8)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
};

export default Rating;
