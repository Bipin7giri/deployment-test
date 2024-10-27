import React, { useMemo } from 'react'
import { formatMoney, lakhConvert } from '../../../../../utils/formatMoney'
import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { TVChartContainer } from '../../../../../components/TVChartContainer';



const DebenturesBasicInfo = ({ id }) => {
    const { company, companyBasicInfoLoading, deventuresData, } = useSelector((state) => state.company);

    const chartRender = useMemo(() => {
        return (
            <TVChartContainer
                symbol={id}
                disabledFeatures={["left_toolbar", "header_widget", "timeframes_toolbar",]}
                search={false}
                enableFeatures={["side_toolbar_in_fullscreen_mode"]}
                height={"lg:h-[70vh] h-[50vh]"}
            />
        );
    }, [id]);

    return (
        <>
            {companyBasicInfoLoading ? (
                <>
                    <Skeleton className="w-[60%]" />
                </>
            ) : (
                <div className="mt-[20px]">
                    <div className="debentures-fund-header rounded-[20px] w-[40%] flex justify-between my-[30px] bg-[#fff] shadow-md mt-[20px] align-middle py-[8px] px-[20px] text-center mb-[20px]">
                        <div className="">
                            <h3 className="text-[#4E5969] font-[500] ">
                                Coupon Rate
                            </h3>
                            <p className="font-[600] mt-[4px]">
                                {deventuresData?.data?.debenturesData?.[0]?.interestRate} %
                            </p>
                        </div>
                        <div className="">
                            <h3 className="text-[#4E5969] font-[500] ">Fund Size</h3>
                            <p className="font-[600] mt-[4px]">
                                {deventuresData?.data?.debenturesData?.[0]?.fundSize
                                    ? deventuresData?.data?.debenturesData?.[0]?.fundSize
                                    : "-"}
                            </p>
                        </div>
                        <div className="">
                            <h3 className="text-[#4E5969] font-[500] ">
                                Maturity Date
                            </h3>
                            <p className="font-[600] mt-[4px]">
                                {deventuresData?.data?.debenturesData?.[0]?.maturityYear
                                    ? deventuresData?.data?.debenturesData?.[0]
                                        ?.maturityYear
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <div className="py-[40px] ">
                <div className="flex lg:flex-row flex-col gap-4">
                    <div className="lg:w-[70%] 2xl:w-[75%] bg-secondary">
                        {chartRender}
                    </div>
                    <div className="lg:w-[30%]">
                        <div className="bg-secondary px-6 py-3 rounded-[20px]">
                            <p className="text-primary lg:text-[21px] text-5xl font-semibold">
                                Market Overview
                            </p>
                            <ul className="flex flex-row justify-between text-3xl lg:text-[10px] mt-[15px]">
                                <li>
                                    <p className="text-gray-400 text-medium  ">
                                        Open Price
                                    </p>
                                    <p className=" lg:text-[18px] lg:leading-3 leading-[2] text-primary  ">
                                        RS {formatMoney(company?.[0]?.openPrice)}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-medium ">
                                        52 Weeks High
                                    </p>
                                    <p className="  lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        RS {formatMoney(company?.[0]?.fiftyTwoWeekHigh)}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-medium ">
                                        Total Trades
                                    </p>
                                    <p className="  lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        RS {formatMoney(company?.[0]?.totalTrades)}
                                    </p>
                                </li>
                            </ul>
                            <ul className="flex flex-row text-3xl lg:text-[10px] justify-between mt-[15px] py-[30px]">
                                <li>
                                    <p className="text-gray-400 text-medium ">High PRICE</p>
                                    <p className="  lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        RS {formatMoney(company?.[0]?.highPrice)}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-medium ">
                                        52 Weeks Low
                                    </p>
                                    <p className=" lg:text-[18px] lg:leading-3  leading-[2] text-3xl text-primary  ">
                                        RS {formatMoney(company?.[0]?.fiftyTwoWeekLow)}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-medium ">
                                        Total Turnover
                                    </p>
                                    <p className=" lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        {lakhConvert(company?.[0]?.totalTradeValue)}
                                    </p>
                                </li>
                            </ul>
                            <ul className="flex flex-row text-3xl lg:text-[10px]  justify-between mt-[15px] mb-[5px]">
                                <li>
                                    <p className="text-gray-400 text-medium ">Low Price</p>
                                    <p className=" lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        RS {formatMoney(company?.[0]?.lowPrice)}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-medium ">
                                        Previous Close
                                    </p>
                                    <p className=" lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        RS: {formatMoney(company?.[0]?.previousClose)}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-gray-400 text-medium ">
                                        Avg Traded Price
                                    </p>
                                    <p className=" lg:text-[18px] lg:leading-3  leading-[2] text-primary  ">
                                        RS: {formatMoney(company?.[0]?.averageTradedPrice)}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

DebenturesBasicInfo.getServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: { id }
    }
}

export default DebenturesBasicInfo