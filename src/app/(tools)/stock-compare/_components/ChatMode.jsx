import React from "react";
import BarChart from "./BarChart";
import { Skeleton, Tag } from "antd";
import { useSelector } from "react-redux";

const ChatMode = ({ data }) => {
  const { loading, comapanyRecentQuater } = useSelector(
    (state) => state.companyCompare
  );

  return (
    <>
      <div className="flex justify-end mt-[10px] mr-[10px]">
        <Tag color="cyan">as of {comapanyRecentQuater?.data}</Tag>
      </div>
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

      {data?.length > 0 && (
        <>
          <div className="w-full h-full flex flex-wrap">
            {data
              ?.filter((item) => {
                // Check if any field has a value of "0", "0%", or null
                for (const key in item) {
                  const value = item[key];
                  if (
                    value === "0" ||
                    value === "0 %" ||
                    value === "0%" ||
                    value === 0 ||
                    value === null
                  ) {
                    return false; // Exclude the item from rendering
                  }
                }
                return true; // Include the item for rendering
              })
              ?.map((item) => (
                <div className="lg:w-1/2 w-full p-4" key={item?.key}>
                  <BarChart data={item} />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};
export default ChatMode;
