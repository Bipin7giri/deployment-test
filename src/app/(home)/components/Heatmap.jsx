"use effect";
import api from "@/api/axios";
import TurnoverWiseHeatMap from "@/app/(market)/_component/TurnoverWiseHeatMap";
import VolumeWiseHeatMap from "@/app/(market)/_component/VolumeWiseHeatMap";
import marketActions from "@/app/(market)/_redux/actions";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeatmapChart from "./HeatmapChart";

function getLevelOption() {
  return [
    {
      itemStyle: {
        borderWidth: 3,
        borderColor: "#333",
        gapWidth: 3,
      },
    },

    {
      color: ["#2f9e4f", "#414554", "#8b444e", "#bf4045", "#f63538", "#30cc5a"],
      colorMappingBy: "value",
      itemStyle: {
        gapWidth: 1,
      },
    },
  ];
}

const Heatmap = () => {
  const dispatch = useDispatch();
  const [sectorList, setSectorList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Turnover");
  const [selectedSector, setSelectedSector] = useState("");
  const { heatMapDataBySector } = useSelector((state) => state.market);

  const fetchSectors = async () => {
    try {
      const { data: sectors } = await api.post(`/report/getAllSectors`);
      setSectorList(sectors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSectors();
    dispatch(marketActions.getHeatMapDataBySector({ sector: selectedSector }));
  }, [selectedSector]);

  const tabs = [
    { label: "Turnover", value: "Turnover" },
    { label: "Volume", value: "Volume" },
  ];

  const heatMap = heatMapDataBySector?.data?.data || [];

  const options = sectorList?.map((item) => ({
    value: item?.sector_name,
    label: item?.sector_name,
  }));
  options?.push({
    value: "",
    label: "All sector",
  });

  return (
    <>
      <div className="lg:container lg:px-8 lg:mx-auto py-14 px-4">
        <div className="flex justify-between w-full">
          <div className="w-full mb-4 flex items-center justify-between gap-10">
            <Select
              placeholder="Please select"
              onChange={(value) => setSelectedSector(value)}
              value={selectedSector}
              className="w-[300px]"
              options={options}
            />
            <ul className="flex justify-end items-center w-full ">
              {tabs?.map((route, id) => {
                return (
                  <li key={id} style={{ fontFamily: "poppins" }}>
                    <div>
                      <button
                        onClick={() => {
                          setSelectedTab(route?.value);
                        }}
                        className={`${
                          selectedTab === route?.value
                            ? "bg-black text-secondary"
                            : "bg-secondary text-primary border border-black"
                        } border border-gray-200 w-[150px] lg:w-auto cursor-pointer px-2 py-4 lg:px-4 lg:py-2 lg:text-xs text-xl leading-5 mr-3 rounded-full`}
                      >
                        {route?.label}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <HeatmapChart
          heatMap={heatMap}
          selectedTab={selectedTab}
          getLevelOption={getLevelOption}
        />
      </div>
    </>
  );
};

export default Heatmap;
