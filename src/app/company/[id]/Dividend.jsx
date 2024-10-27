import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../utils/formatDate";
import actions from "./redux/actions";
import { Skeleton } from "antd";
import api from "../../../api/axios";
import { AiOutlineBarChart, AiOutlineTable } from "react-icons/ai";
import StatisticsBarChart from "./component/StatisticsBarChart";
import StatisticsTable from "./component/StatisticsTable";

const Dividend = ({ symbol }) => {
  const dispatch = useDispatch();
  const {
    dividend,
    isDividendLoading,
    isDividendError,
    dividendYieldBySymbol,
  } = useSelector((state) => state.company);

  const [isDividend, setIsDividend] = useState(true);
  const [rightShareData, setRightShareData] = useState([]);
  const [isRightShareDataLoading, setRightShareDataLoading] = useState(true);
  const [routeActive, setRouteActive] = useState(0);

  useEffect(() => {
    if (isDividend) {
      dispatch(actions.dividend({ symbol: symbol }));
    } else {
      fetchRightShareData();
    }
  }, [symbol, isDividend]);

  useEffect(() => {
    dispatch(actions.getDividendYieldBySymbol({ symbol: symbol }));
  }, [symbol]);

  if (isDividendError) {
    return (
      <>
        <h1 className="text-center">
          Something went wrong!! Please try again.
        </h1>
      </>
    );
  }

  const fetchRightShareData = async () => {
    const res = await api.get(`/company/get_right_share/${symbol}`);
    try {
      if (res) {
        setRightShareDataLoading(false);
        setRightShareData(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setRightShareDataLoading(false);
    }
  };

  const dividentRoute = [
    <AiOutlineBarChart
      className="text-5xl lg:text-xl"
      key={"AiOutlineBarChart"}
    />,
    <AiOutlineTable className="text-5xl lg:text-xl" key={"AiOutlineTable"} />,
  ];

  return (
    <>
      <div className="lg:text-sm  text-3xl">
        <p className="text-sm">
          <button
            className={
              isDividend
                ? "border-b text-2xl lg:text-sm mr-3 font-semibold border-[#5281F9]"
                : "text-[#5281F9] mr-3 lg:text-sm text-2xl"
            }
            onClick={() => {
              setIsDividend(true);
            }}
          >
            Dividend
          </button>
          <div className="inline-block absolute h-[20px] min-h-[1em] w-0.5 self-stretch bg-neutral-300 opacity-100 dark:opacity-50"></div>
          <button
            className={
              isDividend
                ? "text-[#5281F9] ml-3 lg:text-sm text-2xl"
                : "border-b text-2xl lg:text-sm ml-3 font-semibold border-[#5281F9]"
            }
            onClick={() => {
              setIsDividend(false);
            }}
          >
            Right Share
          </button>
        </p>
      </div>
      <div className="pb-20">
        {isDividendLoading &&
          ["", "", ""].map((item, id) => (
            <div className="py-5" key={id}>
              <Skeleton className="w-full" active />
              <Skeleton className="w-full" active />
              <Skeleton className="w-full" active />
            </div>
          ))}

        {isDividend ? (
          <>
            <div className="lg:w-1/2 w-full">
              <div>
                <div className="flex justify-end mt-[35px] mb-[3xz0px] ">
                  <div>
                    <ul className="flex justify-end mb-2 items-center gap-5  ">
                      {dividentRoute?.map((route, id) => {
                        return (
                          <>
                            <li
                              style={{ fontFamily: "poppins" }}
                              className="text-primary    lg:text-[15px]  hover:bg-blue-100 px-[5px] pt-3 mt-[-12px]  cursor-pointer"
                            >
                              <button
                                onClick={() => {
                                  setRouteActive(id);
                                }}
                                style={{ paddingBottom: "7px" }}
                                className={`${
                                  routeActive === route
                                    ? "text-primary  "
                                    : "text-[#3A6FF8]"
                                }  text-[24px] xl:text-[18px]`}
                              >
                                {route}
                              </button>
                              {routeActive === id && (
                                <div className="border-[#3A6FF8] ml-[-5px]  w-[145%]  border-b-[3px]"></div>
                              )}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                    <div className="border-b-[3px] mt-[-11px]  border-[#dadaee]"></div>
                  </div>
                </div>
                {routeActive === 0 && <StatisticsBarChart />}
                {routeActive === 1 && <StatisticsTable />}
              </div>
            </div>
          </>
        ) : (
          <>
            <table className="py-36  bg-secondarySecondary text-[#464F60] mt-10 lg:mt-5 lg:px-5 lg:bg-secondary    rounded-md  w-full">
              <thead className="bg-black text-secondary">
                <tr className="border-b xl:text-sm text-2xl">
                  <th className="lg:my-0 lg:py-2 my-2 py-1 rounded-tl-xl">
                    S.N
                  </th>
                  <th className="">Symbol</th>
                  <th className="">Issue Manager</th>
                  <th className="">Opening Date</th>
                  <th className="">Closing Date</th>
                  <th className="">Ratio</th>
                  <th className="rounded-tr-xl">Units</th>
                </tr>
              </thead>
              <tbody className="lg:text-sm  relative text-3xl text-center lg:mt-0 text-primary  ">
                {!isRightShareDataLoading && rightShareData?.length > 0 ? (
                  rightShareData?.map((item, id) => (
                    <tr
                      className={`${
                        id % 2 === 0 ? "bg-[#dad3d346]" : ""
                      } lg:pt-0 pt-8`}
                      key={id}
                    >
                      <td className="text-center font-semibold py-4">
                        {id + 1}
                      </td>
                      <td className="text-center font-semibold">
                        {item?.symbol}
                      </td>
                      <td className="text-center font-medium">
                        {item?.issueManager}
                      </td>
                      <td className="text-center font-medium">
                        {formatDate(item?.opening_date)}
                      </td>
                      <td className="text-center font-medium">
                        {formatDate(item?.closing_date)}
                      </td>
                      <td className="text-center font-medium">{item?.ratio}</td>
                      <td className="text-center font-medium">{item?.units}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center">
                      <div className="w-16 h-20 mx-auto">
                        <svg
                          className="w-full h-full"
                          id="Layer_1"
                          data-name="Layer 1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 108.67 122.88"
                        >
                          <defs>
                            <style
                              dangerouslySetInnerHTML={{
                                __html: ".cls-1{fill-rule:evenodd;}",
                              }}
                            />
                          </defs>
                          <title>no-data</title>
                          <path
                            className="cls-1"
                            d="M25.14,53.37a2.77,2.77,0,0,0,0,5.54H45.25a2.77,2.77,0,0,0,0-5.54Zm60.48-36.9,6.66,6.69-8,8.14,8,8.14L85.61,46.1l-8-8.09-8,8.1L63,39.43l8-8.14-8-8.15,6.67-6.65,8,8.08,8-8.1ZM77.77,0A30.91,30.91,0,0,1,91,58.82v57.69a6.38,6.38,0,0,1-6.37,6.37H6.37A6.38,6.38,0,0,1,0,116.51V22.4A6.38,6.38,0,0,1,6.37,16h44.3A30.89,30.89,0,0,1,77.77,0Zm7.78,60.81A30.92,30.92,0,0,1,48.32,21.52H6.37a.9.9,0,0,0-.63.26.92.92,0,0,0-.26.63V116.5a.89.89,0,0,0,.89.89H84.65a.9.9,0,0,0,.63-.26.92.92,0,0,0,.26-.63V60.81ZM25.14,92.22a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,1,0,0-5.48Zm0-19.41a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,0,0,0-5.48Z"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Dividend;
