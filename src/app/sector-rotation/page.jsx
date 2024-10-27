"use client";
import React, { useEffect, useState } from "react";

import DynamicTable from "./_components/DynamicTable";
import actions from "../(tools)/_redux/action";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { screenRotation } from "../(tools)/_redux/toolsSaga";

const columns = [
  {
    title: "S.No",
    dataIndex: "sno",
    key: "sno",
    align: "center",
    width: 70,
  },
  {
    title: "Sector",
    dataIndex: "index",
    key: "index",
    align: "left",
    width: 100,
  },
  {
    title: "Old Index",
    dataIndex: "oldIndex",
    key: "oldIndex",
    align: "center",
    width: 70,
  },
  {
    title: "Current Index",
    dataIndex: "currentIndex",
    key: "currentIndex",
    align: "center",
    width: 70,
  },
  // {
  //     title: "Today's gain",
  //     dataIndex: "todaysGain",
  //     key: "index",
  //     align: "center",
  //     width: 70,
  // },
  {
    title: "Monthly gain",
    dataIndex: "monthlyGain",
    key: "monthlyGain",
    align: "center",
    width: 70,
  },
  {
    title: "Ranking",
    dataIndex: "ranking",
    key: "ranking",
    align: "center",
    width: 70,
  },
];

const StockRotation = () => {
  const { sectorRotation, loading } = useSelector((state) => state.tools);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.sectorRotationData());
  }, []);

  return (
    <>
      <div className="w-full flex  item-center justify-center">
        <div className="w-[85%] flex flex-col items-center justify-center">
          <p className="lg:text-[20px] font-[600] py-2 pt-[20px] text-[32px] mr-auto mb-5">
            Sector rotation
          </p>
          {loading || sectorRotation.length < 0 ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <DynamicTable initialColumns={columns} data={sectorRotation} />
          )}
        </div>
      </div>
    </>
  );
};

export default StockRotation;
