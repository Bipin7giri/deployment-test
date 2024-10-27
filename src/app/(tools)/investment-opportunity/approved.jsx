"use client";
import { Skeleton, Table } from "antd";
import { useSelector } from "react-redux";

const Approved = ({ data, columns }) => {
  const { loading } = useSelector((state) => state.tools);

  const onChange = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
  };

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
            <div className="inv-approved">
              <style>{styles}</style>
              <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                size="small"
                className="table-responsive"
              />
            </div>
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
export default Approved;
