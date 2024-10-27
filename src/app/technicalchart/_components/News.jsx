"use client";
import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import logo from "@/assets/icon/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setChoosedTechinicalSymbol } from "@/app/(market)/_redux/marketSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { newsApi, strapiBaseURl } from "@/api/axios";
import { useParams } from "next/navigation";
function News({ pWidth }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const { choosedTechnicalSymbol, choosedTechnicalSector } = useSelector(
    (state) => state.market
  );

  function getSectorType(sector) {
    const result = {
      1: "Development Banks",
      2: "Manufacturing And Processing",
      3: "Micro Finance",
      4: "Life Insurance",
      5: "Mutual Fund",
      6: "Commercial Banks",
      7: "Hotels And Tourism",
      8: "Others",
      9: "Hydro Power",
      10: "Non Life Insurance",
      11: "Finance",
      12: "Trading",
      13: "Investment",
    };
    return result[sector];
  }

  const getNewsData = () => {
    setLoading(true);
    const symbolToUse =
      choosedTechnicalSymbol !== "1" && choosedTechnicalSymbol;
    if (choosedTechnicalSymbol !== null && choosedTechnicalSymbol === "1") {
      newsApi
        .get(
          `/newsses?pagination[page]=1&pagination[pageSize]=7&populate=thumbnail&sort[0][createdAt]=desc`
        )
        .then((res) => {
          setLoading(false);
          setNews(res.data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (symbolToUse && choosedTechnicalSector === null) {
      newsApi
        .get(
          `/newsses?populate=*&sort[0][createdAt]=desc&filters[companies][symbol][$eq]=${symbolToUse}`
        )
        .then((res) => {
          setLoading(false);
          setNews(res.data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else if (choosedTechnicalSector !== null) {
      const formatedChooseTechnicalSymbol = Number(choosedTechnicalSector);
      const sector = getSectorType(formatedChooseTechnicalSymbol);
      newsApi
        .get(
          `newsses?populate=*&sort[0][createdAt]=desc&filters[sectors][name][$eq]=${choosedTechnicalSector}`
        )
        .then((res) => {
          setLoading(false);
          setNews(res.data.data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
      // do nothing
    }
  };

  useEffect(() => {
    getNewsData();
  }, [choosedTechnicalSymbol, choosedTechnicalSector]);

  return (
    <>
      <div
        className={`${
          pWidth ? pWidth : ""
        } mx-6 lg:mx-0 px-10 lg:px-5 bg-secondary py-5`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-[500] text-3xl lg:text-[18px]">News</h3>
          </div>
          <div>
            <button className="ease-in duration-300 text-2xl lg:text-[18px] bg-secondary border-2 rounded-md lg:text-xs font-[500] border-black px-3 hover:bg-black hover:text-secondary  py-1">
              <Link href="/news" target="_blank">
                {" "}
                View More{" "}
              </Link>
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
        {news?.length > 0 ? (
          news?.slice(0, 5)?.map((item, id) => {
            return (
              <>
                <Link
                  // onClick={() => {
                  //     fetchNewsDetails(item?.id);
                  // }}
                  href={`/news/${item?.attributes?.title.replace(
                    /[% ]/g,
                    "-"
                  )}?newsId${item?.id}`}
                  target="_blank"
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
                      <h5 className="lg:text-[12px] text-[32px] capitalize font-[500]">
                        {item?.attributes?.title}
                      </h5>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-gray-500">
                        <AiOutlineCalendar className="text-[24px] lg:text-[14px]" />
                      </div>
                      <div className="lg:text-xs text-[24px]  text-gray-500">
                        {item?.attributes?.createdAt?.split("T")[0]}
                      </div>
                    </div>
                    <div>
                      <p className="lg:text-[12px] text-[28px] py-3 text-gray-700 lg:h-[68px] h-[90px] overflow-hidden">
                        {item?.attributes?.short_description
                          ? item?.attributes?.short_description
                          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi error praesentium natus inventore perferendis consectetur quia deserunt, assumenda illum. Minus libero architecto quia modi voluptatum facilis, officia molestias nemo fugit?"}
                      </p>
                    </div>
                  </div>
                </Link>
                <hr />
              </>
            );
          })
        ) : (
          <div className="flex flex-col justify-center items-center">
            <svg
              className="w-20 h-30 mt-[40px]"
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 108.67 122.88"
            >
              <defs>
                <style
                  dangerouslySetInnerHTML={{
                    __html: ".cls-1{fill-rule:evenodd;}",
                  }}
                />
              </defs>
              <title>no-data</title>
              <path
                className="cls-1"
                d="M25.14,53.37a2.77,2.77,0,0,0,0,5.54H45.25a2.77,2.77,0,0,0,0-5.54Zm60.48-36.9,6.66,6.69-8,8.14,8,8.14L85.61,46.1l-8-8.09-8,8.1L63,39.43l8-8.14-8-8.15,6.67-6.65,8,8.08,8-8.1ZM77.77,0A30.91,30.91,0,0,1,91,58.82v57.69a6.38,6.38,0,0,1-6.37,6.37H6.37A6.38,6.38,0,0,1,0,116.51V22.4A6.38,6.38,0,0,1,6.37,16h44.3A30.89,30.89,0,0,1,77.77,0Zm7.78,60.81A30.92,30.92,0,0,1,48.32,21.52H6.37a.9.9,0,0,0-.63.26.92.92,0,0,0-.26.63V116.5a.89.89,0,0,0,.89.89H84.65a.9.9,0,0,0,.63-.26.92.92,0,0,0,.26-.63V60.81ZM25.14,92.22a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,1,0,0-5.48Zm0-19.41a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,0,0,0-5.48Z"
              />
            </svg>
            <h3 className="font-medium text-xl lg:text-sm py-1 text-gray-500">
              NO DATA FOUND !
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default News;
