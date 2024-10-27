"use client";
import { Popover, Skeleton, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import marketActions from "../_redux/actions";
import { formatMoney } from "../../../utils/formatMoney";
import Link from "next/link";

const SellBrokerAnalysis = () => {
  const dispatch = useDispatch();
  const { brokerStockSelling, loading } = useSelector((state) => state.market);
  useEffect(() => {
    dispatch(marketActions.getBrokerStockSelling());
  }, []);

  let sellData = [];

  if (brokerStockSelling?.sell !== undefined) {
    sellData = brokerStockSelling?.sell?.map((item, id) => {
      return {
        key: id + 1,
        sno: id + 1,
        sellerMemberId: item.sellerMemberId,
        contractAmount: item.contractAmount,
        contractQuantity: item?.contractQuantity,
      };
    });
  }

  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      fixed: "right",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      // sorter: (a, b) => a.sno - b.sno,
      render: (text, record, index) => (
        <div className="text-center">{text}</div>
      ),
    },
    {
      title: "Broker",
      dataIndex: "sellerMemberId",
      key: "sellerMemberId",
      responsive: ["md"],
      style: { fontSize: "76px" },
      fixed: "left",
      sorter: (a, b) => a.sellerMemberId - b.sellerMemberId,
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content={record?.sellerBrokerName}>
                <Link href={`/broker/${record.sellerMemberId}`}>
                  {record?.sellerMemberId}
                </Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "contractQuantity",
      key: "contractQuantity",
      responsive: ["md"],
      style: { fontSize: "76px" },
      sorter: (a, b) => a.contractQuantity - b.contractQuantity,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Amount (RS)",
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
      <div>
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
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
          </div>
        )}

        {sellData?.length > 0 && (
          <>
            <style>{styles}</style>
            <Table
              columns={columns}
              dataSource={sellData}
              size="small"
              className="table-responsive"
            />
          </>
        )}
      </div>
    </>
  );
};
export default SellBrokerAnalysis;
