"use client";
import { Button, message, Steps, theme } from "antd";
import { useState } from "react";
import FirstPage from "./firstPage";
import SecondPage from "./secondPage";

const PortfolioSetUpStep = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Introduction",
      content: <FirstPage nextFun={next} fromWhere="setup" />,
    },
    {
      title: "Portfolio Setup",
      content: <SecondPage prevFun={prev} />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <div className="portfolio-first-page bg-[#F4F6F9]  py-10 container max-w-screen-lg mx-auto">
        <Steps
          current={current}
          items={items}
          className="lg:px-0 lg:top-0 lg:static sm:pt-[40px] px-[120px] top-[190px] relative "
        />
        <div>{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => next()}
              className="text-secondary  bg-black"
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default PortfolioSetUpStep;
