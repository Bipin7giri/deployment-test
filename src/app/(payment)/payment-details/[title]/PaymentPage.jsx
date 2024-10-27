"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaCcAmazonPay } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

function PaymentPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex justify-center mx-auto bg-[#F4F6F9] text-center rounded py-[80px] lg:pt-[80px] pt-[230px]">
        <div className="shadow-lg lg:shadow flex lg:flex-row flex-col justify-center w-[55vw]">
          <div className="bg-secondary    w-full lg:w-[50%] px-[20px] lg:px-4 shadow-xl rounded-l-lg">
            <div className="p-[50px]">
              <div className="flex">
                <div>
                  <FaCcAmazonPay className="h-[70px] w-[70px]" />
                </div>
                <div className="ml-[10px] mt-[8px]">
                  <p className="text-[16px] uppercase text-left">
                    for individual
                  </p>
                  <p className="text-[22px] font-[800] uppercase text-left">
                    basic
                  </p>
                </div>
              </div>
              <div className="text-left mt-[12px]">
                Show social proof notification to increase leads and sales.
              </div>
              <div className="text-left mt-[12px] flex">
                <p className="text-[32px] font-[700]">Rs 99</p>
                <p className="ml-[7px] mt-[14px]">/monthly</p>
              </div>
              <div className="mt-[20px]">
                <Link
                  href="/payment-details"
                  className="text-[18px] text-center text-[#fff] bg-[#000] py-[16px] px-[60px] lg:px-[70px] rounded-2xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] px-[20px] bg-[#F7F7FC] rounded-r-lg lg:px-4 shadow-xl">
            <div className="py-[100px] pl-[40px]">
              <p className="text-left">What&apos;s included</p>
              <p className="pt-[15px] flex">
                <span>
                  <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                </span>{" "}
                All analytic features
              </p>
              <p className="pt-[10px] flex">
                <span>
                  <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                </span>
                Up to 250,000 tracked visits
              </p>
              <p className="pt-[10px] flex">
                <span>
                  <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                </span>{" "}
                Normal support
              </p>
              <p className="pt-[10px] flex">
                <span>
                  <TiTick className="w-[25px] h-[25px] p-[5px] text-[#fff] bg-[#000] rounded-3xl mr-[10px]" />
                </span>{" "}
                Add 3 people to the portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PaymentPage;
