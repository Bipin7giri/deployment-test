import React from "react";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs"

const Sidebar = ({
  id,
  setIsDrawerOpen,
}) => {
  return (
    <div className="">
      <ul className=" fixed text-left flex-col lg:mt-0 mt-32 lg-mt-0  flex lg:gap-5 gap-10 py-10  text-3xl lg:text-sm">
        <li className="py-2 cursor-pointer px-4 hover:bg-secondary    hover:text-primary   transition-colors duration-300">
          <Link
            className={({ isActive }) =>
              isActive
                ? "font-bold mx-[-10px] py-2 px-3 rounded-full bg-black text-secondary   transition-all"
                : "font-normal"
            }
            href={`/broker/${1}`}>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              About Broker
            </button>
          </Link>
        </li>
        <li className="py-2 mx-2  cursor-pointer  hover:bg-secondary    hover:text-primary   transition-colors duration-300">
          <Link
            className={({ isActive }) =>
              isActive
                ? "font-bold mx-[-10px] py-2 px-3 rounded-full bg-black text-secondary   transition-all"
                : "font-normal"
            }
            href={`/broker/breakdownBuyers/${isNaN(id) ? 1 : Number(id)}`}>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              Break Down By Buyers
            </button>
          </Link>
        </li>
        <li className="py-2 mx-2  cursor-pointer  hover:bg-secondary    hover:text-primary   transition-colors duration-300">
          <Link
            className={({ isActive }) =>
              isActive
                ? "font-bold mx-[-10px] py-2 px-3 rounded-full bg-black text-secondary   transition-all"
                : "font-normal"
            }
            href={`/broker/breakdownSellers/${isNaN(id) ? 1 : Number(id)}`}>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              Break Down By Sellers
            </button>
          </Link>

        </li>
        <li className="py-2 mx-2  cursor-pointer  hover:bg-secondary    hover:text-primary   transition-colors duration-300">
          <Link
            className={({ isActive }) =>
              isActive
                ? "font-bold py-2 mx-[-10px] px-3 rounded-full bg-black text-secondary   transition-all"
                : "font-normal"
            } href={`/breakdownTopFiveSymbol/${"adbl"}`}>
            <button
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              Break Down By symbol
            </button>
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
