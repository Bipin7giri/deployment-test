"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ScreenerNavButtons from "./ScreenerNavButtons";

import { Modal, Pagination, Tag } from "antd";
import Link from "next/link";
// import { formatMoney } from "../../utils/formatMoney";
// import NoDataFound from "../../components/notDataFound";

import { useRouter } from "next/navigation";
import TableLoader from "../../../components/TableLoader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// import actions from "../auth/redux/actions";
import homeActions from "../redux/actions";
import api from "@/api/axios";
import { formatMoney } from "@/utils/formatMoney";
import NoDataFound from "@/components/NoDataFound";

const CompanyList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of items to display per page

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const { isLoggedIn, phoneNumber, currentUser } = useSelector(
  //   (state) => state.auth
  // );
  const { marketLiveHomeData, sectorWiseRecentYearsQuater } = useSelector(
    (state) => state.home
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [screenerIndicator, setScreenerIndicator] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState("lmc");
  const [setcorList, setSectorList] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState("Commercial Banks");
  const [companyList, setCompanyList] = useState([]);
  const [companyListLoading, setcompanyListLoading] = useState(true);
  const [tableHeading, setTableHeading] = useState([]);
  const router = useRouter();
  const handleChange = (sectorName) => {
    setSelectedSector(sectorName);
    setCurrentPage(1);
  };

  const containerRef = useRef(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        left: -200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: 0,
        right: 500,
        left: 500, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // ? fetch sectors
  const fetchSectors = async () => {
    try {
      SetLoading(true);
      const res = await api.post(`/report/getAllSectors`);
      if (res) {
        setSectorList(res.data.data);
        SetLoading(false);
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  const getAdvanceScreenerIndicator = async () => {
    try {
      const res = await api.get("advance_screener/options");
      if (res) {
        setScreenerIndicator(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCopmany = async () => {
    try {
      setcompanyListLoading(true);
      const res = await api.post("advance_screener", {
        id: selectedIndicator,
        sector: selectedSector,
      });
      if (res) {
        let tableBody =
          selectedIndicator === "hbs" ? res.data.data.rows : res.data.data;
        setCompanyList(tableBody);
        const tempTableHeading =
          selectedIndicator === "hbs"
            ? Object.keys(res.data.data.rows[0])
            : Object.keys(res.data.data[0]);
        setTableHeading(tempTableHeading);
        setcompanyListLoading(false);
      }
    } catch (err) {
      setcompanyListLoading(false);
    }
  };
  const handleButtonClick = (index, indicator) => {
    setActiveIndex(index);
    setSelectedIndicator(indicator);
    setCurrentPage(1);
  };

  // Calculate the data to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = companyList?.slice(startIndex, endIndex);
  useEffect(() => {
    getCopmany();
  }, [selectedIndicator, selectedSector]);

  // recentyear
  useEffect(() => {
    dispatch(
      homeActions.sectorwiseRecentYearQuater({ sector: selectedSector })
    );
  }, [selectedSector]);

  useEffect(() => {
    getAdvanceScreenerIndicator();
    fetchSectors();
  }, []);

  // if phone nuber is not entered while signup
  function validatePhoneNumber(value) {
    let error;
    if (!value) {
      error = "Required";
      return error;
    } else if (!/^\d{10}$/i.test(value)) {
      error = "Invalid phone number!";
      return error;
    } else {
      // Phone number is valid
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const modalFooter = (
    <div className="add-stock-footer-button">
      {/* <Button key="cancel" onClick={handleCancel} className="cancel none">
        Cancel
      </Button>
      <Button
        key="submit"
        type="primary"
        onClick={handleOk}
        className="ok none"
      >
        OK
      </Button> */}
    </div>
  );

  const [phone_number, setPhoneNumber] = useState();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // setIsPhoneNumberValid(isValidPhoneNumber(value));
    // if(phone_number){
    //   validatePhoneNumber(phone_number)
    //   // console.log(validatePhoneNumber(phone_number))
    // }
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    // dispatch(
    //   actions.updatePhoneNumber({
    //     user_id: currentUser,
    //     phone_number: phone_number,
    //   })
    // );
  };

  return (
    <div
      className="lg:container bg-secondary px-10 lg:mx-auto flex lg:flex-col flex-col  pt-5  lg:mt-0 gap-2  mx-auto rounded-[20px]"
      style={{ marginTop: "30px" }}
    >
      {/* {isLoggedIn && phoneNumber === null && (
        <>
          <Modal
            title="Please Enter Your Phone Number"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={modalFooter}
          >
            <div className="flex justify-center">
              <form
                onSubmit={handlePhoneNumberSubmit}
                className="w-[80%] text-center relative py-[30px]"
              >
                <div className="flex mb-10  my-2 lg:my-0  duration-300 transition ease-in-out delay-100 hover:border-black items-center border-2 py-2 px-3 rounded-lg lg:mb-2">
                  <PhoneInput
                    className="pl-2 outline-none w-full lg:text-sm text-4xl font-poppins"
                    placeholder="Enter phone number"
                    name="phone_number"
                    for="phone_number"
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="NP"
                    value={phone_number}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                &nbsp; &nbsp;
                <button
                  type="submit"
                  className="bg-primary lg:text-sm w-[80%] duration-300 text-4xl transition ease-in-out delay-150 hover:bg-gray-500 text-secondary
                      px-2 h-[36px] mt-[24px] rounded-lg"
                >
                  Add
                </button>
              </form>
              {phoneNumberError && (
                <p className="text-red-500">{phoneNumberError}</p>
              )}
            </div>
          </Modal>
        </>
      )} */}
      {loading ? (
        <>
          <div role="status" className="animate-pulse">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full mb-2.5 mx-auto"></div>
            <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            <div className="h-2.5 mx-auto  my-1 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span
              className="text-5xl lg:hidden text-gray-600 pb-3 pr-6 font-bold hover:text-gray-900 cursor-pointer"
              onClick={scrollLeft}
            >
              &lt;
            </span>
            <div className="flex overflow-x-auto" ref={containerRef}>
              <div className="flex lg:flex-wrap lg:gap-[1px] gap-2">
                {screenerIndicator?.map((item, id) => (
                  <ScreenerNavButtons
                    key={id}
                    title={`${item?.type}`}
                    isActive={activeIndex === id}
                    onClick={() => handleButtonClick(id, item.value)}
                  />
                ))}
              </div>
            </div>
            <span
              className="text-5xl lg:hidden text-gray-600 pb-4 pl-6 font-bold hover:text-gray-900 cursor-pointer"
              onClick={scrollRight}
            >
              &gt;
            </span>
            {Object.keys(sectorWiseRecentYearsQuater)?.length > 0 && (
              <div className="lg:block hidden">
                <Tag color="cyan">
                  as of {sectorWiseRecentYearsQuater?.quater}
                </Tag>
              </div>
            )}
          </div>

          {/* show description of indicator */}
          <p>
            <em>
              <span className="font-extralight  text-3xl lg:text-sm">
                {screenerIndicator
                  ?.filter((ele) => ele.id == activeIndex + 2)
                  ?.map((ele) => ele.description)}
              </span>
            </em>
          </p>
          <div className="flex justify-between mb-10 items-center">
            {Object.keys(sectorWiseRecentYearsQuater)?.length > 0 && (
              <div className="block lg:hidden mt-[28px]">
                <Tag color="cyan" className="text-3xl">
                  as of {sectorWiseRecentYearsQuater?.quater}
                </Tag>
              </div>
            )}
            <div className="ml-auto">
              {selectedIndicator === "hbs" ? (
                ""
              ) : (
                <select
                  onChange={(e) => {
                    handleChange(e.target.value);
                  }}
                  className="select px-4 lg:px-0 border border-gray-200 pl-3 text-4xl mt-5 lg:mt-0 cursor-pointer lg:text-sm leading-5 lg:rounded-full rounded-xl bg-slate-100 text-primary outline-none lg:py-1 text-left"
                  defaultValue={selectedSector}
                >
                  <option value="" disabled hidden>
                    Select a company
                  </option>

                  {setcorList &&
                    setcorList?.length > 0 &&
                    setcorList?.map((sectorName) => {
                      if (sectorName.sector_name !== "Mutual Fund") {
                        return (
                          <option
                            style={{ textAlign: "left" }}
                            key={sectorName.sector_name}
                            value={sectorName.sector_name}
                            className="!text-16 text-center 2xl:text-18"
                          >
                            {sectorName?.sector_name}
                          </option>
                        );
                      }
                      return null;
                    })}
                </select>
              )}
            </div>
          </div>
        </>
      )}

      {/* Company list */}
      <div className="overflow-x-auto lg:overflow-hidden  lg:mt-[-30px]">
        {companyListLoading ? (
          <>
            <TableLoader />
          </>
        ) : (
          <>
            {companyList?.length > 0 ? (
              <>
                <table className="w-full table-company mt-[10px] text-left">
                  <thead className="text-[34px] lg:text-[14px] 2xl:text-[16px] text-[#616161]">
                    <th className="sticky th-td !font-[500] bg-slate-50 lg:bg-white left-0  text-center capitalize lg:font-[400] w-4/12">
                      Company
                    </th>
                    {tableHeading?.map((title, id) => {
                      return (
                        <>
                          {id > 1 && (
                            <th
                              key={id}
                              scope="col"
                              className="px-10 th-td lg:px-1 capitalize !font-[400] text-center py-3"
                            >
                              {title}
                            </th>
                          )}
                        </>
                      );
                    })}
                    <th
                      scope="col"
                      className="px-10 lg:px-1 th-td capitalize !font-[400] text-center py-3"
                    >
                      <span>LTP</span>
                    </th>
                  </thead>
                  <tbody>
                    {paginatedData?.map((company, id) => (
                      <tr
                        key={id}
                        onClick={() => {
                          router.push(`/company/${company?.Symbol}`);
                        }}
                        className="font-[400] tr hover:bg-gray-100  cursor-pointer border-b-[1px] border-gray-200 text-3xl lg:text-sm transition-colors duration-300"
                      >
                        <td className="sticky td th-td left-0 px-2 lg:px-4 bg-slate-50 lg:bg-white py-2 flex justify-end flex-col lg:gap-0 gap-5 w-[300px] lg:w-auto text-2xl lg:text-sm text-gray-900 dark:text-secondary first-column-hover">
                          <div className="flex lg:flex-none items-center gap-4">
                            <img
                              className="lg:w-12 w-20 h-20 lg:h-12 rounded-full object-contain"
                              src={`https://peridotnepal.xyz/company_logo/${company?.Symbol}.webp`}
                              alt={company?.Symbol}
                            />
                            <span className="lg:block text-primary font-[500] text-sm hidden">
                              {company?.["Company Name"]}
                            </span>
                            <span className="lg:hidden text-primary !text-4xl ml-2 block">
                              {company?.Symbol}
                            </span>
                          </div>
                        </td>
                        {tableHeading?.map((item, id) => (
                          <>
                            {id > 1 && (
                              <td
                                key={id}
                                className="px-3 th-td lg:px-4 lg:text-[12px] text-3xl text-center py-2"
                              >
                                <Link href={`/company/${company.Symbol}`}>
                                  {item === "ROE" ||
                                  item === "ROA" ||
                                  item === "Net Margin" ||
                                  item === "Change" ? (
                                    <>
                                      {(company?.[item] * 1)?.toFixed(2) + "%"}
                                    </>
                                  ) : (
                                    <>
                                      {item === "Market Cap" ||
                                      item === "Total Investment" ? (
                                        <>{formatMoney(company?.[item])}</>
                                      ) : item === "EPS" ? (
                                        <>
                                          {" "}
                                          {company?.[item] &&
                                            company?.[item]}{" "}
                                        </>
                                      ) : item === "BVPS" ? (
                                        <>
                                          {" "}
                                          {company?.[item] &&
                                            company?.[item]}{" "}
                                        </>
                                      ) : (
                                        <>
                                          {item === "LTP" ? (
                                            <>
                                              {company?.[item]?.lastTradedPrice}
                                            </>
                                          ) : (
                                            <>{company?.[item]}</>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </Link>
                              </td>
                            )}
                          </>
                        ))}
                        <td className="px-3 th-td  tr lg:px-4 lg:text-[12px] text-3xl text-center py-2">
                          {
                            (
                              marketLiveHomeData?.liveData?.find(
                                (obj) => obj?.symbol === company?.Symbol
                              ) || {}
                            ).lastTradedPrice
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end py-4">
                  <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    total={companyList?.length}
                    pageSize={pageSize}
                    className="text-3xl lg:text-sm sm:flex justify-center items-center"
                  />
                </div>
              </>
            ) : (
              <div className="flex items-center mb-4 justify-center ">
                <NoDataFound />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
