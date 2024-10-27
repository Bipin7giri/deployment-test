import React, { useState } from "react";
import MutualFundBuySellChart from "./MutualFunds/MutualFundBuySellChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actions from "../redux/actions";

export default function CompaniesMutualFundStatus({ fakeData }) {
  const dispatch = useDispatch();
  const { company, loading, equityMutualFundsUnits } = useSelector(
    (state) => state.company
  );
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);

  const [routeActive, setRouteActive] = useState(0);

  const PCRoute = [
    { label: "Top Buy", value: "topBuy" },
    { label: "Top Sell", value: "topSell" },
  ];

  useEffect(() => {
    if (!fakeData && is_subscribed) {
      dispatch(
        actions.getEquityMutualFundsUnitsChange({
          symbol: company?.[0]?.symbol,
        })
      );
    }
  }, [company]);

  let topSellData;
  let positiveData;
  if (!fakeData) {
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
      return dataWithPositiveUnitDifference?.slice(0, 5);
    }
    topSellData = topNegativeChange(equityMutualFundsUnits?.data?.Negative);

    function topPositiveChange(data) {
      let dataWithPositiveUnitDifference = data?.map((entry) => ({
        investedSymbol: entry?.investedSymbol,
        unitDifference: Math?.abs(entry?.unitDifference),
      }));
      dataWithPositiveUnitDifference?.sort(
        (a, b) => b?.unitDifference - a?.unitDifference
      );
      return dataWithPositiveUnitDifference?.slice(0, 5);
    }
    positiveData = topPositiveChange(equityMutualFundsUnits?.data?.Positive);
  }
  
  return (
    <>
      <div className="block">
        <div className="flex justify-end mb-[30px]">
          <div>
            <ul className="flex justify-end mb-2 items-center">
              {equityMutualFundsUnits?.data && Object?.keys(equityMutualFundsUnits?.data)?.length > 0 &&
                PCRoute?.map((route, id) => {
                  return (
                    <>
                      <li
                        style={{ fontFamily: "poppins" }}
                        className="text-primary lg:text-[15px] pt-3 mt-[-12px] cursor-pointer"
                      >
                        <button
                          onClick={() => {
                            setRouteActive(id);
                          }}
                          style={{ paddingBottom: "7px" }}
                          className={`${routeActive === id
                            ? "bg-black text-secondary"
                            : "bg-secondary text-primary border border-black"
                            } border border-gray-200 w-[200px] lg:w-auto cursor-pointer px-2 py-4 lg:px-4 lg:py-2 lg:text-xs text-2xl leading-5 mr-3 rounded-full mb-4`}
                        >
                          {route?.label}
                        </button>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
        {routeActive === 0 && (
          <>
            <MutualFundBuySellChart
              title="Top Buy"
              data={fakeData ? fakeData : positiveData}
            />
          </>
        )}
        {routeActive === 1 && (
          <>
            <MutualFundBuySellChart
              title="Top Sell"
              data={fakeData ? fakeData : topSellData}
            />
          </>
        )}
      </div>
    </>
  );
}
