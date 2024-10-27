"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../_redux/actions";
import PriceVolumeTable from "./PriceVolumeTable";
import { Skeleton } from "antd";

const PriceVolume = () => {
  const [selectedTab, setSelectedTab] = useState("Price Up Volume Up");
  const { priceUpVolumeUpData, priceDownVolumeUpData, screenerLoading } =
    useSelector((state) => state.screener);
  const dispatch = useDispatch();
  const tab = ["Price Up Volume Up", "Price Down Volume Up"];

  useEffect(() => {
    if (selectedTab === "Price Up Volume Up") {
      dispatch(actions.priceUpVolumeUpData());
    } else {
      dispatch(actions.priceDownVolumeUpData());
    }
  }, [selectedTab]);

  return (
    <section className="py-10 px-8 lg:mt-0 mt-44">
      <div className="flex items-center gap-4 mb-6">
        {tab.map((item, id) => (
          <button
            key={id}
            onClick={() => setSelectedTab(item)}
            className={`${
              selectedTab === item
                ? "border-gray-700 text-black"
                : "text-gray-600 border-gray-300"
            } border-b-2 font-medium text-lg`}
          >
            {item}
          </button>
        ))}
      </div>
      {!screenerLoading ? (
        <PriceVolumeTable
          data={
            selectedTab === "Price Up Volume Up"
              ? priceUpVolumeUpData
              : priceDownVolumeUpData
          }
        />
      ) : (
        <Skeleton paragraph={{ rows: 14 }} style={{ width: "100%" }} />
      )}
    </section>
  );
};

export default PriceVolume;
