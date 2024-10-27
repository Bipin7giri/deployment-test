"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import {
  Table,
  Input,
  Button,
  DatePicker,
  Select,
  Modal,
  ConfigProvider,
} from "antd";
import moment from "moment";
import { Skeleton } from "antd";
const { Option } = Select;
import dayjs from "dayjs";

const Floorsheet = ({ symbol }) => {
  const { floorsheetData, isFloorsheetloading } = useSelector(
    (state) => state.company
  );
  const dispatch = useDispatch();
  const [filterInputBuyer, setFilterInputBuyer] = useState("");
  const [filterInputSeller, setFilterInputSeller] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minimumVal, setMinimumVal] = useState("");
  const [maximumVal, setMaximumVal] = useState("");
  const [comparison, setComparison] = useState("");
  const [greaterThan, setGreaterThan] = useState("");
  const [below, setBelow] = useState("");

  const columns = [
    {
      title: "SN",
      dataIndex: "SN",
      key: "SN",
      align: "center",
      sorter: (a, b) => a.SN - b.SN,
    },
    {
      title: "Buy Broker",
      dataIndex: "buyBroker",
      key: "buyBroker",
      align: "center",
      sorter: (a, b) => a.buyBroker - b.buyBroker,
    },
    {
      title: "Sell Broker",
      dataIndex: "sellBroker",
      key: "sellBroker",
      align: "center",
      sorter: (a, b) => a.sellBroker - b.sellBroker,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      align: "center",
      sorter: (a, b) => a.rate - b.rate,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  const handleFilterBuyerChange = (e) => {
    setFilterInputBuyer(e.target.value);
  };

  const handleFilterSellerChange = (e) => {
    setFilterInputSeller(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFilter = () => {
    let filteredData = floorsheetData;
    if (selectedDate) {
      const dateObject = dayjs(selectedDate.$d);
      const formattedDate = dateObject.format("YYYY/MM/DD");
      filteredData = filteredData.filter((item) =>
        dayjs(item.date).isSame(formattedDate)
      );
    }
    if (filterInputBuyer) {
      filteredData = filteredData.filter((item) =>
        item.buyBroker.toLowerCase().includes(filterInputBuyer.toLowerCase())
      );
    }
    if (filterInputSeller) {
      filteredData = filteredData.filter((item) =>
        item.sellBroker.toLowerCase().includes(filterInputSeller.toLowerCase())
      );
    }
    setData(filteredData);
  };

  const handleReset = () => {
    dispatch(actions.floorsheetData(symbol));
    setFilterInputBuyer("");
    setFilterInputSeller("");
    setSelectedDate(null);
  };

  const handleComparisonChange = (value) => {
    setComparison(value);
  };

  const handleAdvanceFilter = () => {
    setIsModalVisible(true);
  };

  const handleApplyAdvancedFilter = () => {
    // Apply advanced filter
    dispatch(
      actions.filteredFloorsheetData({
        symbol,
        minimumVal,
        maximumVal,
        comparison,
        greaterThan,
        below,
      })
    );
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (floorsheetData?.length > 0) {
      setSelectedDate(dayjs(floorsheetData[0]?.date) || null);
    }
  }, [floorsheetData]);

  useEffect(() => {
    dispatch(actions.floorsheetData(symbol));
  }, []);

  useEffect(() => {
    setData(floorsheetData);
  }, [floorsheetData]);

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Input
            placeholder="Buy Broker"
            value={filterInputBuyer}
            onChange={handleFilterBuyerChange}
            style={{ width: 200, marginRight: 8 }}
          />
          <Input
            placeholder="Sell Broker"
            value={filterInputSeller}
            onChange={handleFilterSellerChange}
            style={{ width: 200, marginRight: 8 }}
          />
          <DatePicker
            placeholder="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{ marginRight: 8 }}
          />
          <Button onClick={handleFilter} style={{ marginRight: 8 }}>
            Filter
          </Button>
          <Button
            onClick={handleReset}
            style={{ marginRight: 8, color: "red" }}
          >
            Reset
          </Button>
        </div>
        <div>
          <Button
            onClick={handleAdvanceFilter}
            style={{ backgroundColor: "black", color: "white" }}
          >
            Advance Filter
          </Button>
        </div>
      </div>
      {isFloorsheetloading ? (
        <>
          <div>
            <div className="w-full">
              <Skeleton />
            </div>
            <div className="w-full">
              <Skeleton />
            </div>
            <div className="w-full">
              <Skeleton />
            </div>
          </div>
        </>
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
        />
      )}
      {/* Advanced Filter Modal */}
      <Modal
        title="Advance Filter"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={handleApplyAdvancedFilter}
            className=" bg-blue-500"
          >
            Apply
          </Button>,
        ]}
      >
        <Select
          placeholder="Choose your filter"
          style={{ width: "100%" }}
          onChange={handleComparisonChange}
        >
          <Option value="greater">Greater Than</Option>
          <Option value="below">Below</Option>
          <Option value="between">In Between</Option>
        </Select>
        {comparison === "between" && (
          <div className="flex items-start justify-center gap-2">
            <Input
              placeholder="Enter minimum value"
              value={minimumVal}
              onChange={(e) => setMinimumVal(e.target.value)}
            />
            <span> - </span>
            <Input
              placeholder="Enter maximum value"
              value={maximumVal}
              onChange={(e) => setMaximumVal(e.target.value)}
            />
          </div>
        )}
        {comparison === "greater" && (
          <Input
            placeholder="Enter greater than value"
            value={greaterThan}
            onChange={(e) => setGreaterThan(e.target.value)}
          />
        )}
        {comparison === "below" && (
          <Input
            placeholder="Enter below value"
            value={below}
            onChange={(e) => setBelow(e.target.value)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Floorsheet;
