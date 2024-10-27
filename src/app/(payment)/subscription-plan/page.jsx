"use client";
import { useEffect } from "react";
import InfluencerPaymentMessage from "./_component/InfluencerPaymentMessage";
import Plan from "./_component/Plan";
import { useDispatch, useSelector } from "react-redux";
import actions from "@/app/(home)/redux/actions";

const SubscriptionPlan = () => {
  const dispatch = useDispatch();
  const { memberType } = useSelector((state) => state.auth);

  const { subscriptionDetails } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(actions.getSubscriptionDetails());
  }, [dispatch]);

  const basicPackage = subscriptionDetails?.find(
    (item) => item.packageName === "basic"
  );
  const originalPrice = basicPackage?.price;
  const discount = basicPackage?.discountPercentage;
  const discountPrice =
    originalPrice - Math.ceil((discount / 100) * originalPrice);

    const courseDetail = subscriptionDetails?.find((item)=> item.packageName === "course")
    const packageCourseDetail = subscriptionDetails?.find((item)=> item.packageName === "basic&course")
  const packages = [
    {
      title: "Saral Package",
      slug: "saral_package",
      plans: [
        {
          id: 1,
          plan: "Saral Rating",
          planDescription:
            "Saral Rating takes in 16 different factors to give you an idea of how the company is performing and what you can expect in the future",
        },
        {
          id: 2,
          plan: "Pro Ratings",
          planDescription:
            "Pro Ratings gives you an indication of how healthy the bank is in terms of major indicators. We have rigorously tested it and is 80% accurate",
        },
        {
          id: 3,
          plan: "Mutual Fund Analysis",
          planDescription:
            "Ever wondered what the big fish are doing? Get access to how the mutual fund have been performing and how they are strategizing",
        },
        {
          id: 4,
          plan: "Company's Insights",
          planDescription:
            "Do you want additional insights of the company which are hard to find and search? We provide those valuable insights to our users",
        },
        {
          id: 5,
          plan: "Company Statistics",
          planDescription:
            "Just having financials is not enough. Access all the information; be it product information or the industry information. Stay ahead with simplified statistics on the go",
        },
        {
          id: 6,
          plan: "Economy Highlights",
          planDescription:
            "Ever wondered how the market would react based on economic activities? Well, be up to date on the economic matters with descriptive report of economic highlights",
        },
        {
          id: 7,
          plan: "Annual Report",
          planDescription:
            "We not only provide quaterly report but also provide annual report to subscribed user",
        },
        {
          id: 8,
          plan: "Stock Compare",
          planDescription:
            "Compare Stock With their Peer Easily so that you can choose among the best.",
        },
        {
          id: 9,
          plan: "Unlimited Watchlist",
          planDescription:
            "Add Unlimited Stocks to keep them in front of your eyes ",
        },
        {
          id: 10,
          plan: "Unlimited Portfolio Account",
          planDescription:
            "Add Multiple Account to Your Portfolio And Add multiple stock to your account.",
        },
      ],
      prices: {
        originalPrice: originalPrice,
        discount: discount,
        discountPrice: discountPrice,
      },
    },
    {
      title: "Saral Package + Course",
      slug: "saral_package_course",
      plans: [
        {
          id: 1,
          plan: "Saral Package",
          planDescription: "Get all the premium features of Saral Lagani ",
        },
        {
          id: 2,
          plan: "Saral Course",
          planDescription:
            "Get used to with stock market with guidance from the professional",
        },
      ],
      price: packageCourseDetail?.price,
    },
    {
      title: "Saral Course",
      slug: "saral_course",
      plans: [
        {
          id: 1,
          plan: "Basics of Stock Market",
          planDescription:
            "The stock market enables the trading of company shares, providing capital for businesses and investment opportunities for individuals",
        },
        {
          id: 2,
          plan: "Basic Factors",
          planDescription:
            "Stock prices are influenced by earnings, economic indicators, interest rates, and market sentiment, guiding investment decisions",
        },
        {
          id: 3,
          plan: "Risk and Return",
          planDescription:
            "Risk involves the potential for loss, while return is the gain from an investment. Balancing these is crucial for achieving financial goals",
        },
        {
          id: 4,
          plan: "Current Situation",
          planDescription:
            "Market conditions are influenced by economic factors and geopolitical events, impacting investor sentiment and volatility",
        },
        {
          id: 5,
          plan: "Support and Resistance",
          planDescription:
            "Support and resistance levels indicate where a stock's price tends to stop falling or rising, aiding in trading decisions",
        },
        {
          id: 6,
          plan: "Trendline and Fibonacci Retracement",
          planDescription:
            "Trendlines show the stock's direction, while Fibonacci retracement levels predict potential support and resistance points",
        },
        {
          id: 7,
          plan: "Chart Pattern",
          planDescription:
            "Chart patterns like head and shoulders and triangles help predict future stock price movements by analyzing past trends",
        },
        {
          id: 8,
          plan: "Candlestick",
          planDescription:
            "Candlestick charts display price movements within a period, helping traders understand market sentiment through patterns",
        },
        {
          id: 9,
          plan: "Lagging Indicators",
          planDescription:
            "Lagging indicators, such as moving averages, confirm market trends after they have begun, helping to validate trends' strength",
        },
        {
          id: 10,
          plan: "RSI & MACD",
          planDescription:
            "RSI indicates overbought or oversold conditions, while MACD shows the relationship between two moving averages, both assessing market momentum",
        },
        {
          id: 11,
          plan: "Stochastic RSI",
          planDescription:
            "Stochastic RSI measures overbought and oversold conditions more sensitively, helping to identify potential market reversals",
        },
      ],
      price: courseDetail?.price,
    },
  ];

  return memberType == 3 ? (
    <div className="flex flex-col min-h-screen">
      <InfluencerPaymentMessage message="dsads" />
    </div>
  ) : (
    <div className="lg:container lg:mt-0 mt-[180px] mx-auto flex justify-center items-center flex-col gap-6 py-8 md:px-4 bg-[#f4f6f9]">
      <p className="font-semibold text-4xl">
        {" "}
        Contact us for more info: 9860203881
      </p>

      <div className="flex flex-wrap w-full justify-center items-start gap-8 mb-[30px]">
        {packages?.map((item, id) => (
          <Plan key={id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
