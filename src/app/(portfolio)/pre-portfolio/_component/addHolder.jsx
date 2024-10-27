"use client";
import { Button, Modal } from "antd";
import FirstPage from "./firstPage";
import { useState } from "react";

const AddHolder = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="gray-13"
        onClick={showModal}
        className="show-btn text-secondary  z-50"
      >
        {props.add}
      </Button>
      <Modal
        title={props.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="text-bold"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        style={{ width: "130% !important" }}
      >
        <FirstPage
          title={props.title}
          closeModal={() => setIsModalOpen(false)}
          fromWhere="portfolio"
        />
      </Modal>
    </>
  );
};
export default AddHolder;
