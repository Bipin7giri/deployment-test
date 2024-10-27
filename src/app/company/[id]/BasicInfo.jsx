import React, { useEffect, useState } from "react";
import { formatMoney, lakhConvert } from "../../../utils/formatMoney";
import DoughnutChart from "../../../components/Charts/DoughnutChart";
import NepseMainChart from "../../(home)/components/NepseMainChart";
import { Skeleton, Table, Tag } from "antd";
import ReadMore from "../../../components/ReadMore";
import api from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import actions from "./redux/actions";
import NoDataFound from "../../../components/notDataFound";
import Timeline from "../../../components/Timeline";
import lokingPeriodConfig from "../../../config/lokingPeriodConfig.json";
import StockChart from "./component/StockChart";
const { activation, blackListedSector, whiteListedSector } = lokingPeriodConfig;

const BasicInfo = ({ singleCompanyLiveData, industryAvg, id }) => {
  const dispatch = useDispatch();
  let companyHolding;
  if (singleCompanyLiveData !== undefined) {
    companyHolding = singleCompanyLiveData?.[0];
  }

  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState("1Y");
  const intervals = ["1D", "3M", "6M", "1Y"];

  const {
    company,
    companyDescriptions,
    // pivotAnalysis,
    nepseVsSectorVsCompany,
  } = useSelector((state) => state.company);

  const [lokingPeriodData, setLokingPeriodData] = useState();
  const [remianingLockingPeriod, setRemainingLockingPeriod] = useState();

  const LineChartData = async () => {
    try {
      let time;
      const currentDate = new Date();
      switch (selectedInterval) {
        case "1Y":
          // to get the 1 year ago's timestamp from todays date
          currentDate.setFullYear(currentDate.getFullYear() - 1);
          time = currentDate.getTime() / 1000;
          break;
        case "6M":
          // to get the 6 months ago's timestamp from todays date
          currentDate.setMonth(currentDate.getMonth() - 6);
          time = currentDate.getTime() / 1000;
          break;
        case "3M":
          // to get the 3 months ago's timestamp from todays date
          currentDate.setMonth(currentDate.getMonth() - 3);
          time = currentDate.getTime() / 1000;
          break;
      }
      setLoading(true);
      const res = await api.get(`/company/chart_data/${id}/${time}`);
      if (res) {
        setLineChartData(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getDailyChartData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/company/chart_data_resolution_one_day/${id}`
      );
      if (response.data.status === 200) {
        setLineChartData(response.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedInterval !== "1D") {
      LineChartData();
    } else {
      getDailyChartData();
    }
  }, [id, selectedInterval]);

  // let pivotAnalysisResullt = [];
  // if (
  //   pivotAnalysis !== undefined &&
  //   pivotAnalysis !== null &&
  //   pivotAnalysis?.data?.length > 0
  // ) {
  //   pivotAnalysisResullt = pivotAnalysis?.data?.map(
  //     ({ symbol, ...rest }) => rest
  //   );
  // }
  let nepsSectorCompany = [];
  if (
    nepseVsSectorVsCompany?.data !== undefined &&
    nepseVsSectorVsCompany?.data !== null &&
    nepseVsSectorVsCompany?.data?.length > 0
  ) {
    nepsSectorCompany = nepseVsSectorVsCompany?.data?.map((item, id) => {
      return {
        sno: id + 1,
        duration: item?.duration,
        nepse: item?.nepse.toFixed(2),
        sector: item?.sector.toFixed(2),
        company: item?.company.toFixed(2),
      };
    });
  }
  useEffect(() => {
    // if (id !== company?.[0]?.symbol) {
    dispatch(actions.getCompanyDescriptions({ symbol: id }));
    // dispatch(actions.getPivotAnalysis({ symbol: id }));
    dispatch(actions.getNepseVsSectorVsCompany({ symbol: id }));
    // }
  }, [id]);

  const companyDescriptionText = companyDescriptions?.data?.data?.[0]
    ?.description
    ? companyDescriptions?.data?.data?.[0]?.description
    : "-";

  const {
    lowPrice,
    highPrice,
    lastTradedPrice,
    fiftyTwoWeekLow,
    fiftyTwoWeekHigh,
  } = singleCompanyLiveData?.[0] || {};

  // Calculate the width of the div
  const priceTodaysRange = parseFloat(highPrice) - parseFloat(lowPrice);
  const priceFiftyFiveWeekRange =
    parseFloat(fiftyTwoWeekHigh) - parseFloat(fiftyTwoWeekLow);

  // Calculate the position of the triangle
  const triangleTodaysRangePosition =
    ((lastTradedPrice - (parseFloat(lowPrice) + 0.01)) / priceTodaysRange) *
      100 +
    "%";
  const triangleFiftyFiveWeekRangePosition =
    ((lastTradedPrice - parseFloat(fiftyTwoWeekLow)) /
      priceFiftyFiveWeekRange) *
      100 +
    "%";

  // Style object for the triangle
  const triangleTodaysRangeStyle = {
    left: triangleTodaysRangePosition,
  };
  const triangleFiftyFiveWeekRangeStyle = {
    left: triangleFiftyFiveWeekRangePosition,
  };

  // for nepse vs sector vs company
  const columns = [
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      width: 300,
      render: (text) => <div className="text-center">{text}</div>,
    },
    {
      title: "NEPSE",
      dataIndex: "nepse",
      key: "nepse",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      width: 300,
      render: (text) => <div className="text-center">{text}%</div>,
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      width: 300,
      render: (text) => <div className="text-center">{text}%</div>,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      width: 300,
      responsive: ["md"],
      style: { fontSize: "76px" },
      render: (text) => <div className="text-center"> {text}%</div>,
    },
  ];

  const styles = `
  @media (min-width: 640px) {
    .table-responsive td, .table-responsive th {
      font-size: 26px;
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item,
    .ant-pagination-item-link {
      font-size: 20px;
      margint-top:10px /* Adjust the font size as per your requirement */
    }
  }

  @media (min-width: 1024px) {
    .table-responsive td, .table-responsive th {
      font-size: 14px;
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item,
    .ant-pagination-item-link {
      font-size: 14px;
      margint-top:10px /* Adjust the font size as per your requirement */
    }
  }   
`;

  // pivot analysis
  const symbol = company?.[0]?.symbol;
  const openPriceNum = parseFloat(company?.[0]?.openPrice);
  const highPriceNum = parseFloat(company?.[0]?.highPrice);
  const lowPriceNum = parseFloat(company?.[0]?.lowPrice);
  const previousCloseNum = parseFloat(company?.[0]?.previousClose);

  const supportS3 =
    2 * ((highPriceNum + lowPriceNum + previousCloseNum) / 3) -
    highPriceNum -
    (highPriceNum - lowPriceNum);
  const supportS2 =
    (highPriceNum + lowPriceNum + previousCloseNum) / 3 -
    (highPriceNum - lowPriceNum);
  const supportS1 =
    2 * ((highPriceNum + lowPriceNum + previousCloseNum) / 3) - highPriceNum;
  const pivotPoint =
    (openPriceNum + highPriceNum + lowPriceNum + previousCloseNum) / 4;
  const resistanceR1 =
    2 * ((highPriceNum + lowPriceNum + previousCloseNum) / 3) - lowPriceNum;
  const resistanceR2 =
    (highPriceNum + lowPriceNum + previousCloseNum) / 3 +
    (highPriceNum - lowPriceNum);
  const resistanceR3 = supportS3 + (highPriceNum - lowPriceNum);

  const pivotResult = {
    "Support Level (S3)": supportS3?.toFixed(2),
    "Support Level (S2)": supportS2?.toFixed(2),
    "Support Level (S1)": supportS1?.toFixed(2),
    "Pivot Point (PP)": pivotPoint?.toFixed(2),
    "Resistance Level (R1)": resistanceR1?.toFixed(2),
    "Resistance Level (R2)": resistanceR2?.toFixed(2),
    "Resistance Level (R3)": resistanceR3?.toFixed(2),
  };

  const lockinPeriodData = async () => {
    const res = await api.get(`/company/overview/${company?.[0]?.symbol}`, {});
    if (res) {
      const data = res?.data?.data;
      setLokingPeriodData(data);
      // Extract the lock-in period date
      const lockInDate = new Date(
        res?.data?.data?.find((data) => data?.name === "Lock in Period")?.value
      );

      // Get the current date
      const currentDate = new Date();

      // Calculate the difference in milliseconds
      const timeDifference = lockInDate - currentDate;

      // Convert the difference to days
      const daysRemaining = Math?.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setRemainingLockingPeriod(daysRemaining);
    }
  };

  useEffect(() => {
    if (
      activation &&
      !blackListedSector.item?.includes(
        company?.[0]?.[blackListedSector?.label]
      ) &&
      whiteListedSector?.item?.includes(
        company?.[0]?.[whiteListedSector?.label]
      )
    ) {
      lockinPeriodData();
    }
  }, [JSON.stringify(company)]);

  return (
    <div className="py-5">
      <div className="flex lg:flex-row flex-col gap-4">
        <div className="lg:w-[60%] py-10 border-[1px] rounded-[20px] px-5 pt-5 2xl:w-[75%] bg-secondary">
          <div className="mb-5 flex w-full items-center justify-between gap-4">
            <h2 className="text-2xl">
              <span className="text-2xl font-bold lg:text-lg uppercase">
                {id}{" "}
              </span>
              <span className="text-2xl font-bold lg:text-lg">Chart</span>
            </h2>
            <div className="mr-4 flex items-center gap-1 text-sm">
              {intervals.map((item, id) => (
                <button
                  key={id}
                  onClick={() => setSelectedInterval(item)}
                  className={`${
                    selectedInterval === item
                      ? "bg-gray-900 text-white"
                      : "bg-white text-black"
                  } size-7 rounded-full border`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="h-full">
            {loading ? (
              <>
                <Skeleton />
                <Skeleton />
              </>
            ) : lineChartData?.length > 0 ? (
              <StockChart
                selectedInterval={selectedInterval}
                data={lineChartData}
                isNepse={false}
              />
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                No data found
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-[40%] py-10 border-[1px] rounded-[20px] px-10 pt-5 2xl:w-[75%] bg-secondary">
          <div className="bg-white lg:p-0">
            <h2 className="text-2xl mb-5">
              <span className="text-2xl font-bold lg:text-lg uppercase">
                Quick Overview
              </span>
            </h2>
            {industryAvg?.length > 0 ? (
              industryAvg?.map((item, index) => {
                return (
                  <>
                    <div className="border-b-[1px] flex justify-between px-4 border-gray-200 text-left mb-[10px] py-[10px]">
                      <div>
                        <p className="text-[#3a3a3a] font-[500] lg:text-lg text-2xl">
                          {item?.name}
                        </p>
                        <p className="font-bold lg:text-lg text-2xl ml-2">
                          {item?.ratio_value?.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#3a3a3a] font-[500] lg:text-lg text-2xl">
                          Industry Avg
                        </p>
                        <p className="font-bold lg:text-lg text-2xl ml-2">
                          {item?.avg?.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <Skeleton paragraph={{ rows: 8 }} style={{ width: "100%" }} />
              // <div className="flex items-center mb-4 justify-center">
              //   <NoDataFound />
              // </div>
            )}
            {lokingPeriodData?.length > 0 && (
              <div className="border-b-[1px] flex justify-between px-4 border-gray-200 text-left mb-[10px] py-[10px]">
                <div>
                  <p className="text-[#3a3a3a] font-[500] lg:text-lg text-2xl">
                    {lokingPeriodData?.[1]?.name}
                  </p>
                  <p className="font-bold lg:text-lg text-2xl ml-2">
                    {lokingPeriodData?.[1]?.value}
                  </p>
                </div>
                <div>
                  <p className="text-[#3a3a3a] font-[500] lg:text-lg text-2xl !text-right">
                    {lokingPeriodData?.[0]?.name}
                  </p>
                  <p className="font-bold lg:text-lg text-2xl ml-2">
                    {lokingPeriodData?.[0]?.value}
                    <span className="!font-[400] !text-[16px]">
                      ({remianingLockingPeriod}) days
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-5 py-6">
        <div className="lg:w-[60%] 2xl:w-[50%] px-5  border-[1px] rounded-[20px] bg-secondary pt-[12px]">
          <h2 className="text-2xl font-bold lg:text-lg uppercase">Profile</h2>
          <ReadMore text={companyDescriptionText} maxCharCount={350} />
          <div className="flex gap-10  items-center py-5 px-1">
            <div className="w-[50%]">
              <p className="text-xl font-[500] mb-[30px]">Today’s Range</p>
              <div className="border-b-2 my-3 border-[#9C9C9C] relative">
                <span
                  className={`${
                    singleCompanyLiveData?.[0]?.schange > 0
                      ? "text-success bg-success"
                      : "text-danger bg-danger"
                  } triangle absolute  top-[-22px]`}
                  style={triangleTodaysRangeStyle}
                >
                  ▲
                </span>
              </div>
              <div className="flex justify-between text-sm font-[500]">
                <p>Rs {formatMoney(singleCompanyLiveData?.[0]?.lowPrice)}</p>
                <p>Rs {formatMoney(singleCompanyLiveData?.[0]?.highPrice)}</p>
              </div>
            </div>
            <div className="w-[50%]">
              <p className="text-xl font-[500] mb-[30px]">52 Week Range</p>
              <div className="border-b-2 my-3 border-[#9C9C9C] relative">
                <span
                  className={`${
                    singleCompanyLiveData?.[0]?.schange > 0
                      ? "text-success bg-success"
                      : "text-danger bg-danger"
                  } triangle absolute  top-[-22px]`}
                  style={triangleFiftyFiveWeekRangeStyle}
                >
                  ▲
                </span>
              </div>
              <div className="flex justify-between text-sm font-[500]">
                <p>
                  Rs {formatMoney(singleCompanyLiveData?.[0]?.fiftyTwoWeekLow)}
                </p>
                <p>
                  Rs {formatMoney(singleCompanyLiveData?.[0]?.fiftyTwoWeekHigh)}
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-5 text-2xl lg:text-sm pb-5 grid-cols-2">
            <div className="border-[1px] flex justify-between items-center px-4 border-gray-400 rounded-md">
              <p className="text-[#3a3a3a] font-[500]">Today’s Open</p>
              <p className="font-bold ">
                {formatMoney(singleCompanyLiveData?.[0]?.openPrice)}
              </p>
            </div>
            <div className="border-[1px] flex justify-between items-center px-4 border-gray-400 rounded-md">
              <p className="text-[#3a3a3a] font-[500] p-3">Previous Close</p>
              <p className="font-bold ">
                {formatMoney(singleCompanyLiveData?.[0]?.previousClose)}
              </p>
            </div>
            <div className="border-[1px] flex justify-between items-center px-4 border-gray-400 rounded-md">
              <p className="text-[#3a3a3a] font-[500] p-3">High Price</p>
              <p className="font-bold ">
                {" "}
                {formatMoney(singleCompanyLiveData?.[0]?.highPrice)}
              </p>
            </div>
            <div className="border-[1px] flex justify-between items-center px-4 border-gray-400 rounded-md">
              <p className="text-[#3a3a3a] font-[500] p-3">Low Price</p>
              <p className="font-bold ">
                {formatMoney(singleCompanyLiveData?.[0]?.lowPrice)}
              </p>
            </div>
            <div className="border-[1px] flex justify-between items-center px-4 border-gray-400 rounded-md">
              <p className="text-[#3a3a3a] font-[500] p-3">Avg Traded Price</p>
              <p className="font-bold ">
                {formatMoney(singleCompanyLiveData?.[0]?.averageTradedPrice)}
              </p>
            </div>
            <div className="border-[1px] flex justify-between items-center px-4 border-gray-400 rounded-md">
              <p className="text-[#3a3a3a] font-[500] p-3">Total Turnover</p>
              <p className="font-bold ">
                {lakhConvert(singleCompanyLiveData?.[0]?.totalTradeValue)}
              </p>
            </div>
          </div>
        </div>
        {company?.[0]?.instrumentType === "Equity" && (
          <div className="flex flex-row items-center gap-4 lg:w-[40%] 2xl:w-[50%] h-[80%] border-[1px] rounded-[20px] bg-secondary px-5 py-3">
            {company?.[0]?.public !== null ||
            company?.[0]?.promoter !== null ? (
              <>
                <div className="w-[65%]">
                  <DoughnutChart data={companyHolding} fromWhere="company" />
                </div>
                <div className="w-[35%] text-left bottom-0">
                  <div className="my-3">
                    <p className="lg:text-[16px] text-xl font-bold">
                      Public Share
                    </p>
                    <p className="lg:text-sm text-lg">
                      {formatMoney(company?.[0]?.public)}{" "}
                      <span className="font-[500]">
                        (
                        {(
                          (parseFloat(company?.[0]?.public) /
                            (parseFloat(company?.[0]?.public) +
                              parseFloat(company?.[0]?.promoter))) *
                          100
                        )?.toFixed(2)}
                        %)
                      </span>
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="lg:text-[16px] text-xl font-bold">
                      Promoter Share
                    </p>
                    <p className="lg:text-sm text-lg">
                      {formatMoney(company?.[0]?.promoter)}{" "}
                      <span className="font-[500]">
                        (
                        {(
                          (parseFloat(company?.[0]?.promoter) /
                            (parseFloat(company?.[0]?.public) +
                              parseFloat(company?.[0]?.promoter))) *
                          100
                        )?.toFixed(2)}
                        %)
                      </span>
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="lg:text-[16px] text-xl font-bold">
                      Total Share
                    </p>
                    <p className="lg:text-sm text-lg font-[500]">
                      {formatMoney(
                        parseFloat(company?.[0]?.public) +
                          parseFloat(company?.[0]?.promoter)
                      )}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-72 w-full">
                <h2 className="text-2xl font-bold lg:text-lg uppercase">
                  Company Holdings
                </h2>
                <div className="w-full h-full flex justify-center items-center">No data found</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex lg:flex-row flex-col gap-5 py-6">
        <div className="lg:w-[60%] 2xl:w-[50%] px-5  border-[1px] rounded-[20px] bg-secondary pt-[12px]">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold lg:text-lg uppercase">
              nepse vs sector vs company
            </h2>
            <p>
              <Tag color="cyan" className="lg:text-sm text-2xl">
                {" "}
                as of{" "}
                {`${
                  nepseVsSectorVsCompany?.data
                    ? moment(
                        nepseVsSectorVsCompany?.data[0]?.updated_date
                      ).format("D MMM, YYYY")
                    : ""
                }`}{" "}
              </Tag>
            </p>
          </div>
          <div className="py-[16px]">
            <style>{styles}</style>
            {nepsSectorCompany?.length > 0 ? (
              <Table
                size="small"
                className="table-responsive"
                pagination={false}
                columns={columns}
                dataSource={nepsSectorCompany}
              />
            ) : (
              <>
                <Skeleton />
                <Skeleton />
              </>
            )}
          </div>
        </div>
        <div className="lg:w-[40%] 2xl:w-[50%] h-[80%] border-[1px] rounded-[20px] bg-secondary px-5 py-3">
          <h2 className="text-2xl font-bold lg:text-lg uppercase">
            Pivot Analysis
          </h2>
          <div className="w-full py-[16px]">
            <table className=" w-[100%]">
              <tbody>
                {Object.keys(pivotResult).map((key, id) => (
                  <tr
                    key={id}
                    className={
                      (id + 1) % 2 === 0
                        ? "text-center text-[24px] lg:text-sm"
                        : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                    }
                  >
                    <td className="border py-2 w-3/4 text-[#3a3a3a] font-[500]">
                      {key}
                    </td>
                    <td className="border py-2 w-1/4 text-[#3a3a3a] font-[500]">
                      {pivotResult[key] ? formatMoney(pivotResult[key]) : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Timeline /> */}
    </div>
  );
};

export default BasicInfo;
