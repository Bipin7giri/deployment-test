"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { Popover, Skeleton } from "antd";
import logo from "../../../assets/icon/logo.png";
import api, { newsApi, strapiBaseURl } from "@/api/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatMoney } from "../../../utils/formatMoney";
import InvestmentCalculator from "./InvestmentCalculator";
import OpinionPoll from "./OpinionPoll";

const News = ({ isPortfolio, pWidth }) => {
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const getNewsData = () => {
    setLoading(true);
    newsApi
      .get(
        `newsses?pagination[page]=1&pagination[pageSize]=7&populate=thumbnail&sort[0][publishedAt]=desc`
      )
      .then((res) => {
        setLoading(false);
        setNews(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const fetchNewsDetails = (title, id) => {
    const replacedTitle = title.replace(/[% ]/g, "-");
    router.push(`/news/${replacedTitle}?newsId=${id}`);
  };
  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <>
      <div className="lg:container lg:px-8 lg:mx-auto flex lg:flex-row lg:items-start flex-col py-5 lg:mt-0 gap-10 px-4 mx-auto">
        <div
          className={`${
            pWidth ? pWidth : ""
          } lg:w-[75%] shadow-md mx-6 lg:mx-0 px-10 lg:px-5 bg-secondary rounded-[20px] py-5`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-[500] text-3xl lg:text-[18px]">News</h3>
            </div>
            <div>
              <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary    border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary  py-1">
                <Link href="/allnews"> View More </Link>
              </button>
            </div>
          </div>
          {loading && (
            <>
              {["", "", "", "", ""].map((item) => {
                return (
                  <>
                    <Skeleton paragraph={{ rows: 6 }} />
                  </>
                );
              })}
            </>
          )}
          {news?.slice(0, 5)?.map((item, id) => {
            {
              /* {news?.map((item, id) => { */
            }
            return (
              <>
                <div
                  onClick={() => {
                    fetchNewsDetails(item?.attributes?.title, item?.id);
                  }}
                  key={id}
                  className="flex gap-6 lg:py-4 pt-10 cursor-pointer pr-[20px]"
                >
                  <div className=" w-[30%] mx-auto h-[60%] lg:w-[20%] lg:h-[100px] ">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        item?.attributes?.thumbnail?.data === null
                          ? logo
                          : strapiBaseURl +
                            item?.attributes?.thumbnail?.data[0]?.attributes
                              ?.url
                      }
                      alt={item?.attributes?.title}
                    />
                  </div>
                  <div className="lg:w-[80%] w-[70%]">
                    <div className="flex flex-col lg:flex-row">
                      <h5 className="lg:text-[18px] text-[32px] capitalize font-[500]">
                        {item?.attributes?.title}
                      </h5>
                    </div>
                    <div className="flex mt-3 lg:mt-0 lg:gap-48 gap-80  py-2 lg:py-0 items-center">
                      <div className="flex items-center gap-3">
                        <div className="text-gray-500 text-[28px] lg:text-[14px]">
                          <AiOutlineCalendar className="text-[24px] lg:text-[14px]" />
                        </div>
                        <div className="flex">
                          <div className="lg:text-xs  text-[24px]  text-gray-500">
                            {item?.attributes?.publishedAt?.split("T")[0]}
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div>
                      <p className="lg:text-[12px] text-[28px] py-3 text-gray-700 lg:h-[68px] h-[90px] overflow-hidden">
                        {item?.attributes?.short_description
                          ? item?.attributes?.short_description
                          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi error praesentium natus inventore perferendis consectetur quia deserunt, assumenda illum. Minus libero architecto quia modi voluptatum facilis, officia molestias nemo fugit?"}
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
        </div>
        <div className="lg:w-[40%] space-y-8">
          <InvestmentCalculator />
          <OpinionPoll />
        </div>
      </div>
    </>
  );
};
export default News;
