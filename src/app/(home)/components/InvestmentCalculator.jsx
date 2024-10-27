"use client";
import { AutoComplete, Button, Input, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import { convertToUnixtime } from "@/utils/convertToUnixtime";
import api from "@/api/axios";
import CalculatedData from "./CalculatedData";

const InvestmentCalculator = () => {
  const { marketLiveHomeData } = useSelector((state) => state.home);
  const [filteredData, setFilteredData] = useState([]);
  const [calculatedData, setCalculatedData] = useState({});
  const [isCalculate, setIsCalculate] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (marketLiveHomeData && marketLiveHomeData.liveData) {
      setFilteredData(marketLiveHomeData.liveData);
    }
  }, [marketLiveHomeData]);

  const handleSearch = (value) => {
    setFilteredData(
      marketLiveHomeData?.liveData?.filter(
        (item) =>
          item.symbol.toLowerCase().includes(value.toLowerCase()) ||
          item.companyName.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const options = filteredData?.map((item) => ({
    label: item.symbol,
    value: item.symbol,
  }));

  const handleSelectStock = (event) => {
    if (event.target.innerText !== "") {
      setStock(event.target.innerText);
      if (inputRef.current) {
        inputRef.current.blur();
        setFilteredData(marketLiveHomeData?.liveData);
      }
    }
  };

  // post request to calculate investment
  const handleCalculate = async () => {
    if (!stock.length && !amount.length && !time.length) {
      setErrorMessage("Please select all the field!");
    } else {
      try {
        const data = {
          symbol: stock,
          investmentAmount: amount,
          time: time,
          timeInUnixFormat: convertToUnixtime(time),
        };
        const response = await api.post("/company/investment/calculator", data);
        if (response.data.status === 200) {
          setCalculatedData(response.data.data);
          setIsCalculate(true);
          setStock("");
          setAmount("");
          setTime("");
          setErrorMessage("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {!isCalculate ? (
        <div className="bg-secondary rounded-xl p-8 shadow-md">
          <h3 className="lg:text-2xl text-[28px] font-bold mb-8 text-start">
            What if you had started investing years ago?
          </h3>
          <div className="flex flex-col items-center lg:gap-6 gap-8">
            <div className="w-full">
              <AutoComplete
                popupMatchSelectWidth={"100%"}
                style={{ width: "100%" }}
                size="large"
                options={options}
                onClick={handleSelectStock}
                {...(!searchActive && { value: stock })}
                onSearch={handleSearch}
                onFocus={() => {
                  setSearchActive(true);
                }}
                onBlur={() => {
                  setSearchActive(false);
                }}
                className="font-semibold"
              >
                <Input
                  ref={inputRef}
                  size="large"
                  placeholder="Search company"
                  suffix={
                    <Button
                      icon={<DownOutlined />}
                      disabled={true}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "8px",
                        height: "14px",
                      }}
                    />
                  }
                />
              </AutoComplete>
            </div>
            <div className="w-full">
              <input
                type="number"
                placeholder="Enter Invested Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-400 py-1 lg:px-1 px-4 rounded-md lg:text-base text-[22px] lg:placeholder:text-base placeholder:text-[22px]"
              />
            </div>
            <div className="w-full">
              <input
                type="number"
                placeholder="Enter Invested Time (In years)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-400 py-1 lg:px-1 px-4 rounded-md lg:text-base text-[22px] lg:placeholder:text-base placeholder:text-[22px]"
              />
            </div>
            <div className="w-full">
              <button
                onClick={() => handleCalculate()}
                className="w-full lg:py-2 py-3 lg:text-lg text-[24px] rounded-2xl bg-blue-600 text-white"
              >
                Calculate
              </button>
              <p className="text-red-600 lg:text-sm text-[20px]">
                {errorMessage.length > 0 && errorMessage}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <CalculatedData
          calculatedData={calculatedData}
          setIsCalculate={setIsCalculate}
        />
      )}
    </>
  );
};

export default InvestmentCalculator;
