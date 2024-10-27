"use client";

// todo:calculatorActions(ShowDetails)

import { Modal } from "antd";
import React from "react";
// import ShowDetails from '../../Tools/Calculator/showDetails'

const StockAddInformation = ({ visible, onClose, data, transactionTyp }) => {
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
        <div className="flex justify-center text-center bg-[#F4F6F9]">
          {/* <ShowDetails data={data} transactionTyp={transactionTyp} /> */}
        </div>
      </Modal>
    </>
  );
};

export default StockAddInformation;
