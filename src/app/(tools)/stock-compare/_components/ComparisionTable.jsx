import { Skeleton, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const ComparisionTable = ({ columns, dataSource }) => {
  const { loading } = useSelector((state) => state.companyCompare);
  const styles = `
    @media (min-width: 640px) {
      .table-responsive td, .table-responsive th {
        font-size: 26px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 20px;
        margint-top:10px /* Adjust the font size as per your requirement */
      }
    }
  
    @media (min-width: 1024px) {
      .table-responsive td, .table-responsive th {
        font-size: 14px;
      }
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-item,
      .ant-pagination-item-link {
        font-size: 14px;
        margint-top:10px /* Adjust the font size as per your requirement */
      }
    }
    
  `;

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
      {dataSource?.length > 0 && (
        <>
          <div className="my-10 bg-secondary    shadow-md rounded-lg p-5 ">
            <style>{styles}</style>
            <Table
              columns={columns}
              dataSource={dataSource}
              size="small"
              className="table-responsive"
              pagination={false}
              scroll={{ x: true, y: 550 }}
            />
          </div>
        </>
      )}
    </>
  );
};
export default ComparisionTable;
