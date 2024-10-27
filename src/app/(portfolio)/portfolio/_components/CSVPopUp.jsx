"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { Link } from "next/link";
import CSVReader from "./CSVReader";
import { useSelector } from "react-redux";

export default function CSVPopUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [CSVUpload, setCSVUploadClicked] = useState(false);
  const { isCSVUpload } = useSelector((state) => state.portfolio);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isCSVUpload) {
      setIsModalOpen(false);
    }
  }, [isCSVUpload]);

  const modalFooter = <div className="sell-button"></div>;
  const handleCSVUploadClicked = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="mr-5 text-[14px] font-[400] px-[10px] text-secondary  bg-black rounded-md d-block"
        onClick={showModal}
      >
        {" "}
        Upload CSV{" "}
      </button>
      <Modal
        title="Please Follow Following Below Step"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-bold"
        footer={modalFooter}
        okButtonProps={{ style: { backgroundColor: "black" } }}
      >
        <div className="py-[10px] px-[40px] ">
          <div className="mb-[20px]">
            <ol className="list-decimal text-[16px] font-[400]">
              <li>
                {" "}
                Go to{" "}
                <a href="https://meroshare.cdsc.com.np/" target="_blank">
                  meroshare{" "}
                </a>
              </li>
              <li>Go to your Portfolio </li>
              <li> Download Your Portfolio in CSV format </li>
              <li> Now Upload the CSV below </li>
            </ol>
          </div>
          <div className="btn-portfolio flex justify-center  mt-2">
            <button
              className="bg-black text-secondary  px-12 py-2 rounded"
              style={{ width: "400px" }}
              onClick={handleCSVUploadClicked}
            >
              <CSVReader />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
