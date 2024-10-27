"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import PortfolioVsInflationChart from "./PortfolioVsInflationChart";
import { Tooltip } from "antd";
import { GiMoneyStack } from "react-icons/gi";

export default function PortfolioVsInflation() {
  const dispatch = useDispatch();
  const { loading, shareHolderId, portfolioVsInflation } = useSelector(
    (state) => state.portfolio
  );
  const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);

  const [isSuscribeHover, setIsSuscribehover] = useState(false);

  useEffect(() => {
    if (shareHolderId !== undefined && shareHolderId !== null) {
      dispatch(actions.portfolioVsInflation({ id: shareHolderId }));
    }
  }, [shareHolderId]);

  let data = [];
  if (
    portfolioVsInflation?.data !== undefined &&
    portfolioVsInflation?.data?.length > 0
  ) {
    data = portfolioVsInflation?.data;
  }

  const handlePaidFeature = () => {
    navigate(`/subscription-plan`);
  };

  return (
    <>
      <div className="my-5 pt-[40px] px-[60px] lg:px-0">
        <h5 className="mb-0 mt-[5px] lg:text-[18px] text-[28px] font-semibold pb-7">
          Portfolio VS Inflation
        </h5>
        {is_subscribed ? (
          <div className="rounded-[20px] bg-secondary py-[20px]">
            <PortfolioVsInflationChart height={400} data={data} />
          </div>
        ) : (
          <>
            <div
              className="inset-0 border-[2px] border-gray-500 bg-[#ffffff] opacity-40 "
              style={{ filter: "blur(3px)" }}
            >
              <PortfolioVsInflationChart height={400} data={data} />
            </div>
            <div className="flex justify-center">
              <div className="absolute 2xl:-mt-[30vh] xl:-mt-[44vh] lg:-mt-[44vh] -mt-[60vh] sm:-mt-[20vh] px-5 z-[99]">
                <Tooltip
                  title="Suscribe SaralLagani for this feature"
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
                        {" "}
                        <GiMoneyStack className="text-2xl text-secondary" />{" "}
                      </div>
                    )}
                  </button>
                </Tooltip>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
