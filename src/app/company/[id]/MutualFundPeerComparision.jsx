import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "./redux/actions";
import { Skeleton, Table, Tag } from "antd";
import { formatMoney } from "../../../utils/formatMoney";

export default function MutualFundPeerComparision({ symbol }) {
  const dispatch = useDispatch();
  const {
    company,
    mutualFundPeerComparisionLoading,
    mutualFundPeerComparision,
  } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(actions.getMutualFundPeerComparision());
  }, [symbol]);

  function handleNavigation(symbol) {
    if (typeof window !== "undefined") {
      window.location.href = `/company/${symbol}`;
    }
  }

  let data = [];
  if (
    mutualFundPeerComparision?.data?.mutualFundsPeerComparision !== undefined &&
    mutualFundPeerComparision?.data?.mutualFundsPeerComparision !== null
  ) {
    data = mutualFundPeerComparision?.data?.mutualFundsPeerComparision?.map(
      (item, id) => {
        return {
          sno: id + 1,
          symbol: item?.symbol,
          nav: item?.Net_Assets_Value,
          fundSize: item?.fundSize,
          maturityDate: item?.maturityDate?.split("T")?.[0],
          maturityPeriod: item?.maturityPeriod?.split(" ")?.[0],
          lastTradedPrice: item?.lastTradedPrice,
          companyName: item?.companyName,
          premium: (
            ((item?.lastTradedPrice - item?.Net_Assets_Value) /
              item?.Net_Assets_Value) *
            100
          )?.toFixed(2),
        };
      }
    );
  }

  let columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      fixed: "left",
      width: 50,
      sorter: (a, b) => a.sno - b.sno,
      render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      fixed: "left",
      width: 100,
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
    {
      title: "LTP",
      dataIndex: "lastTradedPrice",
      key: "lastTradedPrice",
      width: 80,
      sorter: (a, b) => a.lastTradedPrice - b.lastTradedPrice,
      render: (text) => (
        <div style={{ textAlign: "center" }}> {text ? text : "-"} </div>
      ),
    },
    {
      title: "Monthly NAV",
      dataIndex: "nav",
      key: "nav",
      width: 140,
      sorter: (a, b) => a.nav - b.nav,
      render: (text) => <div style={{ textAlign: "center" }}> {text} </div>,
    },
    {
      title: "Fund Manager",
      dataIndex: "companyName",
      key: "companyName",
      width: 200,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text) => <div style={{ textAlign: "center" }}> {text} </div>,
    },
    {
      title: "Maturity Period",
      dataIndex: "maturityPeriod",
      key: "maturityPeriod",
      width: 170,
      sorter: (a, b) => a.maturityPeriod - b.maturityPeriod,
      render: (text) => (
        <div style={{ textAlign: "center" }}> {text} Years </div>
      ),
    },
    {
      title: "Maturity Date",
      dataIndex: "maturityDate",
      key: "maturityDate",
      width: 150,
      sorter: (a, b) => new Date(a.maturityDate) - new Date(b.maturityDate),
      render: (text) => <div style={{ textAlign: "center" }}> {text} </div>,
    },
    {
      title: "Premium/Discount",
      dataIndex: "premium",
      key: "premium",
      width: 150,
      sorter: (a, b) => a.premium - b.premium,
      render: (text) => (
        <div
          style={{ textAlign: "center" }}
          className={`${text > 0 ? "text-danger" : "text-success"}`}
        >
          {" "}
          {text}%{" "}
        </div>
      ),
    },
    {
      title: "Fund Size",
      dataIndex: "fundSize",
      key: "fundSize",
      width: 120,
      sorter: (a, b) => a.fundSize - b.fundSize,
      render: (text) => (
        <div style={{ textAlign: "center" }}> {formatMoney(text)} </div>
      ),
    },
  ];

  const styles = `
    @media (min-width: 640px) {
      .table-responsive td, .table-responsive th {
        font-size: 26px;
      }
  
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 20px;
        margint-top:10px /* Adjust the font size as per your requirement */
      }
  
      :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table {
        line-height: 0.571429;
      }
    }
  
    @media (min-width: 1024px) {
      .table-responsive td, .table-responsive th {
        font-size: 14px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 14px;
        margint-top:10px /* Adjust the font size as per your requirement */
      }
      :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table {
        line-height: 0.971429;
      }
    }  
  `;

  return (
    <>
      <div className="lg:container lg:mx-auto lg:mt-0 gap-10 ">
        <div className="flex justify-end">
          {/* {
                        dataYear ? <Tag color="cyan"> as of  </Tag> : ''
                    } */}
        </div>
        <div className="mt-4 lg:min-h-[60vh] pb-[40px]">
          {mutualFundPeerComparisionLoading && (
            <>
              <Skeleton paragraph={{ rows: 14 }} />
            </>
          )}
          {!mutualFundPeerComparisionLoading && (
            <>
              <style>{styles}</style>
              <Table
                className="table-responsive"
                pagination={false}
                scroll={{ x: 200, y: 850 }}
                columns={columns}
                dataSource={data}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
