"use client";
import { Anchor } from "antd";
import News from "./News";
import Stock from "./Stock";
import StockAddForm from "./StockAddForm";
// import ExcelImport from "../../components/ExcelImport";
import SectorDistribution from "./SectorDistribution";
import SectorProfitability from "./SectorProfitability";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CSVPopUp from "./CSVPopUp";
import PortfolioVsInflation from "./PortfolioVsInflation";
import Performance from "./Performance";

const BreakDownPortfolio = () => {
  const { shareHolderId } = useSelector((state) => state.portfolio);
  const [anchorTop, setAnchorTop] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.pageYOffset > 50) {
          setAnchorTop("relative");
        } else {
          setAnchorTop("");
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      <div className="lg:bg-[#F4F6F9]">
        <div className="break-down-portfolio pb-10 container max-w-screen-lg mx-auto pt-[-20px]">
          <div className="lg:px-[2px] px-[60px] z-[9] relative lg:top-0 top-[-160px] ">
            <Anchor
              className={`${anchorTop} lg:z-[9] z-[-9999] lg:top-[10vh] top-[7vh] lg:mt-0 lg:relative inherit bg-[#F4F6F9] lg:mb-[80px] mb-[40px]`}
              direction="horizontal"
              items={[
                {
                  key: "stock",
                  href: "#stock",
                  title: "Stock",
                },
                {
                  key: "sector",
                  href: "#sector",
                  title: "Sector",
                },
                {
                  key: "sector-profitability",
                  href: "#sector-profitability",
                  title: "Sector’s Profitability",
                },
                {
                  key: "performance",
                  href: "#performance",
                  title: "Performance",
                },
                {
                  key: "                                                                       ",
                  href: "#",
                  title: "",
                },
                // {
                //   key: 'news',
                //   href: '#news',
                //   title: 'News',
                // },
                {
                  title: (
                    <div className="right-part flex flex-wrap justify-end r-0">
                      <CSVPopUp />
                      <button className="text-secondary  bg-black py-1 rounded-md d-block">
                        {" "}
                        <StockAddForm
                          add="+ Add More"
                          title="Add More Stock"
                          holderID={shareHolderId}
                        />{" "}
                      </button>
                    </div>
                  ),
                },
              ]}
            ></Anchor>
          </div>
          <div>
            <div
              id="stock"
              style={{ width: "auto", height: "auto", padding: "0 10px" }}
            >
              <Stock />
            </div>
            <div
              id="sector"
              style={{ width: "auto", height: "auto", padding: "0 10px" }}
            >
              <SectorDistribution />
            </div>
            <div
              id="sector-profitability"
              style={{ width: "auto", height: "auto", padding: "0 10px" }}
            >
              <SectorProfitability />
            </div>
            <div
              id="performance"
              style={{ width: "auto", height: "auto", padding: "0 10px" }}
            >
              {/* <Performance /> */}
            </div>
            <div
              id="performance"
              style={{ width: "auto", height: "auto", padding: "0 10px" }}
            >
              <PortfolioVsInflation />
            </div>
            {/* <div
              id="news"
              style={{ width: "auto", height: "auto", padding: "0 10px" }}
            >
              <News />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default BreakDownPortfolio;
