import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./redux/actions";
import BalanceSheet from "./component/Tables/BalanceSheet";
import { Skeleton, Tooltip } from "antd";

const Ratio = ({ symbol, sector }) => {
  let quartersArrayValue = ["Q1", "Q2", "Q3", "Q4"];
  let quartersArrayName = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
  const dispatch = useDispatch();
  const [quarter, setQuarter] = useState("Q1");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isQuarterly, setIsQuarterly] = useState(true);
  const [isAnnualy, setIsAnnualy] = useState(false);
  const [isPercentage, setIsPercentage] = useState(false);
  const [isAnnualHover, setIsAnnualhover] = useState(false);
  const { currentQuarter, sectorInfo, isFinancialLoading, annualRatio } = useSelector(
    (state) => state.company
  );
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);

  useEffect(() => {
    const ratio_quarter_table_array =
      sectorInfo[0]?.ratio_quarter_table?.split(",");
    if (symbol !== annualRatio?.[0]?.data?.symbol) {
      dispatch(
        actions.quarterRatio({
          tableIds: [6],
          symbol: symbol,
          quarter: currentQuarter,
        })
      );
      setIsDataLoaded(true)
    }
  }, [symbol]);

  const handleQuarter = (id) => {
    const ratio_quarter_table_array =
      sectorInfo[0]?.ratio_quarter_table?.split(",");
    dispatch(
      actions.quarterRatio({
        tableIds: [6],
        symbol: symbol,
        quarter: id,
      })
    );
  };
  const handleAnnually = () => {
    const ratio_annual_table_array =
      sectorInfo[0]?.ratio_annual_table?.split(",");
    dispatch(
      actions.annualRatio({
        tableIds: [3],
        symbol: symbol,
        quarter: quarter,
      })
    );
  };

  const navigateSubscriptionPage = () => {
    navigate(`/subscription-plan`);
  };

  // quaterBalanceSheetOne
  return (
    <>
      <div className="flex mt-5 z-10 items-center justify-between">
        <div></div>
        <div className="flex items-center  gap-4">
          <div className="z-10 text-2xl lg:text-sm">
            {(isLoggedIn && is_subscribed) ? (
              <button
                className={
                  isAnnualy === false
                    ? "text-[#5281F9]"
                    : "border-b font-semibold border-[#5281F9] "
                }
                onClick={() => {
                  setIsAnnualy(true);
                  setIsQuarterly(false);
                  handleAnnually();
                }}
              >
                Annual
              </button>
            ) : (
              <div
                className="cursor-pointer"
                onMouseOver={() => setIsAnnualhover(true)}
                onMouseOut={() => setIsAnnualhover(false)}
              >
                <Tooltip title="Subscription Required" className="flex gap-2">
                  <button
                    style={{ filter: "blur(0.5px)" }}
                    className={
                      isAnnualy === false
                        ? "text-[#5281F9]"
                        : "border-b font-semibold border-[#5281F9]"
                    }
                    onClick={() => {
                      navigateSubscriptionPage();
                    }}
                  >
                    Annual
                  </button>
                  {isAnnualHover && (
                    <div className="">
                    </div>
                  )}
                </Tooltip>
              </div>
            )}
          </div>
          <div className="z-10  lg:text-sm  text-3xl">
            <button
              onClick={() => {
                setIsAnnualy(false);
                setIsQuarterly(true);
                handleQuarter(currentQuarter);
              }}
              className={isQuarterly != true ? "text-[#5281F9]" : ""}
            >
              Quarterly
            </button>
          </div>
          <div>
            {isQuarterly && (
              <div className="z-10  lg:text-sm  text-3xl">
                <select
                  defaultValue={currentQuarter}
                  onChange={(e) => {
                    setQuarter(e.target.value);
                    handleQuarter(e.target.value);
                  }}
                >
                  {quartersArrayValue?.map((item, id) => {
                    return (
                      <>
                        <option className="text-extrasmall" value={item}>
                          {quartersArrayName[id]}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFinancialLoading && (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      )}
      <>
        {!isFinancialLoading && (
          <>
            {annualRatio?.map((item, id) => {
              return (
                <>
                  <div className="pb-10 min-h-[50vh]">
                    <div className="flex items-center justify-between my-4">
                      <div>
                        <h2 className="font-semibold text-medium">
                          {item?.data?.data?.table_heading}
                        </h2>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <div>
                            <button
                              onClick={() => {
                                setIsPercentage(false);
                              }}
                              className={
                                !isPercentage
                                  ? "bg-black text-secondary  text-medium rounded-xl px-6 lg:px-2 py-2 lg:py-0 text-3xl lg:text-sm"
                                  : "text-primary   rounded-xl text-medium px-6 lg:px-2 py-2 lg:py-0 text-3xl lg:text-sm"
                              }
                            >
                              Rs
                            </button>
                            <button
                              onClick={() => {
                                setIsPercentage(true);
                              }}
                              className={
                                isPercentage
                                  ? "bg-black text-secondary  text-medium rounded-xl px-6 lg:px-2 py-2 lg:py-0 text-3xl lg:text-sm"
                                  : "text-primary   rounded-xl lg:px-2 px-6 py-2 lg:py-0 text-medium text-3xl lg:text-sm"
                              }
                            >
                              %
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {!isFinancialLoading && (
                        <BalanceSheet
                          isRatio={true}
                          data={item?.data?.data}
                          isPercentage={isPercentage}
                          sector={sector}
                          ratioQuater={quarter}
                          isRatioQuater={isQuarterly}
                        />
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}

        {/* Assets Table */}
      </>
    </>
  );
};

export default Ratio;
