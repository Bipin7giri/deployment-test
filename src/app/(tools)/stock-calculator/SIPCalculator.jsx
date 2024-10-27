"use client";
import React, { useState } from "react";
import { Slider, Radio } from "antd";
import ReactEcharts from "echarts-for-react";
import "tailwindcss/tailwind.css";

const SIPCalculator = () => {
  const [investmentType, setInvestmentType] = useState("SIP");
  const [monthlyAmount, setMonthlyAmount] = useState(1000);
  const [sipPeriod, setSIPPeriod] = useState(12);
  const [lumpsumPeriod, setLumpSumPeriod] = useState(1);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [lumsumAmount, setLumsumamount] = useState(1000);

  const handleInvestmentTypeChange = (e) => {
    setInvestmentType(e.target.value);
  };

  const handleMonthlyAmountChange = (value) => {
    setMonthlyAmount(value);
  };

  const handleLumpSumAmountChange = (value) => {
    setLumsumamount(value);
  };

  const handleSIPPeriodChange = (value) => {
    setSIPPeriod(value);
  };
  const handleLumpSumpPeriodChange = (value) => {
    setLumpSumPeriod(value);
  };

  const handleExpectedReturnRateChange = (value) => {
    setExpectedReturnRate(value);
  };

  const calculateAmount = () => {
    let totalAmount = 0;
    if (investmentType === "SIP") {
      for (let i = 1; i <= sipPeriod; i++) {
        const monthlyInvestment = monthlyAmount;
        const yearlyReturnRate = expectedReturnRate / 12 / 100;
        const interestEarned =
          (totalAmount + monthlyInvestment) * yearlyReturnRate;
        totalAmount += monthlyInvestment + interestEarned;
      }
    } else if (investmentType === "Lumpsum") {
      const yearlyReturnRate = Math.pow(
        1 + expectedReturnRate / 100,
        lumpsumPeriod
      );
      totalAmount = lumsumAmount * yearlyReturnRate;
    }

    return totalAmount.toFixed(2);
  };
  let chartOptions = {
    legend: {
      top: "1%",
      left: "center",
      textStyle: {
        fontSize: 22, // Increase the font size as desired
      },
    },
    series: [
      {
        name: "SIP Calculator",
        type: "pie",
        radius: ["50%", "65%"],
        label: {
          show: true,
          color: "#fff",
          fontSize: 14,
          formatter: "{d}%",
        },
        labelLine: {
          show: false,
          lineStyle: {
            color: "#fff",
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
            color: "black",
            formatter: "{d}%",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        data: [
          {
            name: "Investment",
            value:
              investmentType === "SIP"
                ? monthlyAmount * sipPeriod
                : lumsumAmount * lumpsumPeriod,
          },
          {
            name: "Interest",
            value:
              investmentType === "SIP"
                ? calculateAmount() - monthlyAmount * sipPeriod
                : calculateAmount() - lumsumAmount,
          },
        ],
      },
    ],
  };

  return (
    <div>
      <h1 className="lg:text-2xl  text-4xl font-semibold mb-4">
        SIP Calculator
      </h1>
      <div className="flex lg:flex-row shadow-md flex-col bg-secondary rounded-[20px] gap-14">
        <div className="lg:w-[80%] p-5">
          <div className="flex items-center mb-6">
            <Radio.Group
              onChange={handleInvestmentTypeChange}
              value={investmentType}
            >
              {/* <Radio.Button className="lg:text-[16px] text-[32px]" value="SIP">
                SIP Investment
              </Radio.Button> */}
              {/* <Radio.Button className="lg:text-[16px]  text-[32px]" value="Lumpsum">
                Lumpsum
              </Radio.Button> */}
            </Radio.Group>
          </div>
          <div className="grid grid-cols-1 lg:py-0 pt-10 gap-8 mb-6">
            <div>
              {investmentType === "SIP" ? (
                <>
                  <p className="font-[400]  lg:text-[16px] text-[34px]">
                    Monthly SIP Amount: Rs{" "}
                    <input
                      className="appearance-none w-[200px] px-3  lg:w-[100px]   text-primary    lg:px-2 border-blue-400 border rounded"
                      type="number"
                      value={monthlyAmount}
                      onChange={(e) =>
                        handleMonthlyAmountChange(Number(e.target.value))
                      }
                    />
                  </p>

                  <Slider
                    min={1000}
                    max={100000}
                    step={1000}
                    value={monthlyAmount}
                    onChange={handleMonthlyAmountChange}
                  />
                </>
              ) : (
                <>
                  <p className="font-[400]  lg:text-[16px] text-[34px]">
                    Total Investment: Rs{" "}
                    <input
                      className="appearance-none  w-[100px]  text-primary    px-2 border-blue-400 border rounded"
                      type="number"
                      value={lumsumAmount}
                      onChange={(e) => setLumsumamount(Number(e.target.value))}
                    />
                  </p>
                  <Slider
                    min={1000}
                    max={100000}
                    step={1000}
                    value={lumsumAmount}
                    onChange={handleLumpSumAmountChange}
                  />
                </>
              )}
            </div>
            <div>
              {investmentType === "SIP" ? (
                <>
                  <p className="font-[400]  lg:text-[16px] text-[34px]">
                    SIP Period (in months):{" "}
                    <input
                      type="number"
                      className="appearance-none  w-[70px]      px-2 border-blue-400 border rounded"
                      value={sipPeriod}
                      onChange={(e) =>
                        handleSIPPeriodChange(Number(e.target.value))
                      }
                    />
                  </p>
                  <Slider
                    min={6}
                    max={60}
                    value={sipPeriod}
                    onChange={handleSIPPeriodChange}
                  />
                </>
              ) : (
                <>
                  <p className="font-[400]  lg:text-[16px] text-[34px]">
                    SIP Period (in Years):{" "}
                    <input
                      type="number"
                      className="appearance-none  w-[70px]      px-2 border-blue-400 border rounded"
                      value={lumpsumPeriod}
                      onChange={(e) =>
                        handleLumpSumpPeriodChange(Number(e.target.value))
                      }
                    />
                  </p>
                  <Slider
                    min={1}
                    max={50}
                    value={lumpsumPeriod}
                    onChange={handleLumpSumpPeriodChange}
                  />
                </>
              )}
            </div>
            <div>
              <p className="font-[400]  lg:text-[16px] text-[34px]">
                Expected Return Rate:(p.a){" "}
                <input
                  type="number"
                  className="appearance-none   w-[70px]     px-2 border-blue-400 border rounded"
                  value={expectedReturnRate}
                  onChange={(e) =>
                    handleExpectedReturnRateChange(Number(e.target.value))
                  }
                />{" "}
                %
              </p>
              <Slider
                min={0}
                max={100}
                step={1}
                value={expectedReturnRate}
                onChange={handleExpectedReturnRateChange}
              />
            </div>
          </div>
        </div>
        <div className=" rounded-tr-xl rounded-br-xl p-8 lg:w-[55%]">
          <div
            className="mt-[-20px] w-[500px] lg:h-[250px] h-[600px]"
            // style={{ width: "500px", height: "300px" }}
          >
            <ReactEcharts
              style={{ width: "100%", height: "100%" }}
              option={chartOptions}
            />
          </div>
          <div className=" font-serif text-primary   gap-3 text-sm">
            <p className="text-3xl lg:text-sm text-center pb-5 font-[400]">
              Wealth Gained : Rs{" "}
              {parseFloat(calculateAmount())
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <div className="flex justify-between">
              <p className="font-[400]  text-2xl lg:text-sm">
                Investment : Rs{" "}
                {investmentType === "SIP" ? (
                  <>
                    {parseFloat(monthlyAmount * sipPeriod)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </>
                ) : (
                  <>
                    {parseFloat(lumsumAmount * (sipPeriod / 12))
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </>
                )}
              </p>
              <p className="font-[400] text-3xl lg:text-sm">
                Interest : Rs{" "}
                {investmentType === "SIP" ? (
                  <>
                    {parseFloat(calculateAmount() - monthlyAmount * sipPeriod)
                      ?.toFixed(0)
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </>
                ) : (
                  <>
                    {parseFloat(calculateAmount() - lumsumAmount)
                      ?.toFixed(0)
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
