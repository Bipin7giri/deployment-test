"use client";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../portfolio/_redux/action";
import { message } from "antd";

const PortfolioSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  // investor: Yup.string().required("Required"),
  // brokerInfo: Yup.string().required("Required"),
});

const FirstPage = (props) => {
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);

  // for broker Info
  useEffect(() => {
    dispatch(actions.getBrokerInfo());
  }, []);

  const { brokerInfo } = useSelector((state) => state.portfolio);

  const addShareHolder = (values, { resetForm }) => {
    // values.brokerInfo = brokerId;
    values.user_id = currentUser;
    dispatch(actions.addShareHolder(values));
    resetForm();
    setSelectedItems([]);
    message.success("Added successfully!");
    props?.fromWhere === "setup" ? props.nextFun() : props.closeModal();
    // props.nextFun();
    // props.closeModal();
  };

  return (
    <>
      <div
        className={`${
          props.title
            ? "ml-0 w-auto h-auto"
            : "flex justify-center mx-auto pt-[12vh]"
        } bg-[#F4F6F9] text-center rounded`}
      >
        <Formik
          initialValues={{
            name: "",
            investor: "",
            brokerInfo: null,
          }}
          validationSchema={PortfolioSchema}
          onSubmit={(values, { resetForm }) => {
            addShareHolder(values, { resetForm });
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
              <div
                className={`bg-[#fff] my-[20px] px-[60px] rounded-[20px]
                             ${props.title ? "" : "mx-[-70px]  shadow"}`}
              >
                {props.title ? (
                  ""
                ) : (
                  <h5 className="pt-[20px]">Enter The Name For Portfolio</h5>
                )}

                <Form onSubmit={handleSubmit} className="block mt-10 mb-10">
                  <div>
                    <Field
                      name="name"
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      required
                      className="holder-info-placeholder text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2 lg:w-[20vw] lg:h-[32px] w-[80%]"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red" }} className="text-danger">
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <select
                      name="investor"
                      value={values.investor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      className="holder-info-placeholder text-balck mt-4 py-1 px-2 border-[#D1D1D1] rounded-md border-2 lg:w-[20vw] lg:h-[32px] w-[80%]"
                    >
                      <option
                        value="value investor"
                        disabled="disabled"
                        label="Choose the investor"
                        className="text-center text-[15px] font-[500]"
                      ></option>
                      <option value="value investor" label="Value investor ">
                        Value investor{" "}
                      </option>
                      <option value="growth investor" label="Growth investor">
                        Growth investor
                      </option>
                      <option value="hybrid investor" label="Hybrid investor">
                        Hybrid investor
                      </option>
                    </select>
                    {errors.investor && touched.investor ? (
                      <div style={{ color: "red" }} className="text-danger">
                        {errors.investor}
                      </div>
                    ) : null}
                  </div>

                  <div className="first-page">
                    {/* <Select
                      name="brokerInfo"
                      mode="single"
                      showSearch={true}
                      placeholder="Choose the broker"
                      value={selectedItems}
                      onChange={setSelectedItems}
                      options={filteredOptions?.map((item) => ({
                        value: item,
                        label: item,
                      }))}
                      className="add-stock-field text-balck mt-4 py-1 px-2 lg:w-[21vw] lg:h-[32px] w-[85%]"
                    /> */}
                  </div>

                  <div>
                    {/* <button type="submit" className="bg-black text-secondary  px-12 py-2 rounded mt-5" onClick={() => props.nextFun()}>{props.title ? props.title : 'Lets Keep Track of Portfolio'}</button> */}
                    <button
                      type="submit"
                      className="bg-black text-secondary  px-6 py-2 rounded mt-5 lg:w-[20vw]  w-[85%]"
                    >
                      {props.title
                        ? props.title
                        : "Let's Keep Track of Portfolio"}
                    </button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};
export default FirstPage;
