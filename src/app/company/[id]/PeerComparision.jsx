import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./redux/actions";
import PeerComparisionTable from "./component/Tables/PeerComarisonTable";
import { Skeleton, Tag } from "antd";
import { formatMoney } from "../../../utils/formatMoney";

const PeerComparision = ({ sector, symbol }) => {
  const { company, PCSectorInfo, peerComparison, isPeerComparisonLoading } =
    useSelector((state) => state.company);
  function handleNavigation(symbol) {
    if (typeof window !== "undefined") {
      window.location.href = `/company/${symbol}`;
    }
  }

  const dispatch = useDispatch();
  const [initialColumns, setInitialColumn] = useState([]);
  const [data, setTableData] = useState([]);
  // set intitial column
  const funInitialColumn = () => {
    const keys = Object?.keys(peerComparison);
    let data = [
      {
        title: "S.No",
        dataIndex: "sno",
        key: "sno",
        fixed: "left",
        width: 80,
        sorter: (a, b) => a.sno - b.sno,
        render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
      },
      {
        title: "Symbol",
        dataIndex: "symbol",
        key: "symbol",
        fixed: "left",
        width: 150,
        sorter: (a, b) => a.symbol.localeCompare(b.symbol),
        render: (text) => (
          <div
            className="cursor-pointer hover:text-info"
            onClick={() => {
              handleNavigation(text);
            }}
            style={{ textAlign: "center" }}
          >
            {text}
          </div>
        ),
      },
    ];
    for (const column of keys) {
      data.push({
        title: column,
        dataIndex: column,
        key: column,
        width: 200,
        sorter: (a, b) => {
          return a[column] - b[column];
        },
        render: (text) => (
          <div style={{ textAlign: "center" }}>
            {column === "LTP" && text?.toFixed(2)}
            {column === "Earnings Per Share" && text?.toFixed(2)}
            {column === "Market Cap" && formatMoney(text?.toFixed(2))}
            {column === "Return on Equity" && text?.toFixed(2) + "%"}
            {column === "Return on Asset" && text?.toFixed(2) + "%"}
            {column === "Price/Earnings" && text?.toFixed(2) + "x"}
            {column === "Price/Book" && text?.toFixed(2) + "x"}
          </div>
        ),
      });
    }
    setInitialColumn(data);
  };

  // set TableData
  const setData = () => {
    const LTP = peerComparison["LTP"] || null;
    const pricePerEarning = peerComparison["Price/Earnings"] || null;
    const earningShare = peerComparison["Earnings Per Share"] || null;
    const bookEarning = peerComparison["Price/Book"] || null;
    const marketCap = peerComparison["Market Cap"] || null;
    const assets = peerComparison["Return on Asset"] || null;
    const equity = peerComparison["Return on Equity"] || null;
    let obj = [];
    const objectkeys = Object?.keys(peerComparison);
    for (let i = 0; i < peerComparison[objectkeys[0]].length; i++) {
      obj.push({
        key: i.toString(),
        sno: i + 1,
        symbol: peerComparison[objectkeys[0]]
          ? peerComparison[objectkeys[0]][i]?.symbol
          : "-",
        ["LTP"]: LTP
          ? LTP.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value
          : "-",
        ["Earnings Per Share"]: earningShare
          ? earningShare.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value
          : "-",
        ["Price/Earnings"]: pricePerEarning
          ? pricePerEarning.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value
          : "-",
        ["Price/Book"]: bookEarning
          ? bookEarning.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value
          : "-",
        ["Return on Asset"]: assets
          ? assets.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value * 100
          : "-",
        ["Return on Equity"]: equity
          ? equity.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value * 100
          : "-",
        ["Market Cap"]: marketCap
          ? marketCap.find(
              (stock) =>
                stock.symbol === peerComparison[objectkeys[0]][i]?.symbol
            )?.value
          : "-",
      });
    }
    setTableData(obj);
  };
  useEffect(() => {
    if (peerComparison !== undefined) {
      if (Object?.keys(peerComparison)?.length !== 0) {
        funInitialColumn();
        setData();
      }
    }
  }, [peerComparison]);

  useEffect(() => {
    if (sector !== PCSectorInfo?.sector) {
      dispatch(actions.peercomprasion({ sector: sector }));
    }
  }, [sector]);

  let dataYear =
    Object?.keys(peerComparison)?.length > 0
      ? peerComparison?.["Earnings Per Share"]?.[0]?.year
      : "";

  return (
    <>
      <div className="">
        <div className="lg:container lg:mx-auto lg:mt-0 gap-10 ">
          <div className="flex justify-end">
            {dataYear ? <Tag color="cyan"> as of {dataYear} </Tag> : ""}
          </div>
          <div className="mt-4 lg:min-h-[60vh]">
            {isPeerComparisonLoading && (
              <>
                <Skeleton paragraph={{ rows: 14 }} />
              </>
            )}
            {!isPeerComparisonLoading && (
              <>
                <PeerComparisionTable
                  initialColumns={initialColumns}
                  data={data}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PeerComparision;
