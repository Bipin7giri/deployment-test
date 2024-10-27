"use client";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import ShowDetails from "./showDetails";
import { useRef } from "react";

const SecondarySchema = Yup.object().shape({
  // transactionType: Yup.string().required("Required"),
  marketPrice: Yup.string().required("Required"),
  adjustedPercentage: Yup.string().required("Required"),
});

const PriceAdjustmentCalculator = () => {
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
  const [adjustedData, setAdjustedData] = useState();

  const calculatePrice = (values, { resetForm }) => {
    values.adjustedPercentage = values.adjustedPercentage / 100;
    if (transType === "bonus") {
      let price = values.marketPrice / (1 + values.adjustedPercentage);
      values.price = price;
      values.bonusPrice = values.adjustedPercentage;
      setAdjustedData(values);
    } else {
      let pricePaid = 100;
      let price =
        (parseInt(values.marketPrice) + pricePaid * values.adjustedPercentage) /
        (1 + values.adjustedPercentage);
      values.price = price;
      setAdjustedData(values);
    }
    scrollToPage();
    setShowComponent(true);
    resetForm();
  };

  return (
    <>
      <div
        className={`bg-[#F4F6F9] text-center rounded lg:pt-[5px] mt-[50px] lg:container px-10 lg:w-full flex justify-center mx-auto`}
      >
        <div>
          <Formik
            initialValues={{
              transactionType: "",
              marketPrice: "",
              adjustedPercentage: "",
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
                <div className="bg-[#fff] rounded-[20px] shadow my-[20px] px-[60px] py-[20px]">
                  <h5 className="pt-10 text-[38px] lg:text-[20px] font-[600]">
                    Price Adjustment Calculator
                  </h5>

                  <Form onSubmit={handleSubmit} className="block mt-7 mb-10">
                    <div>
                      <select
                        name="transactionType"
                        value={transType}
                        onChange={(e) => {
                          setTransType(e.target.value);
                        }}
                        onBlur={handleBlur}
                        type="text"
                        required
                        className="holder-info-placeholder text-[34px] lg:text-[14px] text-primary   mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2    w-[100%]"
                      >
                        <option
                          value=""
                          disabled="disabled"
                          label="Choose the price Adjustment (Right/Bonus)"
                          className="text-center text-[34px] lg:text-[14px] font-[500]"
                        ></option>
                        <option value="right">Right</option>
                        <option value="bonus">Bonus</option>
                      </select>
                      {errors.transactionType && touched.transactionType ? (
                        <div style={{ color: "red" }} className="text-danger">
                          {errors.transactionType}
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Field
                        name="marketPrice"
                        placeholder="Enter Market Price"
                        value={values.marketPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        required
                        className="holder-info-placeholder text-[34px] lg:text-[14px] text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2   w-[100%]"
                      />
                      {errors.marketPrice && touched.marketPrice ? (
                        <div style={{ color: "red" }} className="text-danger">
                          {errors.marketPrice}
                        </div>
                      ) : null}
                    </div>

                    {transType === "right" && (
                      <div>
                        <Field
                          name="adjustedPercentage"
                          placeholder="Enter Right Percentage"
                          value={values.adjustedPercentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          required
                          className="holder-info-placeholder text-[34px] lg:text-[14px] text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2   w-[100%]"
                        />
                        {errors.adjustedPercentage &&
                        touched.adjustedPercentage ? (
                          <div style={{ color: "red" }} className="text-danger">
                            {errors.adjustedPercentage}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {transType === "bonus" && (
                      <div>
                        <Field
                          name="adjustedPercentage"
                          placeholder="Enter Bonus Percentage"
                          value={values.adjustedPercentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="text"
                          required
                          className="holder-info-placeholder text-[34px] lg:text-[14px] text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2   w-[100%]"
                        />
                        {errors.adjustedPercentage &&
                        touched.adjustedPercentage ? (
                          <div style={{ color: "red" }} className="text-danger">
                            {errors.adjustedPercentage}
                          </div>
                        ) : null}
                      </div>
                    )}
                    <div ref={pageRef}>
                      <button
                        type="submit"
                        className="bg-black text-[34px] lg:text-[14px] text-secondary  px-12 py-2 rounded mt-5 "
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
        {showComponent && <ShowDetails data={adjustedData} isAdjusted={true} />}
      </div>
    </>
  );
};
export default PriceAdjustmentCalculator;
