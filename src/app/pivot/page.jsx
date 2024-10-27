"use client";
import React, { useState } from "react";
import { Button, Form, Input, Table } from "antd";

const Pivot = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState("horizontal");
  const [formValues, setFormValues] = useState({
    highPrice: 0,
    lowPrice: 0,
    openPrice: 0,
    closePrice: 0,
  });
  const [calculatedData, setCalculatedData] = useState([]);

  const columns = [
    {
      title: "LEVELS",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "FLOOR",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "WOODIE",
      dataIndex: "woodie",
      key: "woodie",
    },
    {
      title: "CAMARILLA",
      dataIndex: "camarilla",
      key: "camarilla",
    },
    {
      title: "DEMARK",
      dataIndex: "demark",
      key: "demark",
    },
  ];

  const handleFormValuesChange = (e) => {
    setFormValues((prev) => {
      return { ...prev, [e.target.name]: Number(e.target.value) };
    });
  };

  const calculateValues = () => {
    const { highPrice, lowPrice, openPrice, closePrice } = formValues;

    const calculateFloor = (level) => {
      const range = highPrice - lowPrice;
      const floor = lowPrice + range * (level * 0.25);
      return floor.toFixed(2);
    };

    const calculateWoodie = (level) => {
      const range = highPrice - lowPrice;
      const woodie = highPrice - range * (level * 0.25);
      return woodie.toFixed(2);
    };

    const calculateCamarilla = (level) => {
      const range = highPrice - lowPrice;
      const camarilla =
        closePrice -
        range * (level * 0.0625) +
        (closePrice - openPrice) * (level * 0.0625);
      return camarilla.toFixed(2);
    };

    const calculateDemark = (level) => {
      const range = highPrice - lowPrice;
      const demark = highPrice - range * (level * 0.5);
      return demark.toFixed(2);
    };

    const data = [
      {
        key: "R4",
        level: "R4",
        camarilla: calculateCamarilla(4),
      },
      {
        key: "R3",
        level: "R3",
        floor: calculateFloor(3),
        camarilla: calculateCamarilla(3),
      },
      {
        key: "R2",
        level: "R2",
        floor: calculateFloor(2),
        woodie: calculateWoodie(2),
        camarilla: calculateCamarilla(2),
      },
      {
        key: "R1",
        level: "R1",
        floor: calculateFloor(1),
        woodie: calculateWoodie(1),
        camarilla: calculateCamarilla(1),
        demark: calculateDemark(1),
      },
      {
        key: "PP",
        level: "PP →",
        floor: calculateFloor(0),
        woodie: calculateWoodie(0),
      },
      {
        key: "S1",
        level: "S1",
        floor: calculateFloor(-1),
        woodie: calculateWoodie(-1),
        camarilla: calculateCamarilla(-1),
        demark: calculateDemark(-1),
      },
      {
        key: "S2",
        level: "S2",
        floor: calculateFloor(-2),
        woodie: calculateWoodie(-2),
        camarilla: calculateCamarilla(-2),
      },
      {
        key: "S3",
        level: "S3",
        floor: calculateFloor(-3),
        camarilla: calculateCamarilla(-3),
      },
      {
        key: "S4",
        level: "S4",
        camarilla: calculateCamarilla(-4),
      },
    ];

    setCalculatedData(data);
  };

  const buttonItemLayout = null;

  return (
    <>
      <h3 className="text-center font-bold py-5">Pivot</h3>
      <div className="flex justify-center items-start h-screen w-full">
      <div className="flex justify-center w-5/6">
        <div className="p-4 rounded-lg shadow-md bg-gray-100 mr-4 w-1/2">
          <Form
            layout={"vertical"}
            form={form}
            initialValues={{
              layout: "vertical",
            }}
            title="Pivot Calculator"
            style={{ maxWidth: formLayout === "inline" ? "none" : 600 }}
          >
            <Form.Item label="High Price">
              <Input
                placeholder="Enter high price..."
                name="highPrice"
                onChange={handleFormValuesChange}
              />
            </Form.Item>
            <Form.Item label="Low Price">
              <Input
                placeholder="Enter low price..."
                name="lowPrice"
                onChange={handleFormValuesChange}
              />
            </Form.Item>
            <Form.Item label="Open Price">
              <Input
                placeholder="Enter open price..."
                name="openPrice"
                onChange={handleFormValuesChange}
              />
            </Form.Item>
            <Form.Item label="Close Price">
              <Input
                placeholder="Enter close price..."
                name="closePrice"
                onChange={handleFormValuesChange}
              />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Button
                type="primary"
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={calculateValues}
              >
                Calculate
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-gray-100 w-1/2">
          <Table
            columns={columns}
            dataSource={calculatedData}
            pagination={false}
          />
        </div>
      </div>
    </div>
    </>

  );
};

export default Pivot;
