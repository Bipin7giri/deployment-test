"use client";
import { Table, message, Popconfirm } from "antd";
import StockAddForm from "./StockAddForm";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import DropdownAddHolder from "./dropdownAddHolder";
import CSVPopUp from "./CSVPopUp";
import { useRouter } from "next/navigation";

const SecondPageComponent = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [stockData, setStockData] = useState({});
  const {
    deletePortfoioData,
    postPortfolio,
    shareHolderId,
    portfolioHolderByShid,
    isCSVUpload,
    selectedPortfolioHolder,
  } = useSelector((state) => state.portfolio);

  // for portfolio hoder by ShareHolderID
  useEffect(() => {
    if (
      (shareHolderId !== undefined && shareHolderId !== null) ||
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
    isCSVUpload,
    deletePortfoioData,
    postPortfolio,
    shareHolderId,
    selectedPortfolioHolder,
  ]);

  // useEffect(() => {
  //     if (selectedPortfolioHolder !== undefined && selectedPortfolioHolder !== null) {
  //         dispatch(actions.getPortfolioByShid({ id: selectedPortfolioHolder !== null && selectedPortfolioHolder }));
  //     }
  // }, [selectedPortfolioHolder]);

  // useEffect(() => {
  //   if (deletePortfoioData?.statusCode === 200 || postPortfolio?.statusCode) {
  //     dispatch(actions.getPortfolioByShid({ id: shareHolderId }));
  //   }
  // }, [deletePortfoioData, postPortfolio]);

  let data = [];
  if (portfolioHolderByShid.portfolioHolder !== undefined) {
    if (portfolioHolderByShid.portfolioHolder.stock_list !== undefined) {
      data = portfolioHolderByShid?.portfolioHolder?.stock_list?.map(
        (item, id) => {
          return item;
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

  const saveInfo = (props) => {
    router.push("/portfolio");
  };
  // to delete the records
  const handleView = (e, record) => {
    setStockData(record);
  };

  const columns = [
    {
      title: <p className="">Stock</p>,
      dataIndex: "symbol",
      id: "symbol",
      render: (text) => <a className="flex justify-center">{text}</a>,
    },
    {
      title: "Unit",
      dataIndex: "no_of_stocks",
      id: "no_of_stocks",
      render: (text) => <span className="flex justify-center">{text}</span>,
    },
    {
      title: "Total Value",
      dataIndex: "buy_amount",
      id: "buy_amount",
      render: (text) => <span className="flex justify-center">{text}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      id: "action",
      render: (text, record) => (
        <span className="ant-table-actions flex">
          <Popconfirm
            title="Delete the Stock"
            description="Are you sure to delete this stock?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            className="flex justify-center ms-[40%]"
            onClick={(e) => handleView(e, record)}
          >
            <a>
              {" "}
              <AiFillDelete />{" "}
            </a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="lg:px-[40px] py-[20px]">
        <div className="px-[120px] pt-[120px] lg:px-0 lg:pt-[40px]">
          <DropdownAddHolder />
        </div>

        <div className="flex justify-center">
          <div className="box text-center lg:mt-[5vh] mt-[4vh] rounded-lg w-[40vw]">
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: 3,
                showSizeChanger: false,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
            />
          </div>
        </div>

        {data.length > 0 ? (
          ""
        ) : (
          <div className="btn-portfolio flex justify-center  mt-10 ">
            <button
              type="submit"
              className="bg-black text-secondary  px-12 py-2 rounded font-[600]"
              style={{ width: "350px" }}
            >
              <StockAddForm
                add="Add New Stock To Your Portfolio"
                holderID={shareHolderId}
              />
            </button>
          </div>
        )}

        {data.length > 0 ? (
          <div className="btn-portfolio flex justify-center  mt-2">
            <button
              type="submit"
              className="bg-black text-secondary  px-12 py-2 rounded"
              onClick={() => {
                saveInfo();
              }}
              style={{ width: "350px" }}
            >
              Lets Keep Track of Portfolio
            </button>
          </div>
        ) : (
          ""
        )}
        <div className="btn-portfolio flex justify-center  mt-2">
          <button
            className="bg-black text-secondary  px-12 py-2 rounded"
            style={{ width: "350px" }}
          >
            {/* <CSVReader /> */}
            <CSVPopUp />
          </button>
        </div>

        <div className="btn-portfolio flex justify-center  mt-2 ">
          <button
            type="submit"
            className="bg-black text-secondary  px-12 py-2 rounded"
            onClick={() => {
              props.prevFun();
            }}
            style={{ width: "350px" }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};
export default SecondPageComponent;
