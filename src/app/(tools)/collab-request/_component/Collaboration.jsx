"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import { AiOutlineLink, AiOutlinePhone } from "react-icons/ai";
import { BsClockHistory } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../_redux/action";
import { Tag } from "antd";

export default function Collaboration() {
  const dispatch = useDispatch();
  const { currentUser, name } = useSelector((state) => state.auth);
  const { promoCodeRequest } = useSelector((state) => state.tools);

  function validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = "Required";
      return error;
    } else if (!/^\d{10}$/i.test(value)) {
      error =
        "Invalid phone number. Please enter a 10-digit number without spaces or dashes.";
      return error;
    } else {
      // Phone number is valid
    }
  }

  const handleCollabRequestForm = (values, { resetForm }) => {
    dispatch(
      actions.postPromoCodeRequest({
        user_id: currentUser,
        name: name,
        social_links: values.socialLink,
        background: values.background,
        contact_no: values.phone_number,
      })
    );
    console.log(promoCodeRequest);
    resetForm();
  };

  return (
    <>
      <div className="mt-28 lg:mt-auto lg:w-full pt-16 pb-32">
        <div className="lg:container relative px-20 lg:px-10 mx-auto lg:pt-[20px] pt-[60px] break-down">
          <div className="flex justify-center">
            <Formik
              initialValues={{
                socialLink: "",
                background: "",
                phone_number: "",
              }}
              onSubmit={async (values, { resetForm }) => {
                handleCollabRequestForm(values, { resetForm });
              }}
            >
              {({ errors, touched, isValidating }) => (
                <Form className="flex justify-center lg:w-[80%] w-[90%]">
                  <div className="rounded-[20px] border-[1px] py-10 px-10 bg-secondary lg:w-[80%] w-[100%]">
                    {promoCodeRequest.data ? (
                      <div className="flex justify-center">
                        <Tag
                          color="green"
                          className="xl:w-[70%] 2xl-w:[50%] lg:w-[90%] w-[80%] py-2 px-2 capitalize text-[14px] mb-6"
                        >
                          {promoCodeRequest?.data?.message?.toString()}
                        </Tag>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="flex items-baseline w-[100%] mb-5">
                      <label
                        id="socialLink"
                        className="w-[25%] text-lg lg:text-sm font-poppins mx-[2px] font-[600]"
                      >
                        Social Link
                      </label>
                      <div className="w-[70%] flex mb-10 lg:mt-0 mt-3 duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg  lg:mb-1">
                        <AiOutlineLink className="lg:text-xl text-3xl text-gray-400" />
                        <Field
                          className="pl-2 outline-none  w-full text-sm lg:text-sm font-poppins bg-transparent"
                          type="text"
                          for="socialLink"
                          name="socialLink"
                          placeholder="Social Link i.e. TikTok, YouTube etc."
                        />
                      </div>
                      {errors.socialLink && touched.socialLink && (
                        <div className="text-danger mb-10 lg:mb-0 text-2xl lg:text-sm">
                          {errors.socialLink}
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline w-[100%] mb-5">
                      <label
                        id="background"
                        className="w-[25%] text-lg lg:text-sm font-poppins mx-[2px] font-[600]"
                      >
                        Background
                      </label>
                      <div className="w-[70%] flex mb-10 lg:mt-0 mt-3 duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg  lg:mb-1">
                        <BsClockHistory className="lg:text-xl text-3xl text-gray-400" />
                        <Field
                          className="pl-2 outline-none  w-full text-sm lg:text-sm font-poppins bg-transparent"
                          type="text"
                          for="background"
                          name="background"
                          placeholder="Your Background"
                        />
                      </div>
                      {errors.background && touched.background && (
                        <div className="text-danger mb-10 lg:mb-0 text-2xl lg:text-sm">
                          {errors.background}
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline w-[100%]">
                      <label
                        id="phone_number"
                        className="w-[25%] text-400 lg:text-sm text-lg font-poppins mx-[2px] font-[600]"
                      >
                        Phone Number
                      </label>
                      <div className="w-[70%] flex mb-10  my-2 lg:my-0  duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg lg:mb-2">
                        <AiOutlinePhone className="lg:text-xl text-3xl text-gray-400" />
                        <Field
                          className="pl-2 outline-none w-full lg:text-sm text-sm font-poppins"
                          type="text"
                          for="phone_number"
                          name="phone_number"
                          placeholder="Phone Number"
                          validate={validatePhoneNumber}
                        />
                      </div>
                      {errors.phone_number && touched.phone_number && (
                        <div className="text-danger  lg:text-sm text-4xl">
                          {errors.phone_number}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center mt-6">
                      <div className="lg:mt-4 mb-0 lg:text-sm text-4xl">
                        {errors.background &&
                        errors.socialLink &&
                        errors.phone_number ? (
                          <button
                            className="bg-gray-500 lg:text-sm  duration-300 text-4xl transition ease-in-out delay-150 
                                                     hover:bg-gray-500  text-secondary p-2.5 rounded-lg lg:w-72 w-72 font-poppins ho"
                            disabled
                          >
                            Request For Collaboration
                          </button>
                        ) : (
                          <button
                            className="bg-gray-900  lg:text-sm text-lg duration-300 transition ease-in-out delay-150 
                                                     hover:bg-gray-800  text-secondary p-2.5 rounded-lg lg:w-72 w-72 font-poppins ho"
                          >
                            Request For Collaboration
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
