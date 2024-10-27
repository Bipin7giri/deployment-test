import { Skeleton, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CashflowDynamicTable from "./Tables/CashflowDynamicTable";
import { useRouter } from "next/navigation";
import request from "../../../../api/request";
import { formatNumberwithComma } from "../../../../utils/formatNumber";

export default function CashFlow({ symbol }) {
  const router = useRouter();
  const [datafound, setdatafound] = useState(true);
  const { is_subscribed, isLoggedIn } = useSelector((state) => state.auth);
  const [Annualdata, setAnnualdata] = useState(null);
  const newarr = [];
  const Years = [];
  let allYearData = [];
  const getData = async () => {
    const apidata = await request({
      method: "post",
      url: "report/annualById/",
      data: {
        symbol,
        id: "7",
      },
    });
    if (Object.keys(apidata?.data?.data?.report_obj)?.length <= 0) {
      setdatafound(false);
      return;
    }
    if (Object.keys(apidata?.data?.data?.report_obj).length > 0) {
      const me = apidata?.data?.data;
      for (const year in me.report_obj) {
        Years.push(year);
        if (Object.hasOwnProperty.call(me.report_obj, year)) {
          const yearArray = me.report_obj[year];
          for (let i = 0; i < yearArray.length; i++) {
            const entry = yearArray[i];
            newarr.push(entry);
          }
        }
      }
    }

    let newObj = {};
    for (let i = 0; i < newarr.length / Years.length; i++) {
      let mainSkey = newarr[i].skey;
      if (Object.keys(newObj).length > 0) {
        allYearData.push(newObj);
      }
      newObj = {};
      let index = 0;
      for (let j = 0; j < newarr.length; j++) {
        if (mainSkey === newarr[j].skey && Years[index]) {
          newObj[`Particular`] = mainSkey;
          newObj[`${Years[index]}`] = newarr[j].value;
          index = index + 1;
        }
      }
    }
    if (allYearData.length > 0) {
      setAnnualdata(allYearData);
    }
  };
  useEffect(() => {
    if (is_subscribed) {
      getData();
    } else if (!isLoggedIn) {
      router.push("/login");
    }
    if (isLoggedIn && !is_subscribed) {
      router.push("/subscription-plan");
    }
  }, [symbol, is_subscribed]);

  return (
    <div>
      {is_subscribed && Annualdata ? (
        <CashflowDynamicTable data={Annualdata} />
      ) : (
        <div className="my-10">
          {datafound && (
            <>
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
              <Skeleton active />
            </>
          )}
        </div>
      )}

      {!datafound && (
        <div className="">
          <Table dataSource={[]} columns={[{ title: "Particular" }]} />
        </div>
      )}
    </div>
  );
}
