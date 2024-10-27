import React from "react";
import Broker from "./Broker";
import { getBrokerDetailsReq } from "./_redux/api";

export const generateMetadata = async ({ params: { id } }) => {
  const brokerDetails = await getBrokerDetailsReq({ brokerNo: id });
  let brokerNumber = brokerDetails.data.data[0].memberCode;
  let brokerName = brokerDetails.data.data[0].memberName;
  return {
    title: "Saral Lagani | Simplify Your Investment",
    description: `Get all the detail of Broker ${brokerNumber} , ${brokerName}. get Daily transaction detail, buy,sell from the broker daily`,
    keywords: [
      "broker",
      "broker detail",
      "broker details",
      "daily transcation",
      "buy and sell",
    ],
    openGraph: {
      images: ["https://peridotnepal.xyz/company_logo/sarallagani.webp"],
    },
  };
};

const BrokerIndex = ({ params: { id } }) => {
  return (
    <>
      <Broker id={id} />
    </>
  );
};
export default BrokerIndex;
