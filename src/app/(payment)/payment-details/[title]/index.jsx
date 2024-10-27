import React from "react";

import PaymentPage from "./PaymentPage";
// import usePageViewTracking from "../../services/usePageViewTracking";

const Payment = () => {
  // usePageViewTracking();
  return (
    <>
      <div>
        <div className="bg-[#F4F6F9] ">
          <PaymentPage />
        </div>
      </div>
    </>
  );
};
export default Payment;
