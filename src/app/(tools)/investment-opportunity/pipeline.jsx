"use client";
import { Table, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Pipeline = ({ data, columns }) => {
  let tabelData;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { loading } = useSelector((state) => state.tools);

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (columns.length > 0) {
    <Table
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        onChange: handlePaginationChange,
      }}
      columns={[]}
      dataSource={[]}
      scroll={{ x: true }}
    />;
    tabelData = (
      <>
        <Table
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            onChange: handlePaginationChange,
          }}
          columns={columns}
          dataSource={data}
          className="my-table"
          scroll={{ x: true }}
        />
      </>
    );
  }
  useEffect(() => {}, [columns, data]);
  return (
    <>
      {/* <div className="min-h-[60vh]">
                <div className="inv-pipeline">
                    {tabelData}
                </div>
            </div> */}

      <div className="min-h-[60vh]">
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

        {data?.length > 0 ? (
          <>
            <div className="inv-pipeline">{tabelData}</div>
          </>
        ) : (
          <>
            <div className="mt-[20px]">
              <h4 className="font-[500]"> No Data Found </h4>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Pipeline;
