import { Popover, Skeleton, Table } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { formatMoney } from '../../../../../utils/formatMoney';

const DebenturesPeerComparision = () => {
    const { loading, deventuresPeerComparisionData, } = useSelector((state) => state.company);

    let data = []
    if (deventuresPeerComparisionData !== undefined && deventuresPeerComparisionData !== null && deventuresPeerComparisionData?.data?.length > 0) {
        data = deventuresPeerComparisionData?.data?.map((item, id) => {
            return {
                sno: id + 1,
                symbol: item?.symbol,
                coupounRate: item?.interestRate,
                maturityYear: item?.maturityYear,
                fundSize: item?.fundSize && (item?.fundSize)?.replace(/,/g, ""),
            }
        })
    }

    const columns = [
        {
            title: "S.No",
            dataIndex: "sno",
            key: "sno",
            fixed: "right",
            responsive: ["md"],
            style: { fontSize: "76px" },
            width: 100,
            sorter: (a, b) => a.sno - b.sno,
            render: (text) => <div className="text-center">{text}</div>,
        },
        {
            title: "Symbol",
            dataIndex: "symbol",
            key: "symbol",
            responsive: ["md"],
            style: { fontSize: "76px" },
            fixed: "left",
            width: 300,
            sorter: (a, b) => a.symbol.localeCompare(b.symbol),
            render: (text, record) => {
                return (
                    <>
                        <div className="text-center">
                            <Popover content={record?.name}>
                                <Link href={`/company/${record.symbol}`}>{record?.symbol}</Link>
                            </Popover>
                        </div>
                    </>
                );
            },
        },
        {
            title: "Coupon Rate %",
            dataIndex: "coupounRate",
            key: "coupounRate",
            responsive: ["md"],
            style: { fontSize: "76px" },
            fixed: "left",
            width: 300,
            sorter: (a, b) => a.sno - b.sno,
            render: (text) => <div className="text-center">{text}%</div>,
        },
        {
            title: "Fund Size",
            dataIndex: "fundSize",
            key: "fundSize",
            responsive: ["md"],
            style: { fontSize: "76px" },
            fixed: "left",
            width: 300,
            sorter: (a, b) => a.sno - b.sno,
            render: (text) => <div className="text-center">{text ? formatMoney(text) : "-"}</div>,
        },
        {
            title: "Maturity Year",
            dataIndex: "maturityYear",
            key: "maturityYear",
            responsive: ["md"],
            style: { fontSize: "76px" },
            fixed: "left",
            width: 300,
            sorter: (a, b) => a.sno - b.sno,
            render: (text) => <div className="text-center">{text ? text : "-"}</div>,
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
            <div className='pb-[40px]'>
                {
                    loading ? (
                        <div className=" pb-10 w-full sm:mx-28 px-8 lg:px-0 lg:mx-auto flex lg:flex-col flex-col gap-5 py-5 justify-between ">
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
                            <div className="lg:w-[100%]">
                                <Skeleton active />
                            </div>
                        </div>
                    ) : (
                        <>
                            <style>{styles}</style>
                            <Table
                                size="small"
                                className="table-responsive"
                                pagination={false}
                                columns={columns}
                                dataSource={data}
                                scroll={{ x: true, y: 700 }}
                            />
                        </>
                    )
                }
            </div>
        </>
    )
}

export default DebenturesPeerComparision