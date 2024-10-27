"use client";
import { useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { Space, DatePicker, Modal, message, Skeleton } from "antd";
import * as Yup from "yup";
// import Confetti from 'react-confetti';
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import SellProfit from "./sellProfit";
import SellLoss from "./sellLoss";
import actions from "../_redux/action";

const StockSell = (props) => {
  const sellSchema = Yup.object().shape({
    // symbol: Yup.string().required("Required"),
    no_of_stocks: Yup.number()
      .required("Required")
      .max(
        props?.record?.no_of_stocks,
        `Cannot be greater than ${props?.record?.no_of_stocks}`
      ),
    selling_price: Yup.string().required("Required"),
    capital_gain_tax: Yup.string().required("Required"),
    transaction_date: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();

  const { portfolioSell, setIsSellLoading, shareHolderId } = useSelector(
    (state) => state.portfolio
  );
  const { currentUser } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellStatus, setSellStatus] = useState(false);
  const [stockData, setStockData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect(() => {
  //     setStockData(props.record);
  // }, [props.record]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSellClick = (e, record) => {
    setStockData((prevStockData) => ({ ...prevStockData, ...record }));
    showModal();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalFooter = (
    <div className="sell-button">
      {/* <Button key="submit" type="primary" onClick={handleOk} >
                <SellProfit />
            </Button> */}
      {/* {sellStatus === 'profit' ? <SellProfit /> : <SellLoss />} */}
      {/* <Confetti width={800} height={600} numberOfPieces={200} recycle={false} gravity={0.5} /> */}
    </div>
  );

  const sellStock = (values, { resetForm }) => {
    //for date
    const dateString = values.transaction_date.$d;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    values.buy_date = formattedDate;
    values.ltp = stockData?.ltp;
    values.no_of_stocks = values.no_of_stocks * -1;
    values.share_holder_id = shareHolderId;
    values.currentUser = currentUser;
    values.buy_amount = parseInt(values.selling_price, 10); //to convert: string -> int
    values.capital_gain_tax = parseInt(values.capital_gain_tax, 10);
    dispatch(actions.postPortfolioSell(values));
    setSellStatus(portfolioSell?.data?.profit);
    setIsModalVisible(true);
    message.success("Sell successfully!");
    resetForm();
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div>
        <span className="ant-table-actions flex">
          {/* <a onClick={(record) => showModal(record)}  onDoubleClick={(e) => handleView(e, record)}> <AiOutlineMinus /> </a> */}
          <a onClick={(e) => handleSellClick(e, props.record)}>
            {" "}
            <AiOutlineMinus />{" "}
          </a>
        </span>
        <Modal
          title="Fill The Sell Info Form"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width="820px"
          footer={modalFooter}
        >
          <Formik
            initialValues={{
              symbol: stockData?.symbol,
              no_of_stocks: stockData?.no_of_stocks,
              selling_price: "",
              capital_gain_tax: "",
              transaction_date: "",
            }}
            validationSchema={sellSchema}
            onSubmit={(values, { resetForm }) => {
              sellStock(values, { resetForm });
            }}
          >
            {({
              errors,
              touched,
              values,
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="pt-[35px] pb-[30px] px-[55px]"
              >
                <div className="flex flex-col">
                  <label className="text-[18px] font-medium">Company</label>
                  <input
                    name="symbol"
                    type="text"
                    disabled
                    placeholder="Company name"
                    value={values.symbol}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="text-balck mt-2 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[100%] lg:h-[5vh]"
                  />
                  {errors.symbol && touched.symbol ? (
                    <div className="text-danger" style={{ color: "red" }}>
                      {errors.symbol}
                    </div>
                  ) : null}
                </div>

                <div className="flex w-[100%] mt-[15px]">
                  <div className="flex flex-col w-[33%]">
                    <label className="text-[18px] font-medium text-[#4F4F4F]">
                      Quantity
                    </label>
                    <input
                      name="no_of_stocks"
                      type="text"
                      placeholder="Quantity"
                      value={values.no_of_stocks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="text-balck mt-2 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[90%] lg:h-[5vh]"
                    />
                    {errors.no_of_stocks && touched.no_of_stocks ? (
                      <div className="text-danger" style={{ color: "red" }}>
                        {errors.no_of_stocks}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col w-[33%]">
                    <label className="text-[18px] font-medium text-[#4F4F4F]">
                      Selling Price
                    </label>
                    <input
                      name="selling_price"
                      type="text"
                      placeholder="Selling Price"
                      value={values.selling_price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="text-balck mt-2 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[90%] lg:h-[5vh]"
                    />
                    {errors.selling_price && touched.selling_price ? (
                      <div className="text-danger" style={{ color: "red" }}>
                        {errors.selling_price}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col w-[33%]">
                    <label className="text-[18px] font-medium text-[#4F4F4F]">
                      Capital Gain Tax
                    </label>
                    <select
                      name="capital_gain_tax"
                      value={values.capital_gain_tax}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="text-balck mt-2 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[100%] lg:h-[5vh]"
                    >
                      {/* <option value="" disabled="disabled" label="Choose the capital gain tax"></option> */}
                      <option
                        value=""
                        disabled="disabled"
                        label="Choose the capital gain tax"
                      >
                        Choose the capital gain tax
                      </option>
                      <option value="7.5" label="7.5 %">
                        7.5 %
                      </option>
                      <option value="5" label="5 %">
                        5 %
                      </option>
                    </select>
                    {errors.capital_gain_tax && touched.capital_gain_tax ? (
                      <div className="text-danger" style={{ color: "red" }}>
                        {errors.capital_gain_tax}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col mt-[15px]">
                  <label className="text-[18px] font-medium text-[#4F4F4F]">
                    Transaction Date
                  </label>
                  <Space direction="vertical">
                    <DatePicker
                      onChange={(date) =>
                        setFieldValue("transaction_date", date)
                      }
                      value={values.transaction_date}
                      onBlur={handleBlur}
                      name="transaction_date"
                      placeholder="Enter the transaction date"
                      className="text-balck mt-2 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[100%] lg:h-[5vh]"
                      disabledDate={(current) =>
                        current && current > moment().endOf("day")
                      }
                    />
                    {errors.transaction_date && touched.transaction_date ? (
                      <div className="text-danger" style={{ color: "red" }}>
                        {errors.transaction_date}
                      </div>
                    ) : null}
                  </Space>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-secondary  px-12 py-2 rounded mt-5 text-center "
                  >
                    {" "}
                    Sell{" "}
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>

        {setIsSellLoading && <Skeleton paragraph={{ rows: 14 }} />}
        {sellStatus === true ? (
          <SellProfit
            visible={isModalVisible}
            onClose={handleModalClose}
            data={portfolioSell?.data}
          />
        ) : (
          <SellLoss
            visible={isModalVisible}
            onClose={handleModalClose}
            data={portfolioSell?.data}
          />
        )}
      </div>
    </>
  );
};
export default StockSell;
