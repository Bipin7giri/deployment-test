"use client";
import React, { useEffect, useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import api from "@/api/axios";
import moment from "moment";
import "moment-timezone";

const MarqueeDesign = () => {
  const [marketLiveData, setMarketLiveData] = useState({});
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const response = await api.get("/market_data/home_live");
        if (response.status === 200) {
          setMarketLiveData(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch data initially
    fetchData();

    const fetchAndPollData = () => {
      // Calculate the start and end times for the polling schedule
      const nepaliTimezone = "Asia/Kathmandu";
      const startTime = moment("10:30 AM", "hh:mm A").tz("Asia/Kathmandu");
      const endTime = moment("3:30 PM", "hh:mm A").tz("Asia/Kathmandu");

      // Get the current day of the week
      const today = moment().tz(nepaliTimezone).day();

      // Get the current time in the Nepal timezone
      const currentTime = moment().tz(nepaliTimezone);

      // Check if the current day and time fall within the polling schedule (Sunday to Thursday)
      const isWithinSchedule =
        today >= 0 && today <= 4 && currentTime.isBetween(startTime, endTime);

      if (isWithinSchedule) {
        // Set up the interval to run fetchData every 10 seconds
        const interval = setInterval(fetchData, 10000);
        return () => clearInterval(interval); // Clear the interval when the component is unmounted
      }

      return undefined; // Return nothing if outside the polling schedule
    };

    const cleanupFunction = fetchAndPollData();
    return cleanupFunction;
  }, [isLoggedIn]);

  return (
    <div>
      {marketLiveData?.nepseIndex?.length > 0 && (
        <Marquee pauseOnHover className="bg-[#151E28] text-secondary ">
          {marketLiveData?.nepseIndex?.map((item, id) => (
            <>
              <ul className="marquee-content flex gap-5 mx-10 text-[34px] lg:text-[16px]">
                <li className="marquee-item font-[400] text-[36px] lg:text-[16px]">
                  {item?.sindex}
                </li>
                <li className="marquee-item text-[36px] lg:text-[16px]">
                  {item?.currentValue}
                </li>
                <li className="marquee-item text-[36px] lg:text-[16px]">
                  {item?.perChange}%
                </li>
                <li
                  className={`marquee-item flex text-[36px] lg:text-[16px] items-center gap-2 ${
                    item?.perChange >= 0
                      ? "text-success"
                      : "text-danger font-bold"
                  }`}
                >
                  {item?.schange}
                  {item?.perChange >= 0 ? (
                    <>
                      {" "}
                      <AiFillCaretUp />
                    </>
                  ) : (
                    <>
                      <AiFillCaretDown />
                    </>
                  )}
                </li>
              </ul>
            </>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default MarqueeDesign;
