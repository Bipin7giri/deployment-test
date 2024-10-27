import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./redux/actions";
import BalanceSheet from "./component/Tables/BalanceSheet";
import { Skeleton, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import FinancialImage from "./component/FinancialImage";

const InsuranceFinancial = ({ symbol, sector, data1, fromWhere }) => {
    const router = useRouter();
    let quartersArrayValue = ["Q1", "Q2", "Q3", "Q4"];
    let quartersArrayName = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
    const dispatch = useDispatch();
    const [isIncome, setIsIncome] = useState(true);
    const [isInsuranceNew, setInsuranceNew] = useState(true);
    const [quarter, setQuarter] = useState();
    const [isQuarterly, setIsQuarterly] = useState(true);
    const [isAnnualy, setIsAnnualy] = useState(false);
    const [isPercentage, setIsPercentage] = useState(false);
    const { isLoggedIn, is_subscribed } = useSelector((state) => state.auth);
    const [isAnnualHover, setIsAnnualhover] = useState(false);
    const [oldQuater, setOldQuater] = useState();
    const [isInsuranceIncome, setIsInsuranceIncome] = useState(true)
    const [isInsuranceBalance, setIsInsuranceBalance] = useState(false)

    const {
        currentQuarter,
        sectorInfo,
        quarterIncomeTableOne,
        quarterBalanceSheetTableOne,
        isFinancialLoading,
    } = useSelector((state) => state.company);

    const handleQuarter = (id) => {
        setQuarter(id);
        // if (sector === "Life Insurance" || sector === "Non Life Insurance") {
        if (!isInsuranceNew) {
            if (isIncome) {
                if (symbol !== quarterIncomeTableOne?.[0]?.data?.symbol || id !== oldQuater) {
                    setOldQuater(id)
                    const incomeQuarterTableArray =
                        sectorInfo[0]?.income_quarter_table?.split(",");
                    dispatch(
                        actions.quaterIncomeOne({
                            tableIds: [5],
                            symbol: symbol,
                            quarter: id,
                        })
                    );
                }
            } else {
                const balanceSheetQuarterTable =
                    sectorInfo[0]?.balance_quarter_table?.split(",");
                dispatch(
                    actions.quaterBalanceSheetOne({
                        tableIds: [4],
                        symbol: symbol,
                        quarter: id,
                    })
                );
            }
        } else if (isInsuranceNew) {
            if (isIncome) {
                // if (symbol !== quarterIncomeTableOne?.[0]?.data?.symbol || id !== oldQuater) {
                setOldQuater(id)
                dispatch(
                    actions.getIncomeNfrsQuaterly({
                        tableIds: [5],
                        symbol: symbol,
                        quarter: id,
                    })
                );
                // }
            } else {
                dispatch(
                    actions.getBalanceNfrsQuaterly({
                        tableIds: [4],
                        symbol: symbol,
                        quarter: id,
                    })
                );
            }
        } else {
            // do nothing
        }
        // }
    };

    const handleIncomeBalanceSheetApi = (id) => {
        setIsIncome(true);
        // if (sector === "Life Insurance" || sector === "Non Life Insurance") {
        if (!isInsuranceNew) {
            if (isAnnualy) {
                const incomeAnnualTableArray =
                    sectorInfo[0]?.income_annual_table?.split(",");
                dispatch(
                    actions.annualIncomeOne({
                        tableIds: [2],
                        symbol: symbol,
                    })
                );
            } else {
                const incomeQuarterTableArray =
                    sectorInfo[0]?.income_quarter_table?.split(",");
                dispatch(
                    actions.quaterIncomeOne({
                        tableIds: [5],
                        symbol: symbol,
                        quarter: quarter ? quarter : id,
                    })
                );
            }
        } else if (isInsuranceNew) {
            if (isAnnualy) {
                dispatch(
                    actions.getIncomeNfrsAnnualy({
                        tableIds: [2],
                        symbol: symbol,
                    })
                );
            } else {
                dispatch(
                    actions.getIncomeNfrsQuaterly({
                        tableIds: [5],
                        symbol: symbol,
                        quarter: quarter ? quarter : id,
                    })
                );
            }
        } else {
            // do nothing
        }
        // }
    };

    useEffect(() => {
        if (!isAnnualy) {
            if (quarter !== null && quarter !== undefined) {
                handleQuarter(quarter);
                handleIncomeBalanceSheetApi(quarter)
            } else {
                handleQuarter(currentQuarter);
                handleIncomeBalanceSheetApi(currentQuarter);
            }
        }
    }, [isInsuranceNew]);

    const handleBalanceSheetApi = (id) => {
        // if (sector === "Life Insurance" || sector === "Non Life Insurance") {
        setIsIncome(false)
        // } else {
        //   setIsIncome(false);
        // }
        // if (sector === "Life Insurance" || sector === "Non Life Insurance") {
        if (!isInsuranceNew) {
            if (isAnnualy) {
                const balanceSheetAnualTableArray =
                    sectorInfo[0]?.balanace_annual_table?.split(",");
                dispatch(
                    actions.annualBalanceSheetOne({
                        tableIds: [1],
                        symbol: symbol,
                    })
                );
            } else {
                const balanceSheetQuarterTable =
                    sectorInfo[0]?.balance_quarter_table?.split(",");
                dispatch(
                    actions.quaterBalanceSheetOne({
                        tableIds: [4],
                        symbol: symbol,
                        quarter: quarter ? quarter : id,
                    })
                );
            }
        } else if (isInsuranceNew) {
            if (isAnnualy) {
                dispatch(
                    actions.getBalanceNfrsAnnualy({
                        tableIds: [1],
                        symbol: symbol,
                    })
                );
            } else {
                dispatch(
                    actions.getBalanceNfrsQuaterly({
                        tableIds: [4],
                        symbol: symbol,
                        quarter: quarter ? quarter : id,
                    })
                );
            }
        } else {
            // do nothing
        }
        // }
    };

    useEffect(() => {
        if (isInsuranceBalance) {
            if (quarter !== null && quarter !== undefined) {
                handleBalanceSheetApi(quarter);
            } else {
                handleBalanceSheetApi(currentQuarter);
            }
        }
    }, [isInsuranceNew, isInsuranceBalance])

    const handleAnnually = () => {
        if (isInsuranceNew) {
            if (isAnnualy) {
                if (isIncome) {
                    dispatch(
                        actions.getIncomeNfrsAnnualy({
                            tableIds: [2],
                            symbol: symbol,
                        })
                    );
                } else {
                    dispatch(
                        actions.getBalanceNfrsAnnualy({
                            tableIds: [1],
                            symbol: symbol,
                        })
                    );
                }
            }
        } else if (!isInsuranceNew) {
            if (isAnnualy) {
                if (isIncome) {
                    const incomeAnnualTableArray =
                        sectorInfo[0]?.income_annual_table?.split(",");
                    dispatch(
                        actions.annualIncomeOne({
                            tableIds: [2],
                            symbol: symbol,
                        })
                    );
                }
                else {
                    const balanceSheetAnualTableArray =
                        sectorInfo[0]?.balanace_annual_table?.split(",");
                    dispatch(
                        actions.annualBalanceSheetOne({
                            tableIds: [1],
                            symbol: symbol,
                        })
                    );
                }
            }
        }
    };

    useEffect(() => {
        handleAnnually();
    }, [isInsuranceNew])

    const navigateSubscriptionPage = () => {
        router.push(`/subscription-plan`);
    };

    const handleInsuranceIncome = () => {
        setIsInsuranceIncome(true);
        setIsInsuranceBalance(false);
        setIsIncome(true);
    }
    const handleInsuranceBalance = () => {
        setIsInsuranceIncome(false);
        setIsInsuranceBalance(true);
        setIsIncome(false);
    }

    return (
        <>
            <div className="flex mt-5 z-10 items-center justify-between">
                <div className="relative">
                    <p className="text-sm">
                        <button
                            className={
                                !isIncome
                                    ? "text-[#5281F9] mr-3 lg:text-sm text-2xl "
                                    : "border-b text-2xl lg:text-sm mr-3 font-semibold border-[#5281F9]"
                            }
                            onClick={handleInsuranceIncome}
                        >
                            Income Statement
                        </button>
                        <div className="inline-block absolute    h-[20px]  min-h-[1em] w-0.5 self-stretch bg-neutral-300  opacity-100 dark:opacity-50"></div>
                        <button
                            className={
                                isIncome
                                    ? "text-[#5281F9] ml-3 lg:text-sm text-2xl "
                                    : "border-b text-2xl lg:text-sm ml-3 font-semibold border-[#5281F9]"
                            }
                            onClick={handleInsuranceBalance}
                        >
                            Balance Statement
                        </button>
                    </p>
                </div>
                <div className="flex text-sm gap-4">
                    <div className="z-10 text-2xl lg:text-sm">
                        {(isLoggedIn && is_subscribed) ? (
                            <button
                                className={
                                    isAnnualy === false
                                        ? "text-[#5281F9]"
                                        : "border-b font-semibold border-[#5281F9] "
                                }
                                onClick={() => {
                                    setIsAnnualy(true);
                                    setIsQuarterly(false);
                                    handleAnnually();
                                }}
                            >
                                Annual
                            </button>
                        ) : (
                            <div
                                className="cursor-pointer"
                                onMouseOver={() => setIsAnnualhover(true)}
                                onMouseOut={() => setIsAnnualhover(false)}
                            >
                                <Tooltip title="Subscription Required" className="flex gap-2">
                                    <button
                                        style={{ filter: "blur(0.5px)" }}
                                        className={
                                            isAnnualy === false
                                                ? "text-[#5281F9]"
                                                : "border-b font-semibold border-[#5281F9]"
                                        }
                                        onClick={() => {
                                            navigateSubscriptionPage();
                                        }}
                                    >
                                        Annual
                                    </button>
                                    {isAnnualHover && (
                                        <div className="">
                                        </div>
                                    )}
                                </Tooltip>
                            </div>
                        )}
                    </div>
                    <div className="z-10">
                        <button
                            onClick={() => {
                                setIsAnnualy(false);
                                setIsQuarterly(true);
                                handleQuarter(currentQuarter);
                            }}
                            className={
                                isQuarterly === false
                                    ? "text-[#5281F9] text-2xl lg:text-sm"
                                    : "border-b border-[#5281F9] font-semibold lg:text-sm text-2xl"
                            }
                        >
                            Quarterly
                        </button>
                    </div>

                    {isQuarterly && !quarter && (
                        <div className="z-10">
                            <select
                                className="text-2xl lg:text-sm"
                                defaultValue={currentQuarter}
                                onChange={(e) => {
                                    handleQuarter(e.target.value);
                                }}
                            >
                                {quartersArrayValue?.map((item, id) => {
                                    return (
                                        <>
                                            <option value={item}>{quartersArrayName[id]}</option>
                                        </>
                                    );
                                })}
                            </select>
                        </div>
                    )}
                    {isQuarterly && quarter && (
                        <div className="z-10">
                            <select
                                className="text-2xl lg:text-sm"
                                defaultValue={quarter}
                                onChange={(e) => {
                                    handleQuarter(e.target.value);
                                }}
                            >
                                {quartersArrayValue?.map((item, id) => {
                                    return (
                                        <>
                                            <option value={item}>{quartersArrayName[id]}</option>
                                        </>
                                    );
                                })}
                            </select>
                        </div>
                    )}
                </div>
            </div>
            {
                isInsuranceIncome &&
                <div className="flex mt-5 z-10 items-center justify-between">
                    <div className="relative">
                        <button
                            className={
                                !isInsuranceNew
                                    ? "text-[#5281F9] mr-3 lg:text-sm text-2xl "
                                    : "border-b text-2xl lg:text-sm mr-3 font-semibold border-[#5281F9]"
                            }
                            onClick={() => {
                                // handleIncomeBalanceSheetApi(currentQuarter);
                                setInsuranceNew(true)
                            }}
                        >
                            NFRS
                        </button>
                        <div className="inline-block absolute h-[20px]  min-h-[1em] w-0.5 self-stretch bg-neutral-300  opacity-100 dark:opacity-50"></div>
                        <button
                            className={
                                isInsuranceNew
                                    ? "text-[#5281F9] ml-3 lg:text-sm text-2xl "
                                    : "border-b text-2xl lg:text-sm ml-3 font-semibold border-[#5281F9]"
                            }
                            onClick={() => {
                                // handleBalanceSheetApi(currentQuarter);
                                handleIncomeBalanceSheetApi(currentQuarter);
                                setInsuranceNew(false)
                            }}
                        >
                            NAS
                        </button>
                    </div>
                </div>
            }
            {
                isInsuranceBalance &&
                <div className="flex mt-5 z-10 items-center justify-between">
                    <div className="relative">
                        <button
                            className={
                                !isInsuranceNew
                                    ? "text-[#5281F9] mr-3 lg:text-sm text-2xl "
                                    : "border-b text-2xl lg:text-sm mr-3 font-semibold border-[#5281F9]"
                            }
                            onClick={() => {
                                // handleIncomeBalanceSheetApi(currentQuarter);
                                // handleBalanceSheetApi(currentQuarter);
                                setInsuranceNew(true)
                            }}
                        >
                            NFRS
                        </button>
                        <div className="inline-block absolute h-[20px]  min-h-[1em] w-0.5 self-stretch bg-neutral-300  opacity-100 dark:opacity-50"></div>
                        <button
                            className={
                                isInsuranceNew
                                    ? "text-[#5281F9] ml-3 lg:text-sm text-2xl "
                                    : "border-b text-2xl lg:text-sm ml-3 font-semibold border-[#5281F9]"
                            }
                            onClick={() => {
                                // handleBalanceSheetApi(currentQuarter);
                                setInsuranceNew(false)
                            }}
                        >
                            NAS
                        </button>
                    </div>
                </div>
            }

            {isFinancialLoading && (
                <div className="my-10">
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            )}
            {isIncome && (
                <>
                    {quarterIncomeTableOne?.map((item) => {
                        return (
                            <>
                                <div className="mb-10">
                                    <div className="flex items-center justify-between my-4">
                                        <div>
                                            <h2 className="font-semibold text-2xl">
                                                {item?.data?.data?.table_heading}
                                            </h2>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-5 lg:gap-3">
                                                <div className="mr-[5px]">
                                                    {" "}
                                                    <span className="lg:text-sm text-2xl text-gray-500">
                                                        {" "}
                                                        data in{" "}
                                                    </span>{" "}
                                                    <span className="lg:text-sm text-2xl">
                                                        {" "}
                                                        000{" "}
                                                    </span>{" "}
                                                </div>
                                                <div className="z-10">
                                                    <button
                                                        onClick={() => {
                                                            setIsPercentage(false);
                                                        }}
                                                        className={
                                                            !isPercentage
                                                                ? "bg-black text-secondary  text-medium lg:py-0 py-2 px-4 rounded-xl lg:px-2 lg:text-sm text-3xl"
                                                                : "text-primary   rounded-xl px-2 lg:text-sm text-3xl "
                                                        }
                                                    >
                                                        Rs
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsPercentage(true);
                                                        }}
                                                        className={
                                                            isPercentage
                                                                ? "bg-black text-medium text-secondary   lg:text-sm text-3xl rounded-xl px-2 "
                                                                : "text-primary   text-medium rounded-xl px-2 lg:text-sm text-3xl"
                                                        }
                                                    >
                                                        %
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {isFinancialLoading && <Skeleton active />}
                                        {!isFinancialLoading && (
                                            <BalanceSheet
                                                isfinancial={true}
                                                data={item?.data?.data}
                                                isPercentage={isPercentage}
                                                quater={quarter}
                                                isIncome={isIncome}
                                                isAnnualy={isAnnualy}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </>
            )}
            {!isIncome && (
                <>
                    {/* Assets Table */}
                    {quarterBalanceSheetTableOne?.map((item) => {
                        return (
                            <>
                                <div className="mb-10">
                                    <div className="flex items-center justify-between my-4">
                                        <div>
                                            <h2 className="font-semibold">
                                                {" "}
                                                {item?.data?.data?.table_heading}
                                            </h2>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <button
                                                        onClick={() => {
                                                            setIsPercentage(false);
                                                        }}
                                                        className={
                                                            !isPercentage
                                                                ? "bg-black text-secondary  rounded-xl px-2 text-4xl lg:text-sm"
                                                                : "text-primary   rounded-xl px-2 text-4xl lg:text-sm"
                                                        }
                                                    >
                                                        Rs
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsPercentage(true);
                                                        }}
                                                        className={
                                                            isPercentage
                                                                ? "bg-black text-secondary  rounded-xl px-2 text-4xl lg:text-sm"
                                                                : "text-primary   rounded-xl px-2 text-4xl lg:text-sm"
                                                        }
                                                    >
                                                        %
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {isFinancialLoading && <Skeleton active />}
                                        {!isFinancialLoading && (
                                            <BalanceSheet
                                                isfinancial={true}
                                                data={item?.data?.data}
                                                isPercentage={isPercentage}
                                                quater={quarter}
                                                isIncome={isIncome}
                                                isAnnualy={isAnnualy}
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </>
            )}

            <FinancialImage symbol={symbol} />
        </>
    );
};

export default InsuranceFinancial;
