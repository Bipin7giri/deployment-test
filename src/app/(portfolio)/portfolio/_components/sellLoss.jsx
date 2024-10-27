"use client";

import { Modal, Skeleton } from "antd";
import { useSelector } from "react-redux";

const SellLoss = ({ visible, onClose, data }) => {
  const { setIsSellLoading } = useSelector((state) => state.portfolio);

  return (
    <>
      <Modal
        title=""
        onOk={onClose}
        onCancel={onClose}
        width="40%"
        visible={visible}
        style={{ height: "100px" }}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {setIsSellLoading && <Skeleton paragraph={{ rows: 14 }} />}
        <div className="flex justify-center lg:py-[4vh] mt-[5vh] ">
          <div className="w-[440px]  shadow bg-[#fff] rounded-xl">
            {/* <h5 className="text-[#F98F2D] pt-[40px] text-[20px] font-[700]">Congratulations!</h5> */}
            <p className="px-[50px] py-[80px] text-[16px] font-[500]">
              You have <sapn className="font-[700] text-[#F76560]">selled</sapn>{" "}
              {data?.unit * -1} units of {data?.symbol} at {data?.unit_price}{" "}
              per unit
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SellLoss;
