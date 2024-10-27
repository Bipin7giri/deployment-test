import React from "react";

import { Collapse } from "antd";

const Faq = () => {
  const items = [
    {
      key: "1",
      label: "1. What is Saral Lagani?",
      children: (
        <p>
          Saral Lagani is a user-friendly stock research tool that gives
          subscribers all the important information they need to make smart
          decisions quickly and easily.
        </p>
      ),
    },
    {
      key: "2",
      label: "2. How does Saral Lagani work?",
      children: (
        <p>
          Saral Lagani aggregates relevant stock information, presenting it in a
          simplified format. Users can easily access key data and insights to
          assist in their investment decision-making process.
        </p>
      ),
    },
    {
      key: "3",
      label: "3. What information does Saral Lagani provide?",
      children: (
        <p>
          Saral Lagani offers a comprehensive range of stock-related data,
          including financial indicators, historical performance, and relevant
          news. It aims to cover all the necessary information for making
          educated investment choices.
        </p>
      ),
    },
    {
      key: "4",
      label: "4. How can I subscribe to Saral Lagani?",
      children: (
        <p>
          To subscribe, choose a subscription plan that suits your needs, and
          once registered, you&apos;ll have instant access to the platform.
        </p>
      ),
    },
    {
      key: "5",
      label:
        "5. Is Saral Lagani suitable for beginners in stock market investing?",
      children: (
        <p>
          Absolutely! Saral Lagani is designed to be user-friendly and
          accessible to investors of all levels. Whether you&apos;re a beginner or an
          experienced investor, the platform provides information in a way that
          is easy to understand.
        </p>
      ),
    },
    {
      key: "6",
      label: "6. Does Saral Lagani provide real-time data?",
      children: (
        <p>
          Saral Lagani strives to provide the latest information available.
          While it may not be real-time, the platform is updated regularly to
          ensure that users have access to current and relevant data.
        </p>
      ),
    },
    {
      key: "7",
      label: "7. How can I get customer support for Saral Lagani?",
      children: (
        <p>
          For customer support, reach out to the Saral Lagani team through the
          provided contact channels on the website. Whether through email or a
          dedicated support portal, assistance is available to address any
          queries or concerns you may have.
        </p>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <div id="faq_section">
        <div className="lg:container  lg:px-10 lg:mx-auto px-4 mx-auto ">
          <div className="faq-content">
            <div className="faq-top" style={{ marginBottom: "30px" }}>
              <h3>Frequently Asked Question</h3>
              <p>
                Here, we&apos;ve compiled answers to common queries about our
                products/services to provide you with quick and comprehensive
                information. Whether you&apos;re seeking details about our offerings,
                navigating our platform, or troubleshooting issues, you&apos;ll
                likely find the answers you need right here.
              </p>
            </div>

            <Collapse
              items={items}
              defaultActiveKey={["1"]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
