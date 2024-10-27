"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ShowDetails from "./showDetails";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import { useRef } from "react";
import { Popover } from "antd";

const SecondarySchema = Yup.object().shape({
  // transactionType: Yup.string().required("Required"),
  units: Yup.string().required("Required"),
  buyAmount: Yup.string().required("Required"),
  // sellAmount: Yup.string().required("Required"),
});

const Calculator = () => {
  const dispatch = useDispatch();
  const pageRef = useRef(null);

  const scrollToPage = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: pageRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const [showComponent, setShowComponent] = useState(false);
  const [transType, setTransType] = useState("");

  const { calculateBuy, calculateSell } = useSelector((state) => state.tools);
  let calculateData = {};
  if (calculateBuy?.data !== undefined || calculateSell?.data !== undefined) {
    calculateData = calculateBuy?.data
      ? calculateBuy?.data
      : calculateSell?.data;
  }

  const calculatePrice = (values, { resetForm }) => {
    if (transType === "buy") {
      dispatch(actions.getBuyCalculate(values));
    } else {
      dispatch(actions.getSellCalculate(values));
    }
    scrollToPage();
    setShowComponent(true);
    resetForm();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <div
        className={`bg-[#F4F6F9] text-center rounded mt-[120px] lg:mt-0 lg:container px-10 lg:w-full flex justify-center mx-auto`}
      >
        <div>
          <Formik
            initialValues={{
              transactionType: "",
              units: "",
              buyAmount: "",
              sellAmount: "",
              picked: 7.5,
            }}
            validationSchema={SecondarySchema}
            onSubmit={(values, { resetForm }) => {
              calculatePrice(values, { resetForm });
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <>
                <div className="bg-[#fff] rounded-[20px] shadow lg:my-[20px] px-[60px] py-4 lg:py-[10px]">
                  <h5 className="pt-10 text-[44px] lg:text-[20px] font-[600]">
                    Calculate The Price
                  </h5>
                  <Form onSubmit={handleSubmit} className="block mt-7 mb-10">
                    <div>
                      <select
                        name="transactionType"
                        f
                        value={transType}
                        onChange={(e) => {
                          setTransType(e.target.value);
                        }}
                        onBlur={handleBlur}
                        type="text"
                        required
                        className="holder-info-placeholder text-[34px] lg:text-[14px] text-primary mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[100%]"
                      >
                        <option
                          value=""
                          disabled="disabled"
                          label="Choose the transactionType (Buy/Sell)"
                          className="text-centertext-[34px] lg:text-[14px] font-[500]"
                        ></option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                      </select>
                      {errors.transactionType && touched.transactionType ? (
                        <div style={{ color: "red" }} className="text-danger">
                          {errors.transactionType}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Field
                        name="units"
                        placeholder="Enter units"
                        value={values.units}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        required
                        className="holder-info-placeholder text-[34px] lg:text-[14px] text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[100%]"
                      />
                      {errors.units && touched.units ? (
                        <div className="text-danger text-[24px] lg:text-sm">
                          {errors.units}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Field
                        name="buyAmount"
                        placeholder="Enter buy amount"
                        value={values.buyAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        required
                        className="holder-info-placeholder text-[34px] lg:text-[14px] text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2 w-[100%]"
                      />
                      {errors.buyAmount && touched.buyAmount ? (
                        <div style={{ color: "red" }} className="text-danger">
                          {errors.buyAmount}
                        </div>
                      ) : null}
                    </div>

                    {transType === "sell" && (
                      <>
                        <div>
                          <Field
                            name="sellAmount"
                            placeholder="Enter sell amount"
                            value={values.sellAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            required
                            className="holder-info-placeholder text-balck mt-4 py-1 px-2 border-[#D1D1D1] text-[34px] lg:text-[14px] rounded-md border-2 
                            lg:w-[24vw] w-[100%]"
                          />
                          {errors.sellAmount && touched.sellAmount ? (
                            <div
                              style={{ color: "red" }}
                              className="text-danger"
                            >
                              {errors.sellAmount}
                            </div>
                          ) : null}
                        </div>

                        <div
                          role="group"
                          aria-labelledby="my-radio-group"
                          className="mt-5 flex justify-between"
                        >
                          <label>
                            <Popover content="Holding less than a year is subjected to 7.5% in capital gain">
                              <Field
                                type="radio"
                                name="picked"
                                value="7.5"
                                checked
                              />
                              7.5% Capital Gain
                            </Popover>
                          </label>
                          <label>
                            <Popover content="Holding more than a year is subjected to 5% in capital gain">
                              <Field type="radio" name="picked" value="5" />
                              5% Capital Gain
                            </Popover>
                          </label>
                        </div>
                      </>
                    )}

                    <div ref={pageRef}>
                      <button
                        type="submit"
                        className="bg-black text-[34px] lg:text-[14px] text-secondary  px-12 py-2 rounded mt-5"
                      >
                        Calculate
                      </button>
                    </div>
                  </Form>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
      <div className="bg-[#F4F6F9] text-center rounded-lg flex justify-center ">
        {showComponent && (
          <ShowDetails data={calculateData} transactionTyp={transType} />
        )}
      </div>
    </>
  );
};
export default Calculator;
