"use client";

// todo:calculatorActions  -->calculateBuy

import { Select, Button, Modal, DatePicker, Space, Input, message } from "antd";
import { useState } from "react";
import { Formik, Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import actions from "../_redux/action";
// import calculatorActions from "../../Tools/redux/action";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockAddInformation from "./StockAddInformation";
import moment from "moment";
import { AiFillEdit } from "react-icons/ai";
import { CloudFilled } from "@ant-design/icons";

const PortfolioSchema = Yup.object().shape({
  // symbol: Yup.string().required("Required"),
  // share_type: Yup.string().required("Required"),
  // no_of_stocks: Yup.string().required("Required"),
  // buy_amount: Yup.string().required("Required"),
  // buy_date: Yup.string().required("Required"),
});

// for date picker
// const onChange = (date, dateString) => {
//   console.log(date, dateString);
// };

const StockStockAddForm = (props) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);
  const [purchaseType, setPurchaseType] = useState([]);
  const [isStockAdded, setIsStockAdded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    postPortfolio,
    isCSVUpload,
    activeStockCompany,
    shareType,
    selectedPortfolioHolder,
  } = useSelector((state) => state.portfolio);
  const { currentUser } = useSelector((state) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsStockAdded(false);
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    setIsModalOpen(false);
    setPurchaseType([]);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setPurchaseType([]);
  };

  const modalFooter = (
    <div className="add-stock-footer-button">
      <Button key="cancel" onClick={handleCancel} className="cancel none">
        Cancel
      </Button>
      <Button
        key="submit"
        type="primary"
        onClick={handleOk}
        className="ok none"
      >
        OK
      </Button>
    </div>
  );

  // for todays date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;

  const addStock = (values, { resetForm }) => {
    const dateString = values?.buy_date && values.buy_date.$d;
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    if (props.title === "Edit Your Stock") {
      const editId = props?.data?.id;
      const updatedValues = {
        symbol: selectedItems?.split("(")[1]?.split(")")[0],
        // company: selectedItems?.split(" (")[0],
        share_type: parseFloat(purchaseType, 10),
        buy_date: purchaseType === 3 ? currentDate : formattedDate,
        no_of_stocks: parseFloat(values.no_of_stocks, 10),
        buy_amount:
          purchaseType === 3
            ? parseFloat(values.buy_amount, 10) * values.no_of_stocks
            : parseFloat(values.buy_amount, 10),
      };

      dispatch(
        actions.postEditPortfolio({ id: editId, updatedValues: updatedValues })
      );
    } else {
      values.symbol = selectedItems?.split("(")[1]?.split(")")[0];
      values.company = selectedItems?.split(" (")[0];
      values.user_id = currentUser;
      values.share_type = parseFloat(purchaseType, 10);
      values.buy_date = purchaseType === 3 ? currentDate : formattedDate;
      values.no_of_stocks = parseFloat(values.no_of_stocks, 10); //to convert: string -> int
      values.share_holder_id = selectedPortfolioHolder
        ? selectedPortfolioHolder
        : props.holderID;
      let buyAmount = parseFloat(values.buy_amount, 10);
      values.buy_amount =
        purchaseType === 3
          ? parseFloat(values.buy_amount, 10) * values.no_of_stocks
          : parseFloat(values.buy_amount, 10);
      dispatch(actions.postPortfolio(values));

      let units = values.no_of_stocks;
      // dispatch(
      //   calculatorActions.getBuyCalculate({
      //     buyAmount: buyAmount,
      //     units: units,
      //   })
      // );
      // if (postPortfolio?.statusCode !== undefined) {
      // postPortfolio?.statusCode === 200 ? message.success('Added successfully!') : message.error('Error!')
      // }
      setSelectedItems([]);
      // setPurchaseType([]);
      message.success("Added successfully!");
    }

    resetForm();
    setIsModalOpen(false);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (postPortfolio !== undefined) {
      postPortfolio?.data?.length > 0
        ? setIsStockAdded(true)
        : setIsStockAdded(false);
    }
  }, [postPortfolio]);

  const { calculateBuy } = useSelector((state) => state.tools);

  let calculateData = {};
  if (calculateBuy?.data !== undefined) {
    calculateData = calculateBuy?.data;
  }

  // for active company listed in StockMarket
  useEffect(() => {
    if (
      Array?.isArray(activeStockCompany) &&
      activeStockCompany?.length === 0
    ) {
      dispatch(actions.getActiveCompanyName());
    }
    if (Array.isArray(shareType) && shareType?.length === 0) {
      dispatch(actions.getShareType());
    }
  }, []);

  let options = [];
  if (activeStockCompany?.activeStock !== undefined) {
    // props.title==="Edit Your Stock" ? (
    //   options =
    // ) :  ''
    options = activeStockCompany?.activeStock?.map((item, id) => {
      return (
        // { label: item.companyName + " " + `(${item.symbol})`, value: item.symbol }
        item.companyName + " " + `(${item.symbol})`
      );
    });
  }
  const filteredOptions = options.filter((o) => !selectedItems.includes(o));

  let options1 = []; // Initialize options1 as an empty array

  if (Array.isArray(shareType?.data)) {
    options1 = shareType?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  }

  useEffect(() => {
    if (props.title === "Edit Your Stock") {
      setSelectedItems(
        props?.data?.company_name + " " + `(${props?.data?.symbol})`
      );
      setPurchaseType(props?.data?.share_type);
    }
  }, [props]);

  return (
    <>
      {props.title === "Edit Your Stock" ? (
        <p onClick={showModal} className="text-secondary">
          <AiFillEdit />
        </p>
      ) : (
        <Button
          type="gray-13"
          onClick={showModal}
          className="show-btn text-secondary font-[500]"
        >
          {props.add}
        </Button>
      )}

      <Modal
        title={
          props.title === "Edit Your Stock"
            ? `Editing ${props?.data?.symbol}`
            : props.title
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={modalFooter}
        className="text-bold"
        okButtonProps={{ style: { backgroundColor: "black" } }}
      >
        <div className="w-100 text-center px-5">
          <Formik
            initialValues={{
              symbol: "",
              share_type: "",
              no_of_stocks:
                props.title === "Edit Your Stock"
                  ? props?.data?.no_of_stocks
                  : "",
              buy_amount: props?.data?.amount_per_stock,
              buy_date: props?.data?.buy_date,
            }}
            validationSchema={PortfolioSchema}
            onSubmit={(values, { resetForm }) => {
              addStock(values, { resetForm });
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
              <Form onSubmit={handleSubmit} className="block mt-10 relative">
                <div className="add-info">
                  <label className="block  mt-2 font-semibold text-left mb-[-13px]">
                    Stock
                  </label>
                  <Select
                    name="symbol"
                    mode="single"
                    showSearch={true}
                    placeholder="Choose the stock you have bought"
                    value={selectedItems}
                    onChange={setSelectedItems}
                    options={filteredOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    className="add-stock-field text-balck mt-4 py-1   lg:h-[32px] w-full border-[#D1D1D1]"
                  />
                  {errors.symbol && touched.symbol ? (
                    <div className="text-danger" style={{ color: "red" }}>
                      {errors.symbol}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="block text-start mb-[-13px] font-semibold">
                    Share Type
                  </label>

                  <Select
                    name="share_type"
                    mode="single"
                    showSearch={true}
                    placeholder="Choose the type of purchase"
                    value={purchaseType}
                    onChange={setPurchaseType}
                    options={options1}
                    className="add-stock-field text-balck mt-4 py-1  w-full lg:h-[32px]  border-[#D1D1D1]"
                  />
                  {errors.share_type && touched.share_type ? (
                    <div className="text-danger" style={{ color: "red" }}>
                      {errors.share_type}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="block   mt-2 font-semibold text-left mb-[-13px]">
                    Number of Stocks
                  </label>
                  <Input
                    name="no_of_stocks"
                    placeholder="Enter the unit you purchase"
                    value={values.no_of_stocks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    required
                    className="add-stock-field text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-1  lg:h-[32px] w-full"
                  />
                  {errors.no_of_stocks && touched.no_of_stocks ? (
                    <div style={{ color: "red" }} className="text-danger">
                      {errors.no_of_stocks}
                    </div>
                  ) : null}
                </div>

                {purchaseType === 1 ||
                purchaseType === 2 ||
                purchaseType === 4 ||
                purchaseType === 5 ? (
                  <>
                    <div>
                      <label className="block   mt-2 font-semibold text-left mb-[-13px]">
                        Amount per Stock
                      </label>
                      <Input
                        name="buy_amount"
                        placeholder="Enter the purchase price"
                        value={values.buy_amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        required
                        className="add-stock-field text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-1  lg:h-[32px] w-full"
                      />
                      {errors.buy_amount && touched.buy_amount ? (
                        <div style={{ color: "red" }} className="text-danger">
                          {errors.buy_amount}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Space
                        direction="vertical"
                        className=" lg:h-[32px] w-[100%]"
                      >
                        <label className="block   mt-2 font-semibold text-left mb-[-13px]">
                          Buy Date
                        </label>
                        {props.title === "Edit Your Stock" &&
                        values?.buy_date ? (
                          <DatePicker
                            onChange={(date) => setFieldValue("buy_date", date)}
                            name="buy_date"
                            defaultValue={moment(values.buy_date)}
                            placeholder="Enter the stock purchase date"
                            onBlur={handleBlur}
                            disabledDate={(current) =>
                              current && current > moment().endOf("day")
                            }
                            className="add-stock-field text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-1  lg:h-[32px] w-full"
                          />
                        ) : (
                          <DatePicker
                            onChange={(date) => setFieldValue("buy_date", date)}
                            name="buy_date"
                            placeholder="Enter the stock purchase date"
                            onBlur={handleBlur}
                            disabledDate={(current) =>
                              current && current > moment().endOf("day")
                            }
                            className="add-stock-field text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-1  lg:h-[32px] w-full"
                          />
                        )}
                      </Space>
                      {errors.buy_date && touched.buy_date ? (
                        <div style={{ color: "red" }} className="text-danger">
                          {errors.buy_date}
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : (
                  ""
                )}

                <button
                  type="submit"
                  className="bg-black text-secondary   px-12 py-2 rounded mt-5 lg:mt-14 w-full"
                >
                  {props.title === "Edit Your Stock"
                    ? props.title
                    : "Add Stock"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      {purchaseType === 2 && isStockAdded === true && (
        <StockAddInformation
          visible={isModalVisible}
          onClose={handleModalClose}
          data={calculateData}
          transactionTyp="buy"
        />
      )}
    </>
  );
};
export default StockStockAddForm;
