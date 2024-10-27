"use client";
import React, { useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import CarouselNews from "./CarouselNews";
import { newsApi } from "@/api/axios";
const CarouselBanner = () => {
  const [newsBannerLoading, setNewsBannerLoading] = useState(false);
  const [newsBanner, setNewsBanner] = useState(null);
  
  const fetchNewsBanner = async () => {
    try {
      setNewsBannerLoading(true);
      const response = await newsApi.get(
        "/newsses?filters[isOnCarousel]=true&populate=*&sort[0][createdAt]=desc&pagination[pageSize]=5"
      );
      if (response) {
        const data = response.data.data;
        setNewsBanner(data);
        setNewsBannerLoading(false);
      }
    } catch (error) {
      setNewsBannerLoading(false);
      console.log(error);
    }
  };

  const prevArrow = (
    <Button shape="circle" size="large" style={{ marginLeft: "-40px" }}>
      <LeftOutlined />
    </Button>
  );
  const nextArrow = (
    <Button shape="circle" size="large" style={{ marginRight: "-40px" }}>
      <RightOutlined />
    </Button>
  );
  useEffect(() => {
    fetchNewsBanner();
  }, []);
  return (
    <Provider store={store}>
      <div className="mt-40 lg:container lg:min-h-[50vh]  lg:mt-0 mb-[20px]">
        {newsBannerLoading ? (
          <>
            <div
              role="status"
              className="space-y-8 lg:px-20 lg:py-10 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
            >
              <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg
                  className="w-12 h-12 text-gray-200"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </>
        ) : (
          <>
            {newsBanner != null && (
              <>
                <Carousel
                  effect="fade"
                  autoplay
                  autoplaySpeed={2000}
                  prevArrow={prevArrow}
                  swipe={true}
                  nextArrow={nextArrow}
                  slidesToShow={1}
                  dots={true}
                >
                  {newsBanner?.map((news, id) => (
                    <div key={id}>
                      <CarouselNews
                        newsId={news.id}
                        title={news.attributes.title}
                        shortDescription={news.attributes.short_description}
                        publishDate={news.attributes.updatedAt}
                        thumbnail={
                          newsBanner != null &&
                          news?.attributes.thumbnail != null &&
                          news?.attributes.thumbnail.data != null &&
                          news?.attributes?.thumbnail?.data[0]?.attributes
                            ?.formats?.thumbnail?.url
                        }
                      />
                    </div>
                  ))}
                </Carousel>
              </>
            )}
          </>
        )}
      </div>
    </Provider>
  );
};

export default CarouselBanner;
