"use client";
import React, { useState } from "react";
import { CiGrid2H } from "react-icons/ci";
import { CiGrid41 } from "react-icons/ci";
import { BsGrid3X2 } from "react-icons/bs";
import Link from "next/link";

const ChartSetting = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="relative">
      <div
        className={`setting-button fixed bottom-4 right-4 bg-primary-2 text-white p-3 rounded-full cursor-pointer transition-all duration-300 transform ${
          showOptions ? "rotate-45" : "rotate-0"
        }`}
        onClick={toggleOptions}
      >
        <span className="text-xl">&#9881;</span>
      </div>
      {showOptions && (
        <div className="chart-options absolute bottom-14 right-4 transform origin-bottom">
          <ul className="circular-menu bg-white rounded-lg shadow-lg p-4">
            <li className="circular-menu-item cursor-pointer p-2 items-center flex gap-4">
              <div className="h-4 rounded-sm w-4 bg-[#979191]"></div>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-600 text-white px-4 rounded-md"
                    : " normal-NavLink"
                }
                href={"/technicalchart"}
              >
                One chart layout
              </Link>
            </li>
            <li className="circular-menu-item cursor-pointer p-2 items-center flex gap-4">
              <CiGrid2H className="bg-gray-200 text-xl rounded-full" />
              <Link
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-600 text-white px-4 rounded-md"
                    : " normal-NavLink"
                }
                href={"/technicalchart2"}
              >
                Two charts layout
              </Link>
            </li>
            <li className="circular-menu-item cursor-pointer p-2 items-center flex gap-4">
              <svg
                width="18"
                height="20"
                viewBox="0 0 143 141"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 20C0 8.95431 8.95431 0 20 0H66V141H20C8.95431 141 0 132.046 0 121V20Z"
                  fill="#979191"
                />
                <path
                  d="M77 0H123C134.046 0 143 8.95431 143 20V64H77V0Z"
                  fill="#979191"
                />
                <path
                  d="M77 77H143V121C143 132.046 134.046 141 123 141H77V77Z"
                  fill="#979191"
                />
              </svg>
              <Link
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-600 text-white px-4 rounded-md"
                    : " normal-NavLink"
                }
                href={"/technicalchart3"}
              >
                Three charts layout
              </Link>
            </li>
            <li className="circular-menu-item cursor-pointer p-2 items-center flex gap-4">
              <CiGrid41 className="bg-gray-200 text-xl rounded-full" />
              <Link
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-600 text-white px-4 rounded-md"
                    : " normal-NavLink"
                }
                href={"/technicalchart4"}
              >
                Four charts lyout
              </Link>
            </li>
            <li className="circular-menu-item cursor-pointer p-2 items-center flex gap-4">
              <BsGrid3X2 className="bg-gray-200 text-xl " />
              <Link
                className={({ isActive }) =>
                  isActive
                    ? "bg-slate-600 text-white px-4 rounded-md"
                    : " normal-NavLink"
                }
                href={"/technicalchart6"}
              >
                Six charts layout
              </Link>
            </li>
            {/* Add more options here */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChartSetting;
