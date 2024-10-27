"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Table, Tabs, Typography, Layout } from "antd";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Content } = Layout;

const patterns = [
  { name: "Doji", type: "indecision", field: "is_doji" },
  { name: "Dragonfly Doji", type: "bullish", field: "is_dragonfly_doji" },
  { name: "Gravestone Doji", type: "bearish", field: "is_gravestone_doji" },
  { name: "Bullish Marubozu", type: "bullish", field: "is_bullish_marubozu" },
  { name: "Bearish Marubozu", type: "bearish", field: "is_bearish_marubozu" },
  {
    name: "Bullish Spinning Top",
    type: "indecision",
    field: "is_bullish_spinning_top",
  },
  {
    name: "Bearish Spinning Top",
    type: "indecision",
    field: "is_bearish_spinning_top",
  },
  {
    name: "Bullish Inverted Hammer",
    type: "bullish",
    field: "is_bullish_inverted_hammer",
  },
  {
    name: "Bearish Inverted Hammer",
    type: "bearish",
    field: "is_bearish_inverted_hammer",
  },
  {
    name: "Hammer Pattern (Unconfirmed)",
    type: "bullish",
    field: "is_hammer_pattern_unconfirmed",
  },
  {
    name: "Hanging Man (Unconfirmed)",
    type: "bearish",
    field: "is_hanging_man_unconfirmed",
  },
  { name: "Bearish Engulfing", type: "bearish", field: "is_bearish_engulfing" },
  { name: "Bullish Engulfing", type: "bullish", field: "is_bullish_engulfing" },
  { name: "Dark Cloud Cover", type: "bearish", field: "is_dark_cloud_cover" },
  { name: "Hammer Pattern", type: "bullish", field: "is_hammer_pattern" },
  { name: "Hanging Man", type: "bearish", field: "is_hanging_man" },
  { name: "Bullish Harami", type: "bullish", field: "is_bullish_harami" },
  { name: "Bearish Harami", type: "bearish", field: "is_bearish_harami" },
  { name: "Piercing Line", type: "bullish", field: "is_piercing_line" },
  {
    name: "Bullish Harami Cross",
    type: "bullish",
    field: "is_bullish_harami_cross",
  },
  {
    name: "Bearish Harami Cross",
    type: "bearish",
    field: "is_bearish_harami_cross",
  },
  { name: "Tweezer Top", type: "bearish", field: "is_tweezer_top" },
  { name: "Tweezer Bottom", type: "bullish", field: "is_tweezer_bottom" },
  { name: "Morning Doji Star", type: "bullish", field: "is_morning_doji_star" },
  {
    name: "Downside Tasuki Gap",
    type: "bearish",
    field: "is_downside_tasuki_gap",
  },
  { name: "Evening Doji Star", type: "bearish", field: "is_evening_doji_star" },
  { name: "Morning Star", type: "bullish", field: "is_morning_star" },
  { name: "Evening Star", type: "bearish", field: "is_evening_star" },
  { name: "Three Black Crows", type: "bearish", field: "is_three_black_crows" },
  {
    name: "Three White Soldiers",
    type: "bullish",
    field: "is_three_white_soldiers",
  },
  { name: "Abandoned Baby", type: "indecision", field: "is_abandoned_baby" },
  { name: "Shooting Star", type: "bearish", field: "is_shooting_star" },
  { name: "Bullish Hammer", type: "bullish", field: "is_bullish_hammer" },
  { name: "Bearish Hammer", type: "bearish", field: "is_bearish_hammer" },
  {
    name: "Shooting Star (Unconfirmed)",
    type: "bearish",
    field: "is_shooting_star_unconfirmed",
  },
];

const CandleStickPatterns = () => {
  const [selectedPattern, setSelectedPattern] = useState(patterns[0].field);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/candlestick/total?field=${selectedPattern}`,
      {
        headers: {
          Permission: "2021D@T@f@RSt6&%2-D@T@",
        },
      }
    );
    setStocks(res.data.data);
    setLoading(false);
  }

  useEffect(() => {
    if (selectedPattern) {
      setLoading(true);
      fetchData();
    }
  }, [selectedPattern]);

  const columns = [
    {
      title: "S.N",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Company Name",
      dataIndex: "securityName",
      key: "securityName",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: "Sector",
      dataIndex: "sectorName",
      key: "sectorName",
    },
    {
      title: "LTP",
      dataIndex: "lastTradedPrice",
      key: "lastTradedPrice",
    },
  ];

  const renderPatterns = (patternType) => (
    <Row gutter={[16, 16]}>
      {patterns
        .filter(
          (pattern) => pattern.type === patternType || patternType === "all"
        )
        .map((pattern) => (
          <Col key={pattern.field} xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => setSelectedPattern(pattern.field)}
              style={{
                textAlign: "center",
                cursor: "pointer",
                height: "100%",
                border:
                  selectedPattern === pattern.field ? "2px solid #1890ff" : "",
              }}
              bodyStyle={{
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <span>{pattern.name}</span>
            </Card>
          </Col>
        ))}
    </Row>
  );

  return (
    <Layout style={{ padding: "20px", background: "#fff" }}>
      <Content>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
          Pattern Types
        </Title>
        <Row gutter={32}>
          <Col span={12}>
            <Tabs
              defaultActiveKey="all"
              type="card"
              style={{
                height: "100%",
                "& .ant-tabs-nav": { marginBottom: "16px" },
                "& .ant-tabs-nav-list": { width: "100%" },
                "& .ant-tabs-tab": { width: "25%", justifyContent: "center" },
              }}
            >
              <TabPane tab={<span>All</span>} key="all">
                {renderPatterns("all")}
              </TabPane>
              <TabPane
                tab={<span style={{ color: "#4CAF50" }}>Bullish</span>}
                key="bullish"
              >
                {renderPatterns("bullish")}
              </TabPane>
              <TabPane
                tab={<span style={{ color: "#F44336" }}>Bearish</span>}
                key="bearish"
              >
                {renderPatterns("bearish")}
              </TabPane>
              <TabPane
                tab={<span style={{ color: "#FFA500" }}>Indecision</span>}
                key="indecision"
              >
                {renderPatterns("indecision")}
              </TabPane>
            </Tabs>
          </Col>
          <Col span={12}>
            <Title level={3} style={{ marginBottom: "20px" }}>
              Stocks Following Such Patterns
            </Title>
            <Table
              columns={columns}
              dataSource={stocks}
              loading={loading}
              rowKey="symbol"
              pagination={{ pageSize: 10 }}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default CandleStickPatterns;
