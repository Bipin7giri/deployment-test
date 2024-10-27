import React from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { formatMoney } from "../utils/formatMoney";

const Card = ({ Title, Number, sChange, Percentage, Trend }) => {
  return (
    <div>
      <div
        className={`bg-secondary     px-8 py-8  lg:px-4 lg:py-5 rounded-2xl shadow-lg lg:shadow-md`}
      >
        <div className="flex justify-between">
          <div>
            <h4 className="font-semibold text-3xl  lg:text-sm  lg:leading-[4px] pb-[15px]">
              {Title}
            </h4>
          </div>
          <div className="mt-[-14px]">
            <span>
              {Trend === "up" ? (
                <>
                  <div className="relative">
                    <RiArrowUpSFill className="text-[#1ECB4F] text-5xl lg:text-3xl" />
                    <svg
                      className="absolute hidden lg:block  top-[40px] left-[15.75px]"
                      width="30"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_f_116_207)">
                        <circle cx="10" cy="10" r="5" fill="#1ECB4F" />
                      </g>
                      <defs>
                        <filter
                          id="filter0_f_116_207"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="2.5"
                            result="effect1_foregroundBlur_116_207"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    <RiArrowDownSFill
                      size={28}
                      className="hidden  lg:block text-[#FD5353]"
                    />
                    <RiArrowDownSFill
                      size={80}
                      className="lg:hidden block text-[#FD5353]"
                    />
                    <svg
                      className=" lg:block hidden  absolute  top-[40px] left-[15.75px]"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g filter="url(#filter0_f_116_207)">
                        <circle cx="10" cy="10" r="5" fill="#FD5353" />
                      </g>
                      <defs>
                        <filter
                          id="filter0_f_116_207"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="BackgroundImageFix"
                            result="shape"
                          />
                          <feGaussianBlur
                            stdDeviation="2.5"
                            result="effect1_foregroundBlur_116_207"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </>
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-primary   font-semibold lg:text-sm text-3xl mb-2">
              {formatMoney(Number)}
              <span
                className={`${
                  Percentage > 0
                    ? "text-success"
                    : Percentage === 0
                    ? "text-info"
                    : "text-danger"
                }`}
              >
                {" "}
                {/* ({sChange}){" "} */}
              </span>
            </p>
            <p
              className={
                Trend === "up"
                  ? "text-[#1ECB4F] font-semibold lg:text-xs text-3xl"
                  : "text-[#FD5353] font-semibold lg:text-xs text-3xl"
              }
            >
              {sChange ? sChange : Percentage + "%"}
            </p>
          </div>
          <div>
            {Trend === "up" ? (
              <>
                <svg
                  // width="130"
                  // height="51"
                  className="w-[90%] pl-10 lg:pl-0 lg:w-[90px]"
                  viewBox="0 0 109 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 49.5L8.5 26.5L17 37L22 19.5L31 37L44.5 3L57.5 26.5L72 19.5L83.5 31L93.5 6.5L101 19.5H108"
                    stroke="#1ECB4F"
                    strokeWidth="2"
                    stroke-linecap="round"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  className="w-[90%] pl-10 lg:pl-0 lg:w-[90px]"
                  viewBox="0 0 109 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 49.5L8.5 26.5L17 37L22 19.5L31 37L44.5 3L57.5 26.5L72 19.5L83.5 31L93.5 6.5L101 19.5H108"
                    stroke="#FD5353"
                    strokeWidth="2"
                    stroke-linecap="round"
                  />
                </svg>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
