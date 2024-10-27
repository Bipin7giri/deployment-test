"use client";
import React, { useEffect, useState } from "react";
import { Calendar, theme } from "antd";
import actions from "../_redux/action";
import { useDispatch, useSelector } from "react-redux";

const StockCalender = () => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const [completedEvents, setCompletedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [presentMonthYear, setPresentMonthYear] = useState();
  const wrapperStyle = {
    width: "100%",
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const dateCellRender = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const event = events.find((event) => event.date === formattedDate);

    if (event) {
      return <div className="event">{event.title}</div>;
    }

    const dayOfWeek = date.day();
    const isHoliday = dayOfWeek === 5 || dayOfWeek === 6; // Friday (5) or Saturday (6)

    if (isHoliday) {
      return <div className="holiday-cell"></div>;
    }
    return null;
  };

  const onPanelChange = (value) => {
    setPresentMonthYear(value.format("YYYY-MM"));
  };

  // for current year and month
  useEffect(() => {
    if (presentMonthYear !== undefined) {
      dispatch(actions.getCalenderInfo({ period: presentMonthYear }));
    }
  }, [presentMonthYear]);

  const { calenderData } = useSelector((state) => state.tools);

  let events = [];
  if (calenderData?.data?.length > 0) {
    events = calenderData?.data?.map((item, id) => ({
      title: item?.event,
      date: item?.date,
    }));
  }

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const formattedDate = `${year}-${month}`;
    setPresentMonthYear(formattedDate);
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    let completed = [];
    let upcoming = [];
    let eventToday = [];
    events?.map((event, id) => {
      const eventDate = new Date(event.date);

      if (eventDate < currentDate) {
        completed?.push(event);
      } else if (eventDate > currentDate) {
        upcoming?.push(event);
      } else {
        eventToday?.push(event);
      }
    });

    setCompletedEvents(completed);
    setUpcomingEvents(upcoming);
    setTodaysEvents(eventToday);
  }, [presentMonthYear, events]);

  return (
    <>
      <div className="bg-[#F4F6F9] ">
        <div
          className={`text-center rounded xl:mt-0 xl:container px-10 xl:w-full flex justify-center mx-auto`}
        >
          <div className="bg-[#fff] rounded-md shadow my-[20px] xl:h-[80vh] h-[35vh] ">
            <div style={wrapperStyle}>
              <div className="wrapper px-[10px] py-[20px]">
                <Calendar
                  fullscreen={false}
                  onPanelChange={onPanelChange}
                  dateCellRender={dateCellRender}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:container events mt-[20px] mb-[30px] flex justify-center xl:justify-evenly	 xl:gap-32 gap-16">
          <div>
            {todaysEvents?.length > 0 && (
              <>
                <h4 className="capitalize xl:text-[18px] text-[24px] font-[600]">
                  Todays Events
                </h4>
                {todaysEvents?.map((item, id) => {
                  return (
                    <>
                      <div className="flex">
                        <div className="mr-[12px] mt-[12px] font-[600] xl:text-[15px] text-[20px]">
                          {" "}
                          {item?.date}{" "}
                        </div>
                        <div className="mt-[12px] ">
                          <p className="xl:text-[15px] text-[20px]">
                            {" "}
                            {item.title}{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
            <h4 className="capitalize xl:text-[18px] text-[24px] font-[600]">
              Upcoming Events
            </h4>
            {upcomingEvents?.length > 0 ? (
              <>
                {upcomingEvents?.map((item, id) => {
                  return (
                    <>
                      <div className="flex">
                        <div className="mr-[12px] mt-[12px] font-[600] xl:text-[15px] text-[20px]">
                          {" "}
                          {item?.date}{" "}
                        </div>
                        <div className="mt-[12px] ">
                          <p className="xl:text-[15px] text-[20px]">
                            {" "}
                            {item.title}{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>no events</>
            )}

            {/* <div className='flex'>
              <div className='mr-[12px] mt-[12px] font-[600] xl:text-[15px] text-[20px]'> 2023-01-12 </div>
              <div className='mt-[12px] '>
                <p className='xl:text-[15px] text-[20px]'> ADBL AGM </p>
                <p className='xl:text-[15px] text-[20px]'> ADBL AGM </p>
                <p className='xl:text-[15px] text-[20px]'> ADBL AGM </p>
              </div>
            </div>
            <div className='flex'>
              <div className='mr-[12px] mt-[12px] font-[600] xl:text-[15px] text-[20px]'> 2023-01-12 </div>
              <div className='mt-[12px] '>
                <p className='xl:text-[15px] text-[20px]'> ADBL AGM </p>
                <p className='xl:text-[15px] text-[20px]'> ADBL AGM </p>
              </div>
            </div> */}
          </div>

          <div>
            <h4 className="capitalize xl:text-[18px] text-[24px] font-[600]">
              Completed Events
            </h4>
            {completedEvents?.length > 0 ? (
              <>
                {completedEvents?.map((item, id) => {
                  return (
                    <>
                      <div className="flex">
                        <div className="mr-[12px] mt-[12px] font-[600] xl:text-[15px] text-[20px]">
                          {" "}
                          {item?.date}{" "}
                        </div>
                        <div className="mt-[12px] ">
                          <p className="xl:text-[15px] text-[20px]">
                            {" "}
                            {item.title}{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>no events</>
            )}
            {/* <div className='flex'>
              <div className='mr-[12px] mt-[12px] font-[600] xl:text-[15px] text-[20px]'> 2023-01-12 </div>
              <div className='mt-[12px] '>
                <p className='xl:text-[15px] text-[20px]'> ADBL AGM </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default StockCalender;
