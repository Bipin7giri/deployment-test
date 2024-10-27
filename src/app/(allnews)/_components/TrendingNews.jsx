/* eslint-disable @next/next/no-img-element */
"use client";
import { newsApi, strapiBaseURl } from "@/api/axios";
import React, { useEffect, useState } from "react";

const TrendingNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news data from the API
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.get(
          "/newsses?filters[isOnCarousel]=true&populate=*&sort[0][createdAt]=asc&pagination[pageSize]=4"
        );
        if (response) {
          const data = response?.data?.data;
          setNews(data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  console.log(news, "news");

  return (
    <div className="trending-news">
      {loading
        ? Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex mb-4 flex-col md:flex-row gap-4 overflow-hidden animate-pulse"
              >
                {/* Skeleton Image Section */}
                <div className="md:w-1/3 bg-gray-300 h-20 w-full object-cover" />
                {/* Skeleton Text Section */}
                <div className="md:w-2/3">
                  <div className="h-4 bg-gray-300 mb-1 w-1/4 rounded" />
                  <div className="h-3 bg-gray-300 mb-2 rounded" />
                  <div className="h-3 bg-gray-300 mb-2 rounded" />
                  <div className="h-3 bg-gray-300 rounded w-3/4" />
                </div>
              </div>
            ))
        : news?.map((item, index) => (
            <div key={item.id}>
              <div className="flex mb-4 flex-col md:flex-row gap-4 overflow-hidden">
                {/* Image Section */}
                <div className="md:w-1/3">
                  <img
                    src={
                      item?.attributes?.thumbnail?.data === null
                        ? null
                        : strapiBaseURl +
                            item?.attributes?.thumbnail?.data[0]?.attributes
                              ?.url || "https://via.placeholder.com/600x400"
                    }
                    alt={item.attributes.title || "Blog"}
                    className="w-full h-20 object-cover"
                  />
                </div>
                {/* Text Section */}
                <div className="md:w-2/3">
                  <h2 className="text-xs text-gray-400 mb-1">
                    {new Date(item?.attributes?.createdAt).toLocaleDateString()}
                  </h2>
                  <p className="text-gray-800 text-sm">
                    {item?.attributes?.short_description
                      ? item.attributes?.short_description?.length > 120
                        ? `${item.attributes?.short_description?.slice(
                            0,
                            120
                          )}...`
                        : item?.attributes?.short_description
                      : "No description available."}
                  </p>
                </div>
              </div>
              {/* Add horizontal line */}
              {index < news.length - 1 && <hr className="my-4" />}
            </div>
          ))}
    </div>
  );
};

export default TrendingNews;
