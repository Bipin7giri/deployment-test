"use client";
import React, { useEffect, useState } from "react";
import { useCSVReader } from "react-papaparse";
import { Button, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import actions from "../_redux/action";
import { formatMoney } from "@/utils/formatMoney";

export default function CSVReader() {
  const dispatch = useDispatch();
  const { CSVReader } = useCSVReader();

  const [csvData, setCsvData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [csvSelected, setCsvSelected] = useState(false);
  const [data, setData] = useState([]);
  const { shareHolderId } = useSelector((state) => state.portfolio);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (csvData?.length > 0) {
      setData(csvData?.slice(1, -2));
    }
  }, [csvData]);

  const showCsvModal = () => {
    setIsModalVisible(true);
  };

  const handleCsvImportOk = () => {
    const checkDataLength = data?.map((item, id) => item?.length !== 7);
    const isValid = checkDataLength?.every((item) => item === true);
    if (isValid) {
      const transformedData = [];
      for (const item of data) {
        transformedData.push({
          symbol: item[1],
          user_id: currentUser,
          no_of_stocks: Number(item[2]),
          share_holder_id: shareHolderId,
          buy_amount_BC: Number(item[7]),
          buy_amount: Number(item[7]),
          totalAmountPayable: Number(item[7]) * Number(item[2]),
        });
      }
      dispatch(actions.postCsvImport({ transformedData: transformedData }));

      setIsModalVisible(false);
      setCsvData([]);
      setCsvSelected(true);
    } else {
      message.error("Input all the buy price");
    }
  };

  const handleCsvImportCancel = () => {
    setIsModalVisible(false);
  };

  const CustomFooter = () => {
    return (
      <div>
        <Button onClick={handleCsvImportCancel}>Cancel</Button>
        <Button
          onClick={handleCsvImportOk}
          className="bg-primary text-secondary border-2 border-primary"
        >
          Save
        </Button>
      </div>
    );
  };

  const handlePriceInput = (sym, price) => {
    let newData = [...data];
    let index = newData.findIndex((item) => item[1] === sym);
    if (index !== -1) {
      newData[index][7] = price;
      setData(newData);
    }
  };

  return (
    <>
      <CSVReader
        onUploadAccepted={(results) => {
          setCsvData(results?.data);
          if (results?.data.length > 0) {
            showCsvModal();
          }
        }}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
          <>
            <div className="relative">
              {csvSelected ? ( // Conditionally render based on csvSelected
                <button
                  className="font-[400] px-[12px]"
                  {...getRootProps()}
                  disabled
                >
                  CSV Import
                </button>
              ) : (
                <button className="font-[400] px-[12px]" {...getRootProps()}>
                  CSV Import
                </button>
              )}
              {acceptedFile && !csvSelected ? (
                <button
                  className="bg-danger font-[400] px-[12px] rounded-tr-[4px]"
                  {...getRemoveFileProps()}
                >
                  Remove
                </button>
              ) : (
                ""
              )}

              {!csvSelected && (
                <div className="bg-secondary text-primary font-[400]">
                  {acceptedFile && acceptedFile.name}
                </div>
              )}
            </div>
            <ProgressBar />
          </>
        )}
      </CSVReader>

      <Modal
        title="Importing CSV Data"
        visible={isModalVisible}
        onOk={handleCsvImportOk}
        onCancel={handleCsvImportCancel}
        className="csv-import-modal"
        footer={<CustomFooter />}
        // width="70vw"
      >
        {data?.map((row, id) => (
          <div
            key={id}
            className="rounded-md mb-[20px] border-[2px] border-[#000]"
          >
            <div className="bg-primary text-secondary text-[16px] text-center py-[4px]">
              {row[1]}
            </div>
            <table className="table w-[100%] table-fixed">
              <thead className="">
                <tr>
                  {/* <th className="px-4 lg:text-sm text-[24px] text-[#868484] py-2">Date</th> */}
                  <th className="px-4 lg:text-sm text-[24px] text-[#868484] py-2">
                    Units
                  </th>
                  <th className="px-4 lg:text-sm text-[24px] text-[#868484] py-2">
                    Buy Price
                  </th>
                  {/* <th className="px-4 lg:text-sm text-[24px] text-[#868484] py-2">Type</th>
                                    <th className="px-4 lg:text-sm text-[24px] text-[#868484] py-2">Buy Price</th> */}
                </tr>
              </thead>
              <tbody>
                <tr
                  className={
                    (id + 1) % 2 === 0
                      ? "text-center text-[24px] lg:text-sm"
                      : "text-center text-[24px] lg:text-sm bg-[#F4F6F9]"
                  }
                >
                  {/* <td className=" px-4 py-2 text-[14px] font-[500] text-grey-600 ">{row[2]}</td> */}
                  <td className=" px-4 py-2 text-[14px] font-[500] text-grey-600">
                    {formatMoney(row[2])}
                  </td>
                  <td className=" px-4 py-2 text-[14px] font-[500] text-grey-600">
                    <input
                      type="number"
                      required
                      className="border-[2px] py-1 px-1 w-[50%]"
                      onChange={(e) => handlePriceInput(row[1], e.target.value)}
                    />
                  </td>
                  {/* <td className=" px-4 py-2 text-[14px] font-[500] text-grey-600">{row[6]}</td>
                                        <td className=" px-4 py-2 text-[14px] font-[500] text-grey-600">Rs. {formatMoney(row[5])}</td> */}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </Modal>
    </>
  );
}
