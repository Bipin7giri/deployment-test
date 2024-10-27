"use client";
import { Collapse, Space } from "antd";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatMoney } from "@/utils/formatMoney";

const { Panel } = Collapse;

const SectorProfitability = () => {
  let data = {};
  const { portfolioHolderByShid } = useSelector((state) => state.portfolio);

  if (portfolioHolderByShid.portfolioHolder !== undefined) {
    if (portfolioHolderByShid?.portfolioHolder?.sector !== undefined) {
      data = portfolioHolderByShid?.portfolioHolder?.sector;
    }
  }
  const totalInvestment = Object?.values(data)?.reduce(
    (sum, category) => sum + category["Total Investment"],
    0
  );
  // const totalInvestment = Object.values(data).reduce((sum, category) => sum + category.total_investment, 0);
  let sectorInvestment;
  const genExtra = (sector) => {
    sectorInvestment = (
      (data[sector]["Total Investment"] / totalInvestment) *
      100
    )?.toFixed(2);
    return (
      <>
        <div className="text-center mr-[100px]">
          <p
            className="lg:text-16 text-[18px] font-normal"
            style={{ fontWeight: "500" }}
          >
            % Investment
          </p>
          <p
            className={`text-primary lg:text-16 text-[16px] font-normal`}
            style={{ fontWeight: "500" }}
          >
            {sectorInvestment}%
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="sector-profitablity pt-[80px] px-[60px] lg:px-0">
        {Object?.keys(data)?.length > 0 && (
          <>
            <h5 className="lg:text-[18px] text-[28px] font-semibold pb-7">
              Sector Profitability
            </h5>
            <div className="sector-profitability-data">
              <Space direction="vertical" className="w-[100%]">
                {Object?.keys(data)?.map((sector, id) => {
                  const title = Object?.keys(data[sector]);
                  const heading = title?.filter(
                    (item) => item !== "sector_color" && item !== "sector_icon"
                  );
                  return (
                    <Collapse accordion key={id}>
                      <Panel
                        header={
                          <div className="flex w-full">
                            <div className="sector-profitability-collapse text-green-700">
                              <FontAwesomeIcon
                                icon={data[sector].sector_icon}
                                className="text-[#08bf82] text-5xl lg:text-xl rounded-md bg-[#F4F6F9] px-[8px] py-[6px]  "
                                style={{
                                  color:
                                    parseFloat(data[sector]["Total Gain"]) > 0
                                      ? "#08bf82"
                                      : "#DC2626",
                                }}
                              />
                            </div>
                            <p className="lg:text-[15px] text-[22px] mt-[10px]">
                              {sector}
                            </p>
                          </div>
                        }
                        key={id + 1}
                        extra={genExtra(sector)}
                      >
                        <table className="w-[100%]">
                          <tbody>
                            {heading?.map((item, id) => {
                              return (
                                <tr key={id}>
                                  <td
                                    className="w-[50%] text-left"
                                    style={{
                                      color: "#000",
                                      fontSize: "16px",
                                      paddingLeft: "20px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {item}
                                  </td>
                                  <td
                                    className="w-[50%] text-right"
                                    style={{
                                      color: "#000",
                                      fontSize: "16px",
                                      paddingRight: "20px",
                                      fontWeight: "500",
                                    }}
                                  >{`${formatMoney(data[sector][item])}`}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </Panel>
                    </Collapse>
                  );
                })}
              </Space>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default SectorProfitability;
