import { newsApi } from "@/api/axios";
import React from "react";
import NewsDetails from "./_components/NewsDetails";
import { getLatestNews, getNews } from "./_api";

export const generateMetadata = async (
  { searchParams: { newsId } },
  parent
) => {
  try {
    const { news } = await getNews(newsId);
    // const ogImageUrl = `https://peridotnepal.xyz/company_logo/${newsId}.webp`;
    const ogImageUrl = `https://news.sarallagani.xyz${news?.attributes?.thumbnail?.data[0]?.attributes?.url}`;
    const ogUrl = `https://news.sarallagani.xyz/api/newsses/${parseInt(
      newsId
    )}?populate=*&sort[0][createdAt]=desc`;
    const previousImages = (await parent).openGraph?.images || [];
    return {
      title: news?.attributes?.title,
      ["og:title"]: news?.attributes?.title,
      ["og:url"]: ogUrl,
      ["og:description"]: news?.attributes?.short_description,
      description: news?.attributes?.short_description,
      keywords: [
        "Stock Screener",
        "analyze company",
        "NEPSE",
        "company screener",
        "stock compare",
      ],
      openGraph: {
        images: [ogImageUrl, ...previousImages],
      },
      ["og:image"]: ogImageUrl,
    };
  } catch (error) {
    console.log("generateMetadata", error);
  }
};

export default async function NewsDetailsOfParticularnews({
  searchParams: { newsId },
}) {
  const { data: newsDetails } = await newsApi.get(
    `/newsses/${parseInt(newsId)}?populate=thumbnail&sort[0][createdAt]=desc`
  );

  const { data: currentNews } = await newsApi.get(
    `/newsses?sort[0][createdAt]=desc`
  );

  const { data: getComment } = await newsApi.get(
    `/comments?filters[newss][id][$eq]=${newsDetails?.data?.id}&sort[0][createdAt]=desc`
  );

  return (
    <NewsDetails
      id={newsId}
      newsDetailsprops={newsDetails}
      currentNewsprops={currentNews}
      getCommentprops={getComment}
    />
  );
}
