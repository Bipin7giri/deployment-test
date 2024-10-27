import React from "react";
import Link from "next/link";
import { formatMoney } from "../../../../utils/formatMoney";
import { Popover, Skeleton, Table } from "antd";

const BreakDownSymbolDashboardTable = ({
  loading,
  data,
  brokerInvestmentStatus,
  title,
}) => {
  console.log('data', data)
  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      fixed: "right",
      responsive: ["md"],
      style: { fontSize: "76px" },
      // sorter: (a, b) => a.sno - b.sno,
      render: (text, record, index) => (
        <div className="text-center">{text}</div>
      ),
    },
    {
      title: "Broker Name",
      dataIndex: "brokerName",
      key: "brokerName",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content="">
                {/* <Link href={`/broker/${record.brokerId}`}>{text}</Link> */}
                <Link href={``}>{text}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Broker Number",
      dataIndex: "brokerId",
      key: "brokerId",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content="">
                <Link href="">{text}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: brokerInvestmentStatus === "Buy" ? "Buy Units" : "Sell Units",
      dataIndex: "contractQuantity",
      key: "contractQuantity",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractQuantity - b.contractQuantity,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Total Amount ('000)",
      dataIndex: "contractAmount",
      key: "contractAmount",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractAmount - b.contractAmount,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Average Price",
      dataIndex: "averagePrice",
      key: "averagePrice",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.averagePrice - b.averagePrice,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
  ];
  const othercolumns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      fixed: "right",
      responsive: ["md"],
      style: { fontSize: "76px" },
      // sorter: (a, b) => a.sno - b.sno,
      render: (text, record, index) => (
        <div className="text-center">{text}</div>
      ),
    },
    {
      title: "Broker Name",
      dataIndex: "brokerName",
      key: "brokerName",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content="">
                {/* <Link href={`/broker/${record.brokerId}`}>{text}</Link> */}
                <Link href={``}>{text}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Broker Number",
      dataIndex: "brokerId",
      key: "brokerId",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content="">
                <Link href="">{text}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: brokerInvestmentStatus === "Buy" ? "Buy Units" : "Sell Units",
      dataIndex: "contractQuantity",
      key: "contractQuantity",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractQuantity - b.contractQuantity,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Total Amount ('000)",
      dataIndex: "contractAmount",
      key: "contractAmount",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractAmount - b.contractAmount,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
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
    }
  `;

  return (
    <>
      <div className="mt-[20px]">
        {loading && (
          <div className=" w-full  sm:mx-28  px-8 lg:px-0  lg:mx-auto  flex lg:flex-col flex-col gap-5  py-5  justify-between ">
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
          </div>
        )}

        {data?.length > 0 && (
          <>
            <style>{styles}</style>
            <Table
              columns={title === "brokersymbol" ? columns : othercolumns}
              dataSource={data}
              size="small"
              className="table-responsive"
              scroll={{ x: true }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default BreakDownSymbolDashboardTable;
