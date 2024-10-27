"use client";
import { Modal } from "antd";
import img from "@/assets/img/ProfitSell.png";
import Confetti from "react-confetti";

const SellProfit = ({ visible, onClose, data }) => {
  return (
    <>
      <Modal
        title=""
        onOk={onClose}
        onCancel={onClose}
        width="40%"
        visible={visible}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="lg:h-[68vh] h-[40vh] text-center bg-[#F4F6F9]">
          <div className="flex justify-center ">
            <div className="w-[440px] h-[195px] shadow bg-[#fff] mt-[5vh] rounded-xl">
              <Confetti className="w-[100%]" />

              <h5 className="text-[#F98F2D] pt-[40px] text-[20px] font-[700]">
                Congratulations!
              </h5>
              <p className="px-[15px] py-[20px] text-[16px] font-[500]">
                You have <span className="text-[#3AB67A]"> profited </span>
                <span className="font-[700]"> {data?.porfit_amount} </span> by
                selling {data?.unit * -1} units of {data?.symbol} at{" "}
                {data?.unit_price} per unit{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-[20px]">
            <img src={img} alt="img"></img>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SellProfit;
