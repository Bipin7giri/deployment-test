"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../_redux/actions";
import PromoterShareTable from "./PromoterShareTable";

const PromoterShare = () => {
  const dispatch = useDispatch();
  const { promoterShareData } = useSelector((state) => state.screener);
  const [lockedData, setLockedData] = useState([]);
  const [unlockedData, setUnlockedData] = useState([]);

  useEffect(() => {
    dispatch(actions.promoterShareData());
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    if (promoterShareData?.length > 0) {
      setLockedData(
        promoterShareData
          .filter((data) => data.period > formattedDate)
          .map((item, index) => ({
            ...item,
            id: index + 1,
            remainingDay:
              (new Date(item.period) - new Date(formattedDate)) /
              (1000 * 60 * 60 * 24),
          }))
      );
      setUnlockedData(
        promoterShareData
          .filter((data) => data.period <= formattedDate)
          .map((item, index) => ({ ...item, id: index + 1 }))
      );
    }
  }, [promoterShareData]);

  return (
    <section className="py-10 px-8 lg:mt-0 mt-44 flex lg:flex-row flex-col w-full items-start gap-10">
      <div className="w-full space-y-2">
        <h2 className="text-xl font-semibold">Locked</h2>
        <PromoterShareTable isLocked={true} data={lockedData} />
      </div>
      <div className="w-full space-y-2">
        <h2 className="text-xl font-semibold">Unlocked</h2>
        <PromoterShareTable isLocked={false} data={unlockedData} />
      </div>
    </section>
  );
};

export default PromoterShare;
