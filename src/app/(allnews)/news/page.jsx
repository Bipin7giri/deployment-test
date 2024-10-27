"use client";
import React, { useState, useEffect } from "react";
import Card from "../_components/Card";
import { newsApi, strapiBaseURl } from "../../../api/axios";
// import usePageViewTracking from "../../../services/usePageViewTracking";
import { Helmet } from "react-helmet";
import { Pagination } from "antd";
import NewsRoute from "../_components/NewsRoute";
import LoderNewsCard from "../_components/LoderNewsCard";

const NepseNews = () => {
  // usePageViewTracking();

  const [isAllNews, setAllNews] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const funNewsApi = () => {
    setLoading(true);
    newsApi
      .get(
        `/newsses?pagination[page]=${pagination.current}&pagination[pageSize]=${pagination.pageSize}&filters[categories][name][$contains]=NEPSE&populate=*&sort[0][publishedAt]=desc`
      )
      .then((res) => {
        setLoading(false);
        setNews(res.data.data);
        debugger;
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.meta.pagination.total,
        }));
      })
      .catch((err) => {
        setLoading(false);
        setNews(err.data);
      });
  };

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
      pageSize,
    }));
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    funNewsApi();
  }, [pagination.current]);

  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="../src/assets/icon/logo.png"
        />
        <meta
          property="og:image"
          content="https://peridotnepal.xyz/company_logo/sarallagani.webp"
        />
        <meta property="og:title" content="Saral Lagani" />
        <meta
          property="og:description"
          content="Simplifying your investing process"
        />
        <title>News</title>
        <meta
          property="og:title"
          content={"Get Latest News On Stock Market From NEPSE"}
        />
        <meta
          name="description"
          content="Get the news quick and fast. We provide all the news related to company, dividend, IPO, AGM and all other activity of company listed in NEPSE"
        />
        <meta
          name="keywords"
          content="NEPSE News, Ipo News, Economy News, Nepal Economical News, IPO NEWS, Divident New, Financial News"
        />
        <meta
          property="og:description"
          content={
            "Get the news quick and fast. We provide all the news related to company, dividend, IPO, AGM and all other activity of company listed in NEPSE"
          }
        />
        <meta property="og:url" content="https://news.sarallagani.xyz" />
      </Helmet>
      <div className="lg:mx-auto ">
        <div
          className={` lg:container pb-10 lg:px-10 lg:mx-auto   px-4 mx-auto`}
        >
          <div className="px-5 mt-10">
            <h1 className="font-medium text-lg">| Search By Category</h1>
          </div>
          <NewsRoute />
          <div className="lg:container   sm:w-full   mt-3">
            <div className="grid  grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-8">
              {loading === true ? (
                <>
                  <LoderNewsCard />
                </>
              ) : (
                <>
                  {news?.map((item, id) => {
                    return (
                      <>
                        <div key={id}>
                          <Card
                            key={id}
                            title={item?.attributes?.title}
                            newsId={item.id}
                            short_description={
                              item?.attributes?.short_description
                            }
                            publishedAt={item?.attributes?.publishedAt}
                            thumbnail={
                              item?.attributes?.thumbnail?.data === null
                                ? null
                                : strapiBaseURl +
                                  item?.attributes?.thumbnail?.data[0]
                                    ?.attributes?.url
                            }
                          />
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
            <div className="flex pt-3 justify-end">
              <Pagination
                {...pagination}
                showSizeChanger
                onChange={handlePaginationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NepseNews;
