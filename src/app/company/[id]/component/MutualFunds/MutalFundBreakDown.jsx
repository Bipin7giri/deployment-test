import { useEffect, useState } from "react";
import MutalFundLineChart from "./MutalFundLineChart";
import MutalFundPieChart from "./MutalFundPieChart";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import MutualFundBuySellChart from "./MutualFundBuySellChart";
import { Select, Skeleton, Tag } from "antd";
import Link from "next/link";
import { AiFillLock } from "react-icons/ai";
import DummyLineChart from "../DummyLineChart";

const MutalFundBreakDown = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);
  const [selectedStock, setSelectedStock] = useState();

  const {
    company,
    loading,
    mutualFundsNavData,
    mutualFundsTopInvestmentSector,
    mutualFundsUnitsChange,
    mutualFundsInvestmentAreas,
    mutualFundsInvestment,
    sectorwiseMutualFund,
    hystoricMutualFundsHoldings,
  } = useSelector((state) => state.company);

  useEffect(() => {
    if (company[0]?.instrumentType === "Mutual Funds") {
      dispatch(actions.getMutualFundsNavData({ symbol: company[0]?.symbol }));
      // dispatch(actions.getMutualFundsTopInvestmentSector({ symbol: company[0]?.symbol }))
      dispatch(
        actions.getMutualFundsInvestmentAreas({ symbol: company[0]?.symbol })
      );
      dispatch(
        actions.getMutualFundsUnitsChange({ symbol: company[0]?.symbol })
      );
      dispatch(
        actions.getSectorwiseMutualFunds({ symbol: company[0]?.symbol })
      );
      dispatch(
        actions.getHystoricMutualFundsHoldings({ symbol: company[0]?.symbol })
      );
    }
  }, [company[0]]);

  function topNegativeChange(data) {
    // Change negative unitDifference values into positive
    let dataWithPositiveUnitDifference = data?.map((entry) => ({
      investedSymbol: entry?.investedSymbol,
      unitDifference: Math?.abs(entry?.unitDifference),
    }));
    // Sort the data by unitDifference in descending order
    dataWithPositiveUnitDifference?.sort(
      (a, b) => b?.unitDifference - a?.unitDifference
    );
    // Select the top 7 entries
    return dataWithPositiveUnitDifference?.slice(0, 20);
  }
  let topSellData = topNegativeChange(mutualFundsUnitsChange?.data?.Negative);

  function topPositiveChange(data) {
    let dataWithPositiveUnitDifference = data?.map((entry) => ({
      investedSymbol: entry?.investedSymbol,
      unitDifference: Math?.abs(entry?.unitDifference),
    }));
    dataWithPositiveUnitDifference?.sort(
      (a, b) => b?.unitDifference - a?.unitDifference
    );
    return dataWithPositiveUnitDifference?.slice(0, 20);
  }
  let positiveData = topPositiveChange(mutualFundsUnitsChange?.data?.Positive);

  // Hystoric data
  let mutualFundsHystoricData;
  let allHystoricData;
  if (hystoricMutualFundsHoldings !== undefined) {
    allHystoricData = hystoricMutualFundsHoldings?.data;
    let uniqueInvestedSymbols = [
      ...new Set(
        hystoricMutualFundsHoldings?.data?.map((item) => item?.invested_symbol)
      ),
    ];
    mutualFundsHystoricData = uniqueInvestedSymbols?.map((symbol) => ({
      label: symbol,
      value: symbol,
    }));
  }

  const onStockChange = (value) => {
    setSelectedStock(value);
  };
  const onStockSearch = (value) => {
    // console.log('search:', value);
  };

  let filterHystoricData = allHystoricData
    ?.filter((item) => {
      const selectedStockValue =
        selectedStock === null || selectedStock === undefined
          ? mutualFundsHystoricData?.[0]?.value
          : selectedStock;
      return item?.invested_symbol === selectedStockValue;
    })
    .map(({ invested_symbol, units, period }) => ({
      invested_symbol,
      units,
      period,
    }));

  const discountPremiumNav = (
    ((company?.[0]?.lastTradedPrice -
      mutualFundsNavData?.data?.recentNav?.[0]?.svalue) /
      mutualFundsNavData?.data?.recentNav?.[0]?.svalue) *
    100
  )?.toFixed(2);

  const MFRecentYear = mutualFundsTopInvestmentSector?.data?.[0]?.period;

  let sortedNavData = [];
  let navData = mutualFundsNavData?.data?.mutualFundsNavData;
  // Check if navData is a valid array
  if (Array.isArray(navData) && navData.length > 0) {
    sortedNavData = navData
      ?.map((data) => ({ ...data }))
      .sort((a, b) => {
        if (!a?.period || !b?.period) return 0;

        const [aMonth, aYear] = a.period.split("/");
        const [bMonth, bYear] = b.period.split("/");

        const aDate = new Date(`${aYear}-${aMonth}-01`);
        const bDate = new Date(`${bYear}-${bMonth}-01`);

        return aDate - bDate;
      });
  } else {
    console.error("Nav Data is not an array or is empty.");
    // Handle the case where navData is not valid
  }

  let sortedHoldingsData = [];
  if (Array.isArray(filterHystoricData) && filterHystoricData.length > 0) {
    sortedHoldingsData = filterHystoricData
      ?.map((data) => ({ ...data }))
      .sort((a, b) => {
        if (!a?.period || !b?.period) return 0;

        const [aMonth, aYear] = a.period.split("/");
        const [bMonth, bYear] = b.period.split("/");

        const aDate = new Date(`${aYear}-${aMonth}-01`);
        const bDate = new Date(`${bYear}-${bMonth}-01`);

        return aDate - bDate;
      });
  } else {
    console.error("Holdings data is not an array or is empty.");
    // Handle the case where navData is not valid
  }

  return (
    <>
      <div className="mt-[20px]">
        <div className="flex justify-center">
          <div
            className="mutual-fund-header flex justify-between bg-secondary shadow-md mt-[20px] align-middle 
                    py-[8px] px-[20px] text-center w-[70%] rounded-[20px]"
          >
            <div>
              <p className="text-[#4E5969] font-[500] ">Monthly Nav</p>
              <p className="font-[600] mt-[4px]">
                {" "}
                {mutualFundsNavData?.data?.recentNav?.[0]?.svalue}
              </p>
            </div>
            <div>
              <p className="text-[#4E5969] font-[500] ">
                {" "}
                {discountPremiumNav > 0 ? "Premium" : "Discount"}
              </p>
              <p
                className={` ${
                  discountPremiumNav > 0 ? "text-danger" : "text-success"
                } font-[600] mt-[4px]`}
              >
                {discountPremiumNav} %
              </p>
            </div>
            {/* <div>
                            <p className="text-[#4E5969] font-[500] ">Fund Size</p>
                            <p className="font-[600] mt-[4px]">12 Million</p>
                        </div> */}
            <div>
              <p className="text-[#4E5969] font-[500] ">Maturity Date</p>
              <p className="font-[600] mt-[4px]">
                {
                  mutualFundsNavData?.data?.recentNav?.[0]?.maturityDate?.split(
                    "T"
                  )?.[0]
                }
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[30px] mb-[20px] w-full bg-secondary shadow-md p-[20px] rounded-[20px]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold lg:text-lg uppercase">
              Net Assets Value (NAV)
            </h2>
          </div>
          <MutalFundLineChart data={sortedNavData} />
        </div>

        <div className="mt-[30px] lg:grid lg:grid-cols-2 pt-2 gap-10 mb-[20px]">
          <div className="w-full bg-secondary shadow-md p-[20px] rounded-[20px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-lg uppercase">
                Preferred Sector
              </h2>
              <Tag color="cyan">as of {MFRecentYear}</Tag>
            </div>
            <MutalFundPieChart
              title="Preferred Sector"
              data={sectorwiseMutualFund?.data}
            />
          </div>
          <div className="w-full bg-secondary shadow-md p-[20px] rounded-[20px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-lg uppercase">
                Preffered Companies
              </h2>
              <Tag color="cyan">as of {MFRecentYear}</Tag>
            </div>
            <MutalFundPieChart
              title="Preffered Companies"
              data={mutualFundsTopInvestmentSector?.data}
            />
          </div>
        </div>

        <div className="mt-[30px] pt-2 mb-[20px]">
          <div className="w-full bg-secondary shadow-md p-[20px] mb-[40px] rounded-[20px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-lg uppercase">
                Top Buy
              </h2>
              {isLoggedIn && is_subscribed && (
                <Tag color="cyan">as of {MFRecentYear}</Tag>
              )}
            </div>
            {isLoggedIn && is_subscribed ? (
              <MutualFundBuySellChart title="Top Buy" data={positiveData} />
            ) : (
              <div className="w-[100%] justify-between">
                <div className="relative flex flex-col min-h-[300px]">
                  <div className="flex justify-center w-[800px] lg:w-[1100px] 2xl:w-[1300px]">
                    <Link className="z-20 mt-28" href="/subscription-plan">
                      <button className="bg-primary m-4 hover:bg-primary-2 font-serif lg:mt-8 w-44 lg:w-32 text-secondary rounded-full py-1 cursor-pointer lg:text-sm text-2xl flex items-center justify-center">
                        Subscribe
                        <span className="text-secondary text-3xl lg:text-xl ml-2">
                          <AiFillLock />
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div
                    className="absolute py-5 gap-6 bg-[#ffffff] opacity-40 w-full"
                    style={{ filter: "blur(3px)" }}
                  >
                    <div className="flex justify-between w-full">
                      <DummyLineChart />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full bg-secondary shadow-md p-[20px] mb-[20px] rounded-[20px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-lg uppercase">
                Top Sell
              </h2>
              {isLoggedIn && is_subscribed && (
                <Tag color="cyan">as of {MFRecentYear}</Tag>
              )}
            </div>
            {isLoggedIn && is_subscribed ? (
              <MutualFundBuySellChart title="Top Sell" data={topSellData} />
            ) : (
              <div className="w-[100%] justify-between">
                <div className="relative flex flex-col min-h-[300px]">
                  <div className="flex justify-center w-[800px] lg:w-[1100px] 2xl:w-[1300px]">
                    <Link className="z-20 mt-28" href="/subscription-plan">
                      <button className="bg-primary m-4 hover:bg-primary-2 font-serif lg:mt-8 w-44 lg:w-32 text-secondary rounded-full py-1 cursor-pointer lg:text-sm text-2xl flex items-center justify-center">
                        Subscribe
                        <span className="text-secondary text-3xl lg:text-xl ml-2">
                          <AiFillLock />
                        </span>
                      </button>
                    </Link>
                  </div>
                  <div
                    className="absolute py-5 gap-6 bg-[#ffffff] opacity-40 w-full"
                    style={{ filter: "blur(3px)" }}
                  >
                    <div className="flex justify-between w-full">
                      <DummyLineChart />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-[30px] pt-2 mb-[20px] bg-secondary shadow-md rounded-[20px]">
          <div className="py-[10px] px-[20px] flex justify-between">
            <h2 className="font-[700] lg:text-[18px] text-4xl text-[#464646]">
              Holdings
            </h2>
            <div className="w-[20%] h-[36px]">
              <Select
                showSearch
                placeholder="Select a stock"
                optionFilterProp="children"
                onChange={onStockChange}
                onSearch={onStockSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={mutualFundsHystoricData}
                className="w-[100%] h-[36px]"
              />
            </div>
          </div>
          <MutalFundLineChart data={sortedHoldingsData} title="Holdings" />
          <h1 className="text-center py-[10px] font-[600]">
            {selectedStock
              ? selectedStock
              : mutualFundsHystoricData?.[0]?.value}
          </h1>
        </div>

        <div className="mt-[30px] lg:grid lg:grid-cols-2 pt-2 gap-10 pb-[20px]">
          <div className="w-full bg-secondary shadow-md p-[20px] rounded-[20px]">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold lg:text-lg uppercase">
                Fund Allocation
              </h2>
              <Tag color="cyan">as of {MFRecentYear}</Tag>
            </div>
            <MutalFundPieChart
              title="Fund Allocation"
              data={mutualFundsInvestmentAreas?.data}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MutalFundBreakDown;
