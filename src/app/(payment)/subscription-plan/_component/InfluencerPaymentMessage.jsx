"use client";
import React from "react";
import { Card } from "antd";

const InfluencerPaymentMessage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card
        title=""
        bordered={false}
        style={{
          width: 600,
          height: 300, // Adjust the width to your preference
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="#000000"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-14h-2v6h2zm0 8h-2v2h2z" />
          </svg>
          <p className="text-2xl font-bold mb-4 mt-20">
            As an influencer, you can&apos;t make payment
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InfluencerPaymentMessage;
