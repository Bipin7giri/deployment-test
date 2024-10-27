import React from "react";
import Company from "./Company";
import axios from "axios";

export async function generateMetadata({ params }, parent) {
  const id = params.id;
  async function fetchData(id) {
    try {
      // Ensure the environment variable is set
      if (!process.env.NEXT_PUBLIC_BASE_URL) {
        throw new Error("Base URL is missing in environment variables.");
      }
  
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/live_data/live/${id}`,
        {
          headers: {
            Permission: "2021D@T@f@RSt6&%2-D@T@", // API key or permission token
          },
        }
      );
  
      // Check if the response is successful (status code 200)
      if (res.status !== 200) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }
  
      // Safely access the data and return the first item
      const data = res.data.data?.[0];
      if (!data) {
        throw new Error("Data is empty or undefined.");
      }
  
      return data;
    } catch (error) {
      // Handle errors gracefully
      console.error("Error fetching data:", error.message || error);
      return null; // Return null or handle the error as needed
    }
  }
  const data = await fetchData();
  if(data){
    const ogImageUrl = `https://peridotnepal.xyz/company_logo/${id}.webp`;
    const previousImages = (await parent).openGraph?.images || [];
    return {
      title: `${data.companyName} (${data.symbol}) | ${data.sectorName}`,
      description: `Name: ${data.companyName}, Symbol: ${data.symbol}, Sector: ${data.sectorName}, Total Trade: ${data.totalTradeQuantity}, LTP: ${data.lastTradedPrice}`,
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
  }

}

export default function CompanySinglePage({ params: { id } }) {
  return (
    <div>
      <Company id={id} />
    </div>
  );
}
