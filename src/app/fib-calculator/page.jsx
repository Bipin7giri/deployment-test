"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, Row, Col, Divider } from "antd";
import { Table } from "antd";

const FibonacciCalculator = () => {
  const [highPrice, setHighPrice] = useState("");
  const [lowPrice, setLowPrice] = useState("");
  const [closePrice, setClosePrice] = useState("");
  const [uptrend, setUptrend] = useState({});
  const [downtrend, setDowntrend] = useState([]);

  const columns = [
    {
      title: "SN",
      dataIndex: "SN",
      key: "SN",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Uptrends",
      dataIndex: "uptrends",
      key: "uptrends",
    },
  ];

  const levels = [0.236, 0.382, 0.5, 0.618, 0.786];

  const downTrendLevel = [0.786, 0.618, 0.5, 0.382, 0.236];

  const data = levels.map((level, index) => ({
    SN: index.toString(),
    level: level,
    uptrends: uptrend[level],
  }));
  const downtrendData = downTrendLevel.map((level, index) => ({
    SN: index.toString(),
    level: level,
    uptrends: downtrend[level],
  }));

  function fibonacciRetracement() {
    const high = parseFloat(highPrice);
    const low = parseFloat(lowPrice);
    const ltp = parseFloat(closePrice);
    const range = high - low;

    const retracementLevels = {};
    levels.forEach((level) => {
      const retracement = low + range * level;
      retracementLevels[level] = retracement.toFixed(2);
    });

    // Find nearest Fibonacci retracement level to the latest trading price
    let nearestLevel = null;
    let minDiff = Infinity;
    for (const level of Object.values(retracementLevels)) {
      const diff = Math.abs(ltp - level);
      if (diff < minDiff) {
        minDiff = diff;
        nearestLevel = level;
      }
    }

    setUptrend(retracementLevels);
    setDowntrend(retracementLevels);
  }

  return (
    <div className="mt-48 lg:mt-0">
      <h3 className="text-center font-bold py-2">Fibonacci Calculater</h3>

      <div className="flex flex-col lg:flex-row items-center justify-center">
        <Row
          gutter={16}
          className="flex  flex-col lg:flex-row items-center justify-center mx-auto"
        >
          <Col>
            <Input
              placeholder="High Price"
              value={highPrice}
              onChange={(e) => setHighPrice(e.target.value)}
              className="w-52"
            />
          </Col>
          <Col>
            <Input
              placeholder="Low Price"
              value={lowPrice}
              onChange={(e) => setLowPrice(e.target.value)}
              className="w-52"
            />
          </Col>
          <Col>
            <Input
              placeholder="Close Price"
              value={closePrice}
              onChange={(e) => setClosePrice(e.target.value)}
              className="w-52"
            />
          </Col>
        </Row>
        <Button
          className="bg-blue-500 text-white mx-5"
          onClick={fibonacciRetracement}
        >
          Calculate
        </Button>
      </div>

      <Divider />

      <div className="flex items-center justify-center">
        <Row
          gutter={16}
          className="flex
         items-center justify-center gap-x-28 w-[100%] lg:w-[60%]
         p-5"
          style={{ backgroundImage: 'url("/assets/img/background.png")' }}
        >
          <Col>
            <h3 className="font-semibold text-white">Uptrend</h3>
            <Table columns={columns} dataSource={data} pagination={false} />
          </Col>
          <Col>
            <h3 className="font-semibold text-white">Downtrend</h3>
            <Table
              columns={columns}
              dataSource={downtrendData}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FibonacciCalculator;
