import React from "react";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import LineChart from "./LineChart";

const LineChartMode = ({ data }) => {
  const { loading } = useSelector((state) => state.companyCompare);

  return (
    <>
      {loading && (
        <div className="my-10">
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      )}

      {Object?.entries(data)?.length > 0 && (
        <>
          <div className="w-full h-full flex flex-wrap">
            {Object?.entries(data)
              ?.filter(([key, item]) => {
                // Check if any field has a value of "0", "0%", or null
                for (const year in item) {
                  const yearData = item[year];
                  for (const bank in yearData) {
                    let value = yearData[bank];
                    // if (value === "0" || value === "0 %" || value === "0%" || value === 0 || value === null) {
                    if (value === null) {
                      return false; // Exclude the item from rendering
                    }
                    if (value.endsWith("%")) {
                      value = value?.slice(0, -1); // Remove the "%" symbol
                      yearData[bank] = value; // Update the value in the data object
                    }
                  }
                }
                return true; // Include the item for rendering
              })
              ?.map(([key, item]) => (
                <div className="lg:w-1/2 w-full p-4" key={key}>
                  <LineChart data={item} title={key} />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};
export default LineChartMode;
