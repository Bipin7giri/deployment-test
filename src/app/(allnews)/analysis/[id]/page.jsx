import React from "react";
import AnalysisDetails from "./AnalysisDetails";
import { newsApi } from "@/api/axios";

export async function generateMetadata({ params }, parent) {
  const id = params.id;
  let analysisDetails = await newsApi.get(
    `/analyses/${parseInt(id)}?populate=thumbnail&sort[0][createdAt]=desc`
  );

  const ogImageUrl = `https://news.sarallagani.xyz${analysisDetails?.data?.data?.attributes?.thumbnail?.data?.attributes?.url}`;
  const ogUrl = `https://news.sarallagani.xyz/api/analyses/${parseInt(
    id
  )}?populate=*&sort[0][createdAt]=desc`;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: analysisDetails?.data?.data?.attributes?.title,
    ["og:title"]: analysisDetails?.data?.data?.attributes?.title,
    ["og:url"]: ogUrl,
    ["og:description"]:
      analysisDetails?.data?.data?.attributes?.short_description,
    description: analysisDetails?.data?.data?.attributes?.short_description,
    keywords: ["Analysis", "Company Analysis", "NEPSE", "Analyze company"],
    openGraph: {
      images: [ogImageUrl, ...previousImages],
    },
    ["og:image"]: ogImageUrl,
  };
}

const page = ({ params: { id } }) => {
  return (
    <>
      <AnalysisDetails id={id} />
    </>
  );
};

export default page;
