import React, { useState } from 'react'
import MutualFundsBalanceSheet from '../Tables/MutualFundsBalanceSheet';
import { useSelector } from 'react-redux';

/**
* @author
* @function MutualFundsFinancials
**/

export const MutualFundsFinancials = ({ data }) => {
    const [routeActive, setRouteActive] = useState(0);

    const { company, loading, mutualFundsBalance, } = useSelector((state) => state.company);

    const comparisionStyleRoute = ['Income Statement', 'Balance Statement'];

    return (
        <div>
            <div className="mutual-fund-financial flex justify-start mt-[35px] mb-[3xz0px] ">
                <div>
                    <ul className="flex justify-start mb-2 items-center gap-5 relative">
                        {comparisionStyleRoute?.map((route, id) => {
                            return (
                                <>
                                    <li
                                        style={{ fontFamily: "poppins" }}
                                        className="text-primary lg:text-[15px] px-[5px] mt-[-12px] cursor-pointer"
                                    >
                                        <button
                                            onClick={() => {
                                                setRouteActive(id);
                                            }}
                                            className={`${routeActive === route
                                                ? "text-[#3A6FF8] "
                                                : "text-primary"
                                                }  text-2xl lg:text-sm mr-3 font-semibold`}
                                        >
                                            {route}
                                        </button>
                                        {routeActive === id && (
                                            <div className="border-b text-2xl lg:text-sm mr-3 border-[#5281F9]"></div>
                                        )}
                                    </li>
                                </>
                            );
                        })}
                    </ul>
                    <div className="mt-[-11px]"></div>
                </div>
            </div>
            {routeActive === 0 && (
                <MutualFundsBalanceSheet data={data?.data}
                    fromWhere="mutualFunds" />
            )}
            {routeActive === 1 && (
                <MutualFundsBalanceSheet data={mutualFundsBalance?.data} />
            )}

        </div>
    )
}
