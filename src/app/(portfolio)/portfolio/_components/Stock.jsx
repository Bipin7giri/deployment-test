import { useEffect, useState } from "react";
import { Table, Divider, message, Popconfirm, Popover, Skeleton } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import StockSell from "./stockSell";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import StockStockAddForm from "./StockAddForm";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/utils/formatMoney";
const Stock = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [stockData, setStockData] = useState({});
  const [clickedRowData, setClickedRowData] = useState(null);
  const [shouldRedirectToPortfolioSetup, setShouldRedirectToPortfolioSetup] =
    useState(false);
  const [shouldRedirectToPrePortfolio, setShouldRedirectToPrePortfolio] =
    useState(false);

  const {
    shareHolderId,
    deletePortfoioData,
    isCSVUpload,
    portfolioSell,
    postPortfolio,
    loading,
    portfolioHolderByShid,
    shareHolderByUserId,
    selectedPortfolioHolder,
  } = useSelector((state) => state.portfolio);

  const styles = `
  .custom-header th {
    font-size: 46px;
    color: #fff;
    text-align: center; 
  }

  @media (min-width: 640px) {
    .table-responsive td, .table-responsive th {
      font-size: 26px;
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-item,
    .ant-pagination-item-link {
      font-size: 20px;
      margin-top: 10px; /* Fix the typo: margint-top to margin-top */
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
      margin-top: 10px; /* Fix the typo: margint-top to margin-top */
    }
  }
`;
  // for portfolio hoder by ShareHolderID
  // useEffect(() => {
  //   if (shareHolderId !== undefined && shareHolderId !== null) {
  //     dispatch(actions.getPortfolioByShid({ id: shareHolderId }));
  //   }
  // }, [shareHolderId]);
  // useEffect(() => {
  //   if ((shareHolderId !== undefined && shareHolderId !== null) || selectedPortfolioHolder !== null) {
  //     dispatch(actions.getPortfolioByShid({ id: selectedPortfolioHolder !== null ? selectedPortfolioHolder : shareHolderId }));
  //   }
  // }, [shareHolderId, selectedPortfolioHolder, isCSVUpload]);

  // useEffect(() => {
  //   if (
  //     deletePortfoioData?.statusCode === 200 ||
  //     portfolioSell?.statusCode ||
  //     postPortfolio?.statusCode ||
  //     selectedPortfolioHolder !== null
  //   ) {
  //     dispatch(actions.getPortfolioByShid({ id: selectedPortfolioHolder !== null ? selectedPortfolioHolder : shareHolderId }));
  //   }
  // }, []);

  useEffect(() => {
    if (
      (shareHolderId !== undefined && shareHolderId !== null) ||
      selectedPortfolioHolder !== null ||
      deletePortfoioData?.statusCode === 200 ||
      portfolioSell?.statusCode ||
      postPortfolio?.statusCode ||
      selectedPortfolioHolder !== null
    ) {
      dispatch(
        actions.getPortfolioByShid({
          id:
            selectedPortfolioHolder !== null
              ? selectedPortfolioHolder
              : shareHolderId,
        })
      );
    }
  }, [
    deletePortfoioData,
    portfolioSell,
    postPortfolio,
    selectedPortfolioHolder,
    isCSVUpload,
    shareHolderId,
  ]);

  useEffect(() => {
    if (
      portfolioHolderByShid.portfolioHolder !== undefined &&
      portfolioHolderByShid.portfolioHolder !== null
    ) {
      if (portfolioHolderByShid?.portfolioHolder?.stock_list?.length === 0) {
        router.push("/portfolio-setup");
      }
    }
    if (
      shareHolderByUserId?.ShareHolderByUserId !== undefined &&
      shareHolderByUserId?.ShareHolderByUserId !== null
    ) {
      if (shareHolderByUserId?.ShareHolderByUserId?.length === 0) {
        router.push("/pre-portfolio");
      }
    }
  }, [
    portfolioHolderByShid,
    shareHolderByUserId,
    deletePortfoioData,
    portfolioSell,
  ]);

  let data = [];
  if (portfolioHolderByShid.portfolioHolder !== undefined) {
    if (portfolioHolderByShid.portfolioHolder.stock_list !== undefined) {
      data = portfolioHolderByShid?.portfolioHolder?.stock_list?.map(
        (item, id) => {
          return {
            key: id + 1,
            id: item?.id,
            symbol: item?.symbol,
            todaysValue: item?.no_of_stocks * item?.ltp,
            no_of_stocks: item?.no_of_stocks,
            buy_amount: item?.buy_amount,
            ltp: item?.ltp,
            per_schange: item?.per_schange,
            schange: item?.schange,
            company_name: item?.company_name,
          };
        }
      );
    }
  }

  //popconfirm
  const handleConfirm = (e) => {
    const tempStockData = { ...stockData };
    const id = tempStockData.id;
    dispatch(actions.deletePortfolioByShid(id));
    message.success("Deleted successfully!");
  };
  const handleCancel = (e) => {
    message.error("Didn't deleted");
  };

  // to delete the records
  const handleView = (e, record) => {
    setStockData(record);
  };

  const handleStockFormClick = (record) => {
    setClickedRowData(record);
  };

  const columns = [
    Table.EXPAND_COLUMN,
    {
      title: (
        <p className="">
          {" "}
          <a>S/N</a>{" "}
        </p>
      ),
      width: 80,
      dataIndex: "key",
      key: "key",
      render: (text, record) => (
        <span className="flex justify-center">{text}</span>
      ),
    },
    {
      title: (
        <p className="flex justify-center">
          <a className="text-center">Stock</a>
        </p>
      ),
      width: 400,
      dataIndex: "symbol",
      key: "symbol",
      // render: (text) => <Link href={`http://localhost:3000/company/${text}`}>{text}</Link>,
      render: (text, record) => (
        <Popover content={record?.company_name}>
          <Link href={`/company/${text}`} className="flex justify-center">
            {record?.symbol}
          </Link>
        </Popover>
      ),
    },
    {
      title: "Units",
      dataIndex: "no_of_stocks",
      key: "no_of_stocks",
      width: 400,
      render: (text, record) => (
        <span className="flex justify-center">{formatMoney(text)}</span>
      ),
    },
    {
      title: "Investment",
      dataIndex: "buy_amount",
      key: "buy_amount",
      width: 400,
      render: (text, record) => (
        <span className="flex justify-center">{formatMoney(text)}</span>
      ),
    },
    {
      title: `Today's value`,
      dataIndex: "todaysValue",
      key: "todaysValue",
      width: 400,
      render: (text, record) => (
        <span className="flex justify-center">{formatMoney(text)}</span>
      ),
    },
    {
      title: "LTP",
      dataIndex: "ltp",
      key: "ltp",
      width: 200,
      render: (text, record) => (
        <span className="flex justify-center">{formatMoney(text)}</span>
      ),
    },
    {
      title: "Profit/Loss",
      dataIndex: "per_schange",
      key: "per_schange",
      width: 400,
      render: (text, record) => (
        <span
          className={`flex justify-center ${
            record?.per_schange >= 0 ? "text-success" : "text-danger"
          } `}
        >
          {formatMoney(record?.schange)} ({record?.per_schange} %)
        </span>
      ),
    },
    // {
    //     title: 'Change',
    //     dataIndex: 'schange',
    //     key: 'schange',
    //     width: 400,
    //     render: (text, record) => (
    //         <span className={`${record?.schange >= 0 ? 'text-[#1DCE92]' : 'text-[#FF433D]'} `}>{formatMoney(text)}</span>
    //     ),
    // },
    // {
    //     title: '1 Day Chart',
    //     dataIndex: 'one_day_chart',
    //     key: 'one_day_chart',
    //     render: (text, record) => (
    //         <span className='ant-table-actions flex'>
    //             {/* <OneDayChart /> */}
    //         </span>
    //     ),
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <span className="ant-table-actions flex">
          <div
            onClick={() => {
              const newData =
                portfolioHolderByShid?.portfolioHolder?.stock_list?.filter(
                  (item, index) => item.symbol === record.symbol
                );
              handleStockFormClick(newData[0]);
            }}
            className="cursor-pointer"
          >
            <StockStockAddForm title="Edit Your Stock" data={clickedRowData} />
          </div>
          <Divider type="vertical" />
          <StockSell record={record} />
          <Divider type="vertical" />
          <Popconfirm
            title="Delete the Stock"
            description="Are you sure to delete this stock?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            onClick={(e) => handleView(e, record)}
          >
            <a>
              <AiFillDelete />
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

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

      {data?.length > 0 ? (
        <>
          <div className="px-[60px] lg:px-0">
            <div className="stock-list-table my-10 bg-secondary    shadow-md rounded-lg p-5 ">
              <style>{styles}</style>
              <Table
                columns={columns}
                dataSource={data}
                // expandable={{
                //   expandedRowRender: (record) => (
                //     <div className='px-[40px] py-[12px]'>
                //       <div className='flex justify-evenly'>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Buy Date</p>
                //           <p className='text-[15px] font-[600]'>2020/3/12</p>
                //         </div>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Units</p>
                //           <p className='text-[15px] font-[600]'>12</p>
                //         </div>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Price</p>
                //           <p className='text-[15px] font-[600]'>120</p>
                //         </div>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>WACC</p>
                //           <p className='text-[15px] font-[600]'>120</p>
                //         </div>
                //       </div>
                //       <div className='flex justify-evenly mt-[12px]'>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Sell Date</p>
                //           <p className='text-[15px] font-[600]'>2020/3/12</p>
                //         </div>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Units</p>
                //           <p className='text-[15px] font-[600]'>12</p>
                //         </div>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Price</p>
                //           <p className='text-[15px] font-[600]'>120</p>
                //         </div>
                //         <div className='text-center'>
                //           <p className='font-[600] text-[13px] text-[#868484]'>Profit/Loss</p>
                //           <p className='text-[15px] font-[600]'>1020</p>
                //         </div>
                //       </div>
                //     </div>
                //   ),
                //   rowExpandable: (record) => record.name !== 'Not Expandable',
                // }}
                size="large"
                scroll={{ x: true }}
                className="table-responsive"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-md px-4 py-10 bg-white ">No Data Found</div>
      )}
    </>
  );
};
export default Stock;
