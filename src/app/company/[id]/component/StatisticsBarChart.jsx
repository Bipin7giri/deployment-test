import React from "react";
import { useSelector } from "react-redux";
import { MixLineChart } from "../../../../components/Charts/MixLineChart";

const StatisticsBarChart = () => {
    const { dividend, isDividendLoading, isDividendError, dividendYieldBySymbol } = useSelector(
        (state) => state.company
    );

    const sortedDividend = dividend
        ? [...dividend]?.sort((a, b) => {
            const yearA = parseInt(a.year.split("/")[0]);
            const yearB = parseInt(b.year.split("/")[0]);
            return yearA - yearB;
        })
        : [];


    let sortedDividendYield
    if (dividendYieldBySymbol && Array?.isArray(dividendYieldBySymbol?.data)) {
        sortedDividendYield = [...dividendYieldBySymbol.data]?.sort((a, b) => {
            const yearA = parseInt(a.year.split("/")[0]);
            const yearB = parseInt(b.year.split("/")[0]);
            return yearA - yearB;
        });
    }

    const keys = sortedDividend?.map((entry) => entry.year);
    const bonusData = sortedDividend?.map((entry) => entry.bonus_dividend);
    const cashData = sortedDividend?.map((entry) => entry.cash_dividend);
    const dividendYield = sortedDividendYield?.map((entry) => entry.dividend_yield * 100);
    const legend = ["Bonus Dividend", "Cash Dividend", "Dividend Yield"];

    let latestDividendYieldData
    if (Array.isArray(sortedDividendYield) && sortedDividendYield?.length > 0) {
        let lastIndex = sortedDividendYield?.length - 1;
        latestDividendYieldData = sortedDividendYield[lastIndex];
    }

    const tooltipFormatter = (params) => {
        const dataIndex = params[0]?.dataIndex;
        const year = params[0]?.name;
        const bonus = bonusData[dataIndex];
        const cash = cashData[dataIndex];
        const yieldPercentage = dividendYield[dataIndex];

        return `
            Year: ${year}<br />
            Bonus Dividend: ${bonus > 0 ? bonus + "%" : "-"}<br />
            Cash Dividend: ${cash > 0 ? cash + "%" : "-"}<br />
            Dividend Yield: ${yieldPercentage.toFixed(2)}%
        `;
    };

    let highestTotalDividend = 0;
    for (let i = 0; i < sortedDividend?.length; i++) {
        if (sortedDividend[i].total_dividend > highestTotalDividend) {
            highestTotalDividend = sortedDividend[i].total_dividend;
        }
    }

    let highestYieldDividend = 0;
    for (let i = 0; i < sortedDividendYield?.length; i++) {
        if (sortedDividendYield[i].dividend_yield * 100 > highestYieldDividend) {
            highestYieldDividend = sortedDividendYield[i].dividend_yield * 100;
        }
    }
    const interval1 = Math.ceil((highestTotalDividend) / 5)
    const interval2 = Math.ceil((highestYieldDividend) / 5)

    let dataObj = {
        keys: keys, bonusData: bonusData, cashData: cashData,
        dividendYield: dividendYield, legend: legend, tooltipFormatter: tooltipFormatter,
        highestTotalDividend: highestTotalDividend + 1, highestYieldDividend: Math.floor(highestYieldDividend + 1),
        minYxis: 0, interval1: interval1, interval2: interval2,
    }


    return (
        <>
            <div className="bg-secondary rounded-[20px] mt-[26px] py-[20px] px-[6px]">
                <MixLineChart data={dataObj} />
                <div className="text-center">
                    {latestDividendYieldData?.dividend_yield &&
                        <h3><span className="font-[600]">Current Dividend Yield: {latestDividendYieldData?.dividend_yield * 100}%</span> </h3>
                    }
                </div>
            </div>

        </>
    );
};
export default StatisticsBarChart;