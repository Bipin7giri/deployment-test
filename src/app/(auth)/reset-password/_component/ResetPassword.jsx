"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

import { sendPasswordResetEmail } from "firebase/auth";
import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import { companyLogo } from "@/assets/svg/Logo";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebaseconfig/config";

const ResetPassword = () => {
  const inputRef = useRef(null);
  const router = useRouter();

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const { isLoggedIn, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleResetPassword = async (values) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      message.success("Password reset email sent");
      router.push("/login");
    } catch (error) {
      message.error(`User with this email not found`);
    }
  };

  return (
    <div className="bg-cover bg-[#F4F6F9] flex w-full flex-col justify-center bg-no-repeat h-screen">
      <div className="flex justify-center items-center content-center min-h-screen">
        <div className="lg:w-[40%] relative rounded-xl bg-secondary    px-10 py-5 shadow-md w-[90%] mx-5 lg:mx-0">
          <Link href="/">
            <span className="cursor-pointer absolute left-2 top-2">
              <ArrowLeftOutlined className="text-4xl lg:text-xl" />
            </span>
          </Link>
          <div className="flex w-full lg:h-24 h-72 justify-center mb-5">
            {/* <img src={avatarImage} alt="Avatar" /> */}
            <div dangerouslySetInnerHTML={{ __html: companyLogo }} />
          </div>
          <div className="flex justify-center items-center">
            <Spin spinning={loading} size="large" />
          </div>
          <Formik initialValues={{ email: "" }} onSubmit={handleResetPassword}>
            {({ errors, touched }) => (
              <Form>
                <label
                  htmlFor="email"
                  className="text-3xl lg:text-sm font-poppins mx-[2px]"
                >
                  Email
                </label>
                <div className="flex mb-10 lg:mt-0 mt-3 duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg lg:mb-1">
                  <AiOutlineMail className="lg:text-xl text-3xl text-gray-400" />
                  <Field
                    innerRef={inputRef}
                    className="pl-2 outline-none w-full text-4xl lg:text-sm font-poppins bg-transparent"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email"
                    validate={validateEmail}
                  />
                </div>
                {errors.email && touched.email && (
                  <div className="text-danger mb-10 lg:mb-0 text-2xl lg:text-sm">
                    {errors.email}
                  </div>
                )}
                <div className="flex items-center justify-center mt-[40px] mb-[20px]">
                  <div className="lg:mt-4 mb-0 lg:text-sm text-4xl">
                    <button
                      type="submit"
                      className="bg-gray-900 lg:text-sm text-4xl duration-300 transition ease-in-out delay-150 hover:bg-gray-800 text-secondary  p-2 rounded-lg lg:w-72 w-72 font-poppins"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
