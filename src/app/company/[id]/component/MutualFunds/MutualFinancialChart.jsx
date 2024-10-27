import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { MdOutlineShowChart } from "react-icons/md";
import { Modal } from "antd";

const MutualFinancialChart = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let newObject = { ...data };
  delete newObject["Particulars"];
  delete newObject["key"];
  delete newObject["description"];
  let column = Object.keys(newObject);
  let rowData = Object.values(newObject);
  const option = {
    xAxis: {
      type: "category",
      data: column,
    },
    yAxis: {
      type: "value",
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}",
    },
    series: [
      {
        data: rowData?.map((number) => number.replace(/,/g, "")),
        type: "line",
        itemStyle: {
          color: "black",
        },
      },
    ],
  };

  useEffect(() => {
    // Set isChartVisible to true when the modal is opened
    if (isModalOpen) {
      setIsChartVisible(true);
    }
  }, [isModalOpen]);

  return (
    <>
      <span className=" ml-7 ant-table-actions flex w-[30px]">
        <button
          className="bg-green-600 font-bold p-1 text-secondary"
          onClick={showModal}
        >
          <MdOutlineShowChart />
        </button>
      </span>
      <Modal
        title={data?.Particulars}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="70%"
        footer={false}
      >
        {isChartVisible && column.length > 0 && rowData.length > 0 ? (
          <div style={{ width: "100%" }} className="lg:h-[400px] h-[50vh]">
            <ReactEcharts
              option={option}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default MutualFinancialChart;
