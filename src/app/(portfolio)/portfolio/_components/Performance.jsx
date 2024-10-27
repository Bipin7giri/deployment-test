"use client";
import { formatMoney } from "@/utils/formatMoney";
import { Link } from "next/link";
import { useSelector } from "react-redux";

const Performance = () => {
  const { portfolioHolderByShid } = useSelector((state) => state.portfolio);

  // for best and worst performer
  let bestPerformer = [];
  let worstPerformer = [];
  if (portfolioHolderByShid.portfolioHolder !== undefined) {
    if (portfolioHolderByShid?.portfolioHolder?.best_performer !== undefined) {
      bestPerformer = portfolioHolderByShid.portfolioHolder.best_performer;
    }
    if (portfolioHolderByShid?.portfolioHolder?.least_performer !== undefined) {
      worstPerformer = portfolioHolderByShid.portfolioHolder.least_performer;
    }
  }

  return (
    <>
      <div className="my-5 pt-[40px] px-[60px] lg:px-0">
        <div className="performance-check my-5 flex justify-between">
          {portfolioHolderByShid?.portfolioHolder?.best_performer?.length >
            0 && (
            <>
              <div className="best-performer">
                <h5 className="mb-0 mt-[5px] lg:text-[18px] text-[28px] font-semibold pb-7">
                  Best Performer
                </h5>
                <div className="mt-[14px] flex justify-between lg:gap-10 gap-5">
                  {bestPerformer.length > 0 ? (
                    bestPerformer.map((item, id) => {
                      return (
                        <div
                          className="rounded-md px-4 py-4 bg-secondary    lg:w-[205px] w-[180px]"
                          key={id}
                        >
                          <table className="w-[100%]">
                            {/* (total_value- buy_amount/ buy_amount) * 100 */}
                            <tbody>
                              <tr>
                                <td className="w-[50%] text-primary text-[16px] text-left font-[500]">
                                  {" "}
                                  <Link href={`/company/${item?.symbol}`}>
                                    {" "}
                                    {item?.symbol}{" "}
                                  </Link>{" "}
                                </td>
                                <td
                                  className="w-[50%] text-green text-right"
                                  style={{ color: "#1ECB4F", fontSize: "12px" }}
                                >
                                  {" "}
                                  {item?.gain_percent?.toFixed(2)} %{" "}
                                </td>
                              </tr>
                              <tr>
                                <td className="w-[50% text-left">
                                  <p className="!text-primary text-[14px]">
                                    Buy amount
                                  </p>
                                  <p className="text-primary opacity-60 text-[14px]">
                                    Rs. {formatMoney(item?.buy_amount)}
                                  </p>
                                </td>
                                <td
                                  className="w-[50%] text-green text-right"
                                  style={{ color: "#000", fontSize: "14px" }}
                                >
                                  <p className="!text-primary text-[14px]">
                                    Total Profit
                                  </p>
                                  <p className="text-primary opacity-60 text-[14px]">
                                    Rs. {formatMoney(item?.total_gain)}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-md px-4 py-10 bg-white ">
                      No Data Found
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {portfolioHolderByShid?.portfolioHolder?.least_performer?.length >
            0 && (
            <>
              <div className="worse-performer">
                <h5 className="mb-0 mt-[5px] lg:text-[18px] text-[28px] font-semibold pb-7">
                  Worst Performer
                </h5>
                <div className="mt-[14px] flex justify-between lg:gap-10 gap-5">
                  {worstPerformer.length > 0 ? (
                    worstPerformer.map((item, id) => {
                      return (
                        <div
                          className="rounded-md px-4 py-4 bg-secondary lg:w-[205px] w-[180px]"
                          key={id}
                        >
                          <table className="w-[100%]">
                            <tbody>
                              <tr>
                                <td className="w-[50%] text-primary text-left font-[500] text-[16px]">
                                  <Link
                                    href={`/company/${item?.symbol}`}
                                    className="lg:text-[16px] text-[18px] "
                                  >
                                    {" "}
                                    {item?.symbol}{" "}
                                  </Link>
                                </td>
                                <td
                                  className="w-[50%] text-green text-right"
                                  style={{ color: "#F76560", fontSize: "12px" }}
                                >
                                  {" "}
                                  {item?.gain_percent?.toFixed(2)} %
                                </td>
                              </tr>
                              <tr>
                                <td className="w-[50% text-left">
                                  <p className="!text-primary text-[14px]">
                                    Buy amount
                                  </p>
                                  <p className="text-primary opacity-60 text-[14px]">
                                    Rs. {formatMoney(item?.buy_amount)}
                                  </p>
                                </td>
                                <td
                                  className="w-[50%] text-green text-right"
                                  style={{ color: "#000", fontSize: "14px" }}
                                >
                                  <p className="!text-primary text-[14px]">
                                    Total Loss
                                  </p>
                                  <p className="text-primary opacity-60 text-[14px]">
                                    Rs. {formatMoney(item?.total_gain)}
                                  </p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-md px-4 py-10 bg-white">
                      No Data Found
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* <div className="perforamnce mt-8 pt-[40px]">
                    <h5 className='text-[18px] font-semibold pb-2'>Performance</h5>
                    <div className="performance-data  bg-secondary    rounded-md shadow-md h-[500px]">
                        <StockPerformanceChart />
                    </div>
                </div>
                <hr /> */}
      </div>
    </>
  );
};
export default Performance;
