"use client";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import SectorDistributionChart from "./SectorDistributionChart";
import { formatMoney } from "@/utils/formatMoney";

const SectorDistribution = () => {
  let data = {};
  const { portfolioHolderByShid } = useSelector((state) => state.portfolio);

  if (portfolioHolderByShid.portfolioHolder !== undefined) {
    if (portfolioHolderByShid?.portfolioHolder?.sector !== undefined) {
      data = portfolioHolderByShid?.portfolioHolder?.sector;
    }
  }
  const totalValue = Object.values(data).reduce(
    (sum, category) => sum + category["Total Value"],
    0
  );

  return (
    <>
      <div className="sector-distribution pt-[80px] px-[60px] lg:px-0">
        {Object?.keys(data)?.length > 0 && (
          <>
            <h5 className="lg:text-[18px] text-[28px] font-semibold pb-7">
              Sector Distribution
            </h5>
            <div className="sector-distribution-data bg-white rounded-md flex justify-between min-h-[100px] py-10">
              <div className="left w-[50%] ">
                <div className="progress-bar pl-10 w-[100%]">
                  {Object.keys(data).length > 0 &&
                    Object.keys(data).map((sector, id) => {
                      return (
                        <>
                          <p className="lg:text-[16px] text-[22px] font-semibold">
                            {sector}
                          </p>
                          <Progress
                            percent={
                              (data[sector]["Total Value"] / totalValue) * 100
                            }
                            format={(percent) =>
                              `Rs ${formatMoney(
                                data[sector]["Total Value"]?.toFixed(2)
                              )}`
                            }
                            strokeColor={
                              data[sector].sector_color
                                ? data[sector].sector_color
                                : "red"
                            }
                            status="active"
                            className="text-[#7B3DD1] mb-6 text-[22px] lg:text-[16px]"
                          />
                        </>
                      );
                    })}
                </div>
              </div>
              <div className="right w-[50%]">
                {Object.keys(data).length > 0 && (
                  <SectorDistributionChart data={data} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default SectorDistribution;
