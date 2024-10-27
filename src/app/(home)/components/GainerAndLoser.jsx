/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Modal, Pagination, Select, Skeleton, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GainerTable from "./GainerTable";
import api from "@/api/axios";

const Gainer = () => {
  const { filterMarketLiveData } = useSelector((state) => state.market);
  const { marketLiveHomeData } = useSelector((state) => state.home);
  const [sectorData, setSectorData] = useState([]);
  const [selectedSector, setSelectedSector] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  const [toggle, setToggle] = useState("gainer");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSectorData(marketLiveHomeData?.subIndices?.map((item) => item.sindex));
  }, [marketLiveHomeData]);

  const fetchGainerData = async () => {
    try {
      setLoading(true);
      if (selectedSector === "all") {
        const response = await api.get("/gainer/live");
        if (response.data.status === 200) {
          setCurrentData(response.data.data);
        }
      } else {
        const body = {
          sector: selectedSector,
        };
        const response = await api.post("/gainer/get_today_by_sector", body);
        if (response.data.status === 200) {
          setFilteredData(response.data.data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLoserData = async () => {
    try {
      setLoading(true);
      if (selectedSector === "all") {
        const response = await api.get("/loser/live");
        if (response.data.status === 200) {
          setCurrentData(response.data.data);
        }
      } else {
        const body = {
          sector: selectedSector,
        };
        const response = await api.post("/loser/get_today_by_sector", body);
        if (response.data.status === 200) {
          setFilteredData(response.data.data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUnchangeData = async () => {
    try {
      setLoading(true);
      if (selectedSector === "all") {
        const response = await api.get("/company/unchanged");
        if (response.data.status === 200) {
          setCurrentData(response.data.data);
        }
      } else {
        const body = {
          sector: selectedSector,
        };
        const response = await api.post("/company/unchanged/sector", body);
        if (response.data.status === 200) {
          setFilteredData(response.data.data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVolumeData = async () => {
    try {
      setLoading(true);
      if (selectedSector === "all") {
        const response = await api.get("/volume/live");
        if (response.data.status === 200) {
          setCurrentData(response.data.data);
        }
      } else {
        const body = {
          sector: selectedSector,
        };
        const response = await api.post("/volume/get_today_by_sector", body);
        if (response.data.status === 200) {
          setFilteredData(response.data.data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTransactionData = async () => {
    try {
      setLoading(true);
      if (selectedSector === "all") {
        const response = await api.get("/transaction/live");
        if (response.data.status === 200) {
          setCurrentData(response.data.data);
        }
      } else {
        const body = {
          sector: selectedSector,
        };
        const response = await api.post(
          "/transaction/get_today_by_sector",
          body
        );
        if (response.data.status === 200) {
          setFilteredData(response.data.data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchTurnoverData = async () => {
    try {
      setLoading(true);
      if (selectedSector === "all") {
        const response = await api.get("/turnover/live");
        if (response.data.status === 200) {
          setCurrentData(response.data.data);
        }
      } else {
        const body = {
          sector: selectedSector,
        };
        const response = await api.post("/turnover/get_today_by_sector", body);
        if (response.data.status === 200) {
          setFilteredData(response.data.data);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    switch (toggle) {
      case "gainer":
        fetchGainerData();
        break;
      case "loser":
        fetchLoserData();
        break;
      // case "unchanged":
      //   fetchUnchangeData();
      //   break;
      case "volume":
        fetchVolumeData();
        break;
      case "transaction":
        fetchTransactionData();
        break;
      case "turnover":
        fetchTurnoverData();
        break;
    }
  }, [toggle, selectedSector]);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  let options = [];
  if (sectorData !== undefined) {
    sectorData?.forEach((item) => {
      options.push({
        value: item,
        label: item,
      });
    });
    options.push({ value: "all", label: "All Sectors" });
  }

  const { Option } = Select;
  const modalFooter = <div className="sell-button"></div>;

  return (
    <>
      <GainerTable
        loading={loading}
        toggle={toggle}
        setToggle={setToggle}
        currentPage={1}
        isModalOpen={isModalOpen}
        pageSize={8}
        currentData={currentData}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex justify-end">
        <button
          className="lg:text-sm text-xl text-blue-700 font-semibold mr-3 mt-3 lg:p-0 p-2"
          onClick={() => setIsModalOpen(true)}
        >
          {" "}
          View More
        </button>
      </div>
      <Modal
        title=""
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        width="820px"
        footer={modalFooter}
      >
        <div className="pb-[40px] relative lg:pt-6 pt-20">
          <Select
            mode="single"
            size="large"
            placeholder="Select The Sector"
            onChange={(value) => {
              setSelectedSector(value), setCurrentPage(1);
            }}
            {...(selectedSector !== "" && { value: selectedSector })}
            options={options}
            className="absolute right-0 top-[30px] lg:w-[30%] w-[50%] lg:text-sm text-xl"
          >
            {options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                className="lg:text-sm text-lg"
              >
                {option.label}
              </Option>
            ))}
          </Select>
          <GainerTable
            loading={loading}
            toggle={toggle}
            setToggle={setToggle}
            currentPage={currentPage}
            isModalOpen={isModalOpen}
            pageSize={10}
            currentData={selectedSector === "all" ? currentData : filteredData}
            setCurrentPage={setCurrentPage}
          />
          <div className="mt-[10px] float-right mx-12">
            <Pagination
              current={currentPage}
              pageSize={10}
              total={
                selectedSector === "all"
                  ? currentData?.length
                  : filteredData?.length
              }
              onChange={handlePageChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Gainer;
