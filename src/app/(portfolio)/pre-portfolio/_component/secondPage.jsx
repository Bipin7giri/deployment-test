"use client";
import React from "react";
import { useSelector } from "react-redux";

import Login from "@/app/(auth)/login/_component/login";
import SecondPageComponent from "../../portfolio/_components/SecondPageComponent";

const SecondPage = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    // return <Login path="/pre-portfolio" />;
  }

  return (
    <>
      <div className="lg:bg-[#F4F6F9]">
        <SecondPageComponent props={props} />
      </div>
    </>
  );
};
export default SecondPage;
