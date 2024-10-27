import { Progress, Rate } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import request from "../../../../../api/request";
import { getPiotroskiRatingDescription } from "../../helpers";

export default function PiotrokshiRating({ symbol }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [ratingPercentage, setRatingPercentage] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [totalRatingSecured, setTotalRatingSecured] = useState(null);

  const getData = async () => {
    try {
      const response = await request({
        method: "get",
        url: `/company_analysis/get_piotroski_rating/${symbol}`,
      });
      if (response?.data?.data.length > 0) {
        let ratingPerc, totalRating;
        totalRating = response?.data?.data.reduce((accumulator, item) => {
          if (item?.rating === 1) {
            return accumulator + 1;
          } else {
            return accumulator;
          }
        }, 0);
        const totalCount = response?.data?.data.length;
        ratingPerc = (totalRating / totalCount) * 100;
        setRatingPercentage(ratingPerc);
        setTotalRatingSecured(totalRating);
        setTotalRating(totalCount);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {totalRating && totalRatingSecured && ratingPercentage && (
        <Progress
          strokeColor={
            totalRatingSecured >= 8
              ? "text-success"
              : totalRating <= 2
                ? "#f5222d"
                : "#4096ff"
          }
          status="active"
          showInfo={false}
          className="text-[22px] lg:text-[16px]"
          value={20 ? 20 : 0}
          percent={ratingPercentage ? ratingPercentage : 20}
          style={{
            height: "60px",
            marginLeft: -40,
            paddingLeft: 30,
          }}
        />
      )}
    </div>
  );
}
