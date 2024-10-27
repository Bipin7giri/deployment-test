"use client";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Input,
  Menu,
  Popover,
  Select,
  Skeleton,
  Space,
  Table,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import marketActions from "../_redux/actions";
import { Link } from "next/link";
import { formatMoney } from "../../../utils/formatMoney";
const { Search } = Input;

const BrokerAnalysisBySymbol = () => {
  const dispatch = useDispatch();
  const [selectedName, setSelectedName] = useState("Buy");
  const [data, setTableData] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    "Agricultural Development Bank Limited (ADBL)"
  );
  const [symbol, setSymbol] = useState("ADBL");

  const { marketLiveHomeData } = useSelector((state) => state.home);
  const names = ["Buy", "Sell"];

  const handleMenuClick = (e) => {
    setSelectedName(e.key);
  };

  useEffect(() => {
    if (selectedItems) {
      const symbl = String(selectedItems)?.split("(")[1]?.split(")")[0];
      setSymbol(symbl);

      if (selectedName === "Buy") {
        dispatch(
          marketActions.getStockBuyingBrokerBySymbol({ symbol: symbol })
        );
      } else {
        dispatch(
          marketActions.getStockSellingBrokerBySymbol({ symbol: symbol })
        );
      }
    }
  }, [selectedItems, selectedName, symbol]);

  const {
    allBrokerDataBySymbol,
    loading,
    stockBuyingBrokerBySymbol,
    stockSellingBrokerBySymbol,
  } = useSelector((state) => state.market);

  const setData = () => {
    if (selectedName === "Buy") {
      if (stockBuyingBrokerBySymbol?.data !== undefined) {
        const tableData = stockBuyingBrokerBySymbol?.data?.map((item, id) => {
          return {
            key: id + 1,
            sno: id + 1,
            brokerId: item.brokerId,
            brokerName: item.brokerName,
            contractAmount: item.contractAmount,
            contractQuantity: item?.contractQuantity,
          };
        });
        setTableData(tableData);
      }
    } else {
      if (stockSellingBrokerBySymbol?.data !== undefined) {
        const tableData = stockSellingBrokerBySymbol?.data?.map((item, id) => {
          return {
            key: id + 1,
            sno: id + 1,
            brokerName: item.brokerName,
            brokerId: item.brokerId,
            contractAmount: item.contractAmount,
            contractQuantity: item?.contractQuantity,
          };
        });
        setTableData(tableData);
      }
    }
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    selectedName,
    selectedItems,
    stockBuyingBrokerBySymbol,
    stockSellingBrokerBySymbol,
  ]);

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
                <Link to="">{text}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Buy Units",
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

  let options = [];
  if (marketLiveHomeData?.liveData !== undefined) {
    options = marketLiveHomeData?.liveData?.map((item, id) => {
      return (
        // { label: item.companyName + " " + `(${item.symbol})`, value: item.symbol }
        item.companyName + " " + `(${item.symbol})`
      );
    });
  }
  const filteredOptions = options.filter((o) => !selectedItems.includes(o));

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
      <div className="top flex pt-[10px] justify-end">
        <div className="company-search mr-[10px]">
          <Select
            mode="single"
            showSearch={true}
            placeholder="Choose the stock from here"
            value={selectedItems}
            onChange={setSelectedItems}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
            className=""
          />
        </div>
        <div className="mt-[4px]">
          <Dropdown
            overlay={
              <Menu onClick={handleMenuClick}>
                {names.map((item) => (
                  <Menu.Item key={item}>
                    <span> {item} </span>
                  </Menu.Item>
                ))}
              </Menu>
            }
            className="border-2 border-balck-500 py-1 px-2 rounded-md "
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {names.length > 0
                  ? selectedName
                    ? selectedName
                    : names[0]
                  : ""}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>

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
              columns={columns}
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

export default BrokerAnalysisBySymbol;
