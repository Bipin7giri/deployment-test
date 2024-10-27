import Nepse from "@/components/Charts/Nepse";
import React from "react";
import { FaXmark } from "react-icons/fa6";

const CalculatedData = ({ calculatedData, setIsCalculate }) => {
  return (
    <div className="bg-secondary rounded-xl p-8 shadow-md">
      <button onClick={() => setIsCalculate(false)} className="mb-2">
        <FaXmark className="text-xl" />
      </button>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full">
          <Nepse
            isCalculatedChart={true}
            data={calculatedData?.chartData}
            height={200}
            fontSize={12}
          />
        </div>
        <div className="w-full">
          <span>
            <p className="lg:text-lg text-[24px] font-medium">
              Today the investment would be worth
            </p>
            <p
              className={`${
                calculatedData?.totalIncrease > 0
                  ? "text-success"
                  : "text-danger"
              } text-3xl font-semibold`}
            >
              {calculatedData?.currentAmount}
            </p>
          </span>
          <div className="flex justify-between gap-3 mt-4">
            <span className="flex flex-col items-center">
              <p className="lg:text-lg text-[24px] font-medium">Total Increase</p>
              <p
                className={`${
                  calculatedData?.totalIncrease > 0
                    ? "text-success"
                    : "text-danger"
                } lg:text-2xl text-[26px] font-semibold`}
              >
                {calculatedData?.totalIncrease}%
              </p>
            </span>
            <span className="flex flex-col items-center">
              <p className="lg:text-lg text-[24px] font-medium">Annualized Return</p>
              <p
                className={`${
                  calculatedData?.totalIncrease > 0
                    ? "text-success"
                    : "text-danger"
                } lg:text-2xl text-[26px] font-semibold`}
              >
                {calculatedData?.annualizedReturn}%
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatedData;
