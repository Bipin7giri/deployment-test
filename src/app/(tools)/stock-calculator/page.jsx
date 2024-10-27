"use client";
import { useState } from "react";
import Calculator from "./stockCalculator";
import PriceAdjustmentCalculator from "./priceAdjustmentCalculator";
import SIPCalculator from "./SIPCalculator";
import { Helmet } from "react-helmet";
// import usePageViewTracking from "@/services/usePageViewTracking";

const StockCalculator = () => {
  // usePageViewTracking();
  const [routeActive, setRouteActive] = useState(0);
  const calculator = [
    "Secondary Calculator",
    "Price Adjustment Calculator",
    "SIP Calculator",
  ];
  return (
    <>
      <Helmet>
        <title>{`Calculator | Saral Lagani`}</title>
        <meta charset="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          content="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta property="og:title" content={` Calculator | Saral Lagani `} />
        <meta
          property="og:description"
          content={
            "Calculate the buy rate sale rate adjustment price for the stock in NEPSE. Also Calculate the SIP amount for  montly and lumpsum amount"
          }
        />
        <meta
          name="description"
          content={`Calculate the buy rate sale rate adjustment price for the stock in NEPSE. Also Calculate the SIP amount for  montly and lumpsum amount`}
        />
        <meta
          name="keywords"
          content="Stock Calculator, NEPSE calculator, Right Adjustment Calculator, Bonus Adjustment, SIP Lumpsum, SIP Monthly"
        />
        <meta property="og:url" content="https://sarallagani.com/" />
      </Helmet>
      <div className="bg-[#F4F6F9]">
        <div className="lg:px-48 px-[60px] lg:py-5 py-[80px]">
          <div className="lg:container w-full mt-40 lg:mt-0  gap-10 px-4 mx-auto">
            <div className="flex justify-between my-5">
              <div>
                <ul className="flex mb-2 items-center gap-4 lg:gap-10  ">
                  {calculator.map((route, id) => {
                    return (
                      <>
                        <li
                          style={{ fontFamily: "poppins" }}
                          className="text-primary    hover:bg-blue-100 px-[5px] pt-3 mt-[-12px]  cursor-pointer"
                        >
                          <button
                            onClick={() => {
                              setRouteActive(id);
                              // navigateRoute(route);
                            }}
                            style={{ paddingBottom: "15px" }}
                            className={`${
                              routeActive === route
                                ? "text-primary  "
                                : "text-[#3A6FF8]"
                            } text-[24px] lg:text-[14px]`}
                          >
                            {route}
                          </button>
                          {routeActive === id && (
                            <div className="border-[#3A6FF8] ml-[-5px] w-[105%]  border-b-[3px]"></div>
                          )}
                        </li>
                      </>
                    );
                  })}
                </ul>
                <div className="border-b-[3px] mt-[-11px]  border-[#dadaee]"></div>
              </div>
            </div>

            {routeActive === 0 && <Calculator />}
            {routeActive === 1 && <PriceAdjustmentCalculator />}
            {routeActive === 2 && <SIPCalculator />}
          </div>
        </div>
      </div>
    </>
  );
};
export default StockCalculator;
