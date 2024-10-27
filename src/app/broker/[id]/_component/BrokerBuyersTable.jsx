import Link from 'next/link';
import { Popover, Skeleton, Table } from 'antd';
import { formatMoney } from '../../../../utils/formatMoney';

const BrokerBuyersTable = ({ buyData, loading }) => {
  const columns = [
    {
      title: "S.No",
      dataIndex: "sno",
      key: "sno",
      // sorter: (a, b) => a.sno - b.sno,
      render: (text, record, index) => <div className="text-center">{text}</div>,
    },
    {
      title: "Broker",
      dataIndex: "buyerMemberId",
      key: "buyerMemberId",
      sorter: (a, b) => a.buyerMemberId - b.buyerMemberId,
      render: (text, record) => {
        return (
          <>
            <div className="text-center">
              <Popover content={record?.buyerBrokerName}>
                {/* <Link href={`/company/${record.buyerMemberId}`}>{record?.buyerMemberId}</Link> */}
                <Link href={`/broker/${record.buyerMemberId}`}>{record?.buyerMemberId}</Link>
              </Popover>
            </div>
          </>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "contractQuantity",
      key: "contractQuantity",
      sorter: (a, b) => a.contractQuantity - b.contractQuantity,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
    {
      title: "Amount (RS)",
      dataIndex: "contractAmount",
      key: "contractAmount",
      sorter: (a, b) => a.contractAmount - b.contractAmount,
      render: (text) => <div className="text-center">{formatMoney(text)}</div>,
    },
  ];

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
      <div>
        {loading && (
          <div className=" w-full  sm:mx-28  px-8 lg:px-0  lg:mx-auto  flex lg:flex-col flex-col gap-5  py-5  justify-between ">
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
            <div className="lg:w-[100%]">
              <Skeleton active />
            </div>
          </div>
        )}

        {
          buyData?.length > 0 && (
            <>
              <style>{styles}</style>
              <Table columns={columns} dataSource={buyData} width='100%'
                size="small"
                className="table-responsive"
                scroll={{ x: true }}
              />
            </>
          )
        }
      </div>
    </>
  )
}
export default BrokerBuyersTable;