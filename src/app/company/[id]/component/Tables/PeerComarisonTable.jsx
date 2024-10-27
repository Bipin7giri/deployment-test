import { Table } from "antd";
import { useState } from "react";


const PeerComparisionTable = ({ initialColumns, data }) => {
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

    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table {
      line-height: 0.571429;
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
    :where(.css-dev-only-do-not-override-12jzuas).ant-table-wrapper .ant-table {
      line-height: 0.271429;
    }
  }  
`;

  let tabelData;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  if (initialColumns.length > 0) {
    <Table
      className="table-responsive"
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        onChange: handlePaginationChange,
      }}
      columns={[]}
      dataSource={[]}
      scroll={{ x: 200, y: 850 }}
    />;
    tabelData = (
      <Table
        className="table-responsive"
        pagination={false}
        scroll={{ x: 200, y: 850 }}
        columns={initialColumns}
        dataSource={data}
      />
    );
  }
  return (
    <>
      <style>{styles}</style>
      <div className="pb-[40px]">
        {tabelData}
      </div>
    </>
  );
};

export default PeerComparisionTable;
