"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import marketActions from "../_redux/actions";
import TurnoverWiseHeatMap from "../_component/TurnoverWiseHeatMap";
import VolumeWiseHeatMap from "../_component/VolumeWiseHeatMap";

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

const HeatMap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(marketActions.getHeatMapData());
  }, [dispatch]);

  const hmr = [
    { label: "Turnover", value: "Turnover" },
    { label: "Volume", value: "Volume" },
  ];
  const [routeActive, setRouteActive] = useState(0);
  const [key, setKey] = useState("Turnover");

  const { heatMapData } = useSelector((state) => state.market);

  const heatMap = heatMapData?.data?.data || [];

  return (
    <>
      <div className="lg:container relative px-10 lg:px-10 mx-auto lg:pt-[0px] pt-[180px] break-down z-20">
        <div className="flex justify-between py-5 w-full">
          <div className="w-full">
            <ul className="flex justify-end mb-2 items-center w-full ">
              {hmr?.map((route, id) => {
                return (
                  <>
                    <li key={id} style={{ fontFamily: "poppins" }}>
                      <div>
                        <button
                          onClick={() => {
                            setRouteActive(id);
                            setKey(route?.value);
                          }}
                          className={`${
                            routeActive === id
                              ? "bg-black text-secondary"
                              : "bg-secondary text-primary border border-black"
                          } border border-gray-200 w-[150px] lg:w-auto cursor-pointer px-2 py-4 lg:px-4 lg:py-2 lg:text-xs text-xl leading-5 mr-3 rounded-full mb-4`}
                        >
                          {route?.label}
                        </button>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {routeActive === 0 && (
        <TurnoverWiseHeatMap
          heatMap={heatMap}
          getLevelOption={getLevelOption}
        />
      )}
      {routeActive === 1 && (
        <VolumeWiseHeatMap heatMap={heatMap} getLevelOption={getLevelOption} />
      )}
    </>
  );
};

export default HeatMap;
