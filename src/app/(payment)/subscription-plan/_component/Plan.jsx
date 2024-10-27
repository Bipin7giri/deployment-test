"use client";
import Accordion from "./Accordion";
// import pay from "../../../../assets/p";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "@/utils/formatMoney";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import actions from "../../../(home)/redux/actions";

function Plan({ data }) {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const handleLoginBeforePayment = () => {
    router.push(`/login`);
  };

  const handlePayment = () => {
    router.push(`/payment-details/${data.slug}`);
  };

  return (
    <div className="bg-secondary h-auto w-10/12 sm:max-w-md md:max-w-lg lg:max-w-md p-6 rounded-[20px] border-1 shadow-xl flex flex-col justify-center mt-[20px]">
      <h2 className="inline font-bold text-2xl tracking-wide mb-2">
        {data.title}
      </h2>

      <Accordion plans={data.plans} />

      {data.title === "Saral Package" && (
        <>
          <div className="flex items-center mt-[14px]">
            <p className="line-through mr-[12px] text-[#727586]">
              NRs. {formatMoney(data?.prices?.originalPrice)}
            </p>
            <Tag
              color="purple"
              className="rounded-[12px] capitalize border-none font-semibold py-[1px] px-[10px] lg:text-[16px] text-2xl"
            >
              save {data?.prices?.discount}%
            </Tag>
          </div>
          <div className="py-[10px] mt-[10px]">
            <h1 className="inline font-bold text-4xl">
              NRs. {data?.prices?.discountPrice}
            </h1>
            <span className="font-bold text-lg"> / year</span>
          </div>
        </>
      )}
      {data.title === "Saral Package + Course" && (
        <div className="py-[10px] mt-[10px]">
          <h1 className="inline font-bold text-4xl">NRs. {data?.price}</h1>
          <span className="font-bold text-lg"> / year</span>
        </div>
      )}
      {data.title === "Saral Course" && (
        <div className="py-[10px] mt-[10px] flex flex-col">
          <h1 className="inline font-bold text-4xl">NRs. {data?.price}</h1>
          <span className="font-bold text-lg"> 2 days session(2 hours each)</span>
        </div>
      )}
      {!isLoggedIn ? (
        <button
          className="w-full mt-4 mx-auto text-white text-[20px] tracking-wide bg-black border-0 py-2 rounded-lg px-4"
          onClick={() => {
            handleLoginBeforePayment();
          }}
        >
          Pay Now
        </button>
      ) : (
        <button
          className="w-full mt-4 mx-auto text-white text-[20px] tracking-wide bg-black border-0 py-2 rounded-lg px-4"
          onClick={() => {
            handlePayment();
          }}
        >
          Pay Now
        </button>
      )}
    </div>
  );
}

export default Plan;
