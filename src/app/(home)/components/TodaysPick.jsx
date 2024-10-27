import React, { useEffect, useState } from "react";
import { Carousel, Skeleton } from "antd";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import { formatMoney } from "../../../utils/formatMoney";
import { useRouter } from "next/navigation";

const TodaysPick = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gainer, loser } = useSelector((state) => state.home);

  const [gainerPicked, setGainerPicked] = useState(true);
  const [gainerLoserData, setGainerLoserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const responsiveSettings = [
    {
      breakpoint: 1024,
      settings: {
        slidesPerRow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesPerRow: 1,
      },
    },
  ];

  useEffect(() => {
    dispatch({ type: actions.GET_GAINER_REQ });
    dispatch({ type: actions.GET_LOOSER_REQ });
  }, []);

  useEffect(() => {
    if (gainer.length > 0) {
      addGainers();
    } else {
      setIsLoading(false);
    }
  }, [gainer]);

  const addLosers = () => {
    const sortedLosers = [...loser]?.map((item, id) => {
      return {
        perChange: item?.perChange?.toFixed(2),
        lastTradedPrice: item?.lastTradedPrice,
        schange: item?.schange,
        symbol: item?.symbol,
      };
    });
    sortedLosers?.sort((a, b) => a?.perChange - b?.perChange);
    const topLosers = sortedLosers?.slice(0, 6);
    setGainerLoserData(topLosers);
    setGainerPicked(false);
  };

  const addGainers = () => {
    try {
      const sortedGainer = [...gainer]?.map((item, id) => {
        return {
          perChange: item?.perChange?.toFixed(2),
          lastTradedPrice: item?.lastTradedPrice,
          schange: item?.schange,
          symbol: item?.symbol,
        };
      });
      sortedGainer?.sort((a, b) => b?.perChange - a?.perChange);
      const topGainer = sortedGainer?.slice(0, 6);
      setGainerLoserData(topGainer);
      setGainerPicked(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="todays-pick">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div
            className="up-down"
            style={{ marginRight: "10px", fontSize: "12px" }}
          >
            <TbTriangleFilled
              onClick={() => addGainers()}
              style={{ color: "#23B123" }}
            />
            <TbTriangleInvertedFilled
              onClick={() => addLosers()}
              style={{ color: "#F63538" }}
            />
          </div>
          <h3 className="block-title">
            {gainerPicked ? "Today's Gainer" : "Today's Loser"}
          </h3>
        </div>

        {isLoading ? (
          <Skeleton />
        ) : (
          <Carousel
            autoplay
            dotPosition="bottom"
            slidesPerRow={3}
            columnGap="10px"
            speed={1000}
            responsive={responsiveSettings}
          >
            {gainerLoserData?.map((item, id) => (
              <div
                key={id}
                className="pick-list cursor-pointer"
                onClick={() => {
                  router.push(`/company/${item?.symbol}`);
                }}
              >
                <div className="pick-content">
                  <div>
                    <span className={item?.perChange > 0 ? "gainer" : "loser"}>
                      {item?.perChange}%
                    </span>
                    <span className="text-md lg:text-none">{item?.symbol}</span>
                    <img
                      className="lg:w-8 w-12 h-12 lg:h-8 rounded-full object-contain"
                      src={`${
                        `https://peridotnepal.xyz/company_logo/${item?.symbol}.webp`
                          ? `https://peridotnepal.xyz/company_logo/${item?.symbol}.webp`
                          : "https://peridotnepal.xyz/company_logo/sarallagani.webp"
                      } `}
                      onError={(e) => {
                        e.target.src =
                          "https://peridotnepal.xyz/company_logo/sarallagani.webp";
                      }}
                      alt={item?.symbol}
                    />
                  </div>
                  <p
                    style={{
                      color: "#F6F7F8",
                      fontSize: "16px",
                      textAlign: "right",
                      fontWeight: "300",
                    }}
                  >
                    Rs. {formatMoney(item?.lastTradedPrice)}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default TodaysPick;
