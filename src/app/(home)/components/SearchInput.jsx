"use client";

import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { HiMiniArrowSmallUp, HiMiniArrowSmallDown } from "react-icons/hi2";
import { Tabs } from "antd";
import { formatMoney } from "@/utils/formatMoney";
import { useRouter } from "next/navigation";

const { TabPane } = Tabs;

const SearchInput = ({ companies, className, isBullMarket, isBanner }) => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const router = useRouter();

  const handleSearchTextChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setSelectedItemIndex(-1);

    const filteredData = filteredCompanies.filter(
      (company) =>
        company.symbol?.toLowerCase().includes(value) ||
        company.companyName?.toLowerCase().includes(value)
    );
    setSearchData(filteredData);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (symbol) => {
    router.push(`/company/${symbol}`);
    setShowSuggestions(false);
  };

  const handleMouseLeave = () => {
    setShowSuggestions(false);
  };

  const handleInputClick = (company) => {
    setShowSuggestions(company);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (selectedItemIndex !== -1) {
        const selectedSearchData = searchData[selectedItemIndex];
        router.push(`/company/${selectedSearchData.symbol}`);
        setShowSuggestions(false);
      } else {
        const enteredValue = searchText.toLowerCase();
        const matchedCompany = filteredCompanies.find(
          (company) =>
            company.symbol?.toLowerCase() === enteredValue ||
            company.companyName?.toLowerCase() === enteredValue
        );
        if (matchedCompany) {
          router.push(`/company/${matchedCompany.symbol}`);
        } else {
          router.push(`/*`);
        }
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) => {
        if (prevIndex === -1) {
          return searchData.length - 1;
        } else if (prevIndex === 0) {
          return -1;
        } else {
          return prevIndex - 1;
        }
      });
      scrollSuggestions("up");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) => {
        if (prevIndex === -1 || prevIndex === searchData.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
      scrollSuggestions("down");
    } else if (event.key === "Escape") {
      setSelectedItemIndex(-1);
    }
  };

  const handleClickOnSearch = () => {
    const enteredValue = searchText.toLowerCase();
    const matchedCompany = filteredCompanies.find(
      (company) =>
        company.symbol?.toLowerCase() === enteredValue ||
        company.companyName?.toLowerCase() === enteredValue
    );
    if (matchedCompany) {
      router.push(`/company/${matchedCompany.symbol}`);
      setShowSuggestions(false);
    } else {
      router.push(`/*`);
    }
  };

  const scrollSuggestions = (direction) => {
    const list = document.getElementById("suggestions-list");
    if (list) {
      const itemHeight = list.firstChild.offsetHeight;
      const visibleItems = Math.floor(list.offsetHeight / itemHeight);
      const scrollHeight = list.scrollHeight;

      if (direction === "up") {
        if (selectedItemIndex < visibleItems) {
          // Scroll up
          list.scrollTop = Math.max(
            0,
            list.scrollTop - selectedItemIndex * itemHeight
          );
        } else {
          // Scroll down (adjust condition)
          list.scrollTop = Math.min(
            scrollHeight - list.offsetHeight,
            list.scrollTop + (selectedItemIndex - visibleItems + 2) * itemHeight
          );
        }
      } else if (direction === "down") {
        // Scroll down
        if (selectedItemIndex >= visibleItems - 1) {
          list.scrollTop = Math.min(
            scrollHeight - list.offsetHeight,
            list.scrollTop + (selectedItemIndex - visibleItems + 2) * itemHeight
          );
        }
      }
    }
  };

  // const [isTabsFixed, setIsTabsFixed] = useState(false);
  // const yourDivRef = useRef(null);

  useEffect(() => {
    // const handleScroll = () => {
    //   const scrollTop = yourDivRef.current.scrollTop;
    //   // Adjust the scroll threshold as needed
    //   setIsTabsFixed(scrollTop > 500);
    // };

    // yourDivRef.current.addEventListener('scroll', handleScroll);

    // return () => {
    //   yourDivRef.current.removeEventListener('scroll', handleScroll);
    // };

    if (companies?.length > 0) {
      const uniqueCompanies = Array.from(
        new Set(
          companies
            ?.filter((company) => company.symbol !== null)
            ?.map((company) => company.symbol)
        )
      ).map((symbol) => companies.find((company) => company.symbol === symbol));
      if (searchText.length > 0) {
        const filteredData = uniqueCompanies.filter(
          (company) =>
            company.symbol.toLowerCase().includes(searchText) ||
            company.companyName.toLowerCase().includes(searchText)
        );
        setSearchData(filteredData);
      } else {
        setSearchData(uniqueCompanies);
      }
      setFilteredCompanies(uniqueCompanies);
      setIsDataLoaded(true); // Set isDataLoaded to true when data is available
    } else {
      setIsDataLoaded(false); // Set isDataLoaded to true when data is available
    }
  }, [companies]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {/* <Tabs centered defaultActiveKey="1" tabBarGutter={10}>
        <TabPane tab="All" key="1">
          {searchData?.map((company, index) => (
            <li
              key={company?.symbol}
              onClick={() => handleSuggestionClick(company?.symbol)}
              className={`search-list flex z-10 gap-3 border-b justify-between cursor-pointer text-primary hover:bg-[#F4F6F9] transition-all p-2 ${index === selectedItemIndex
                ? "bg-[#F4F6F9] text-gray-800"
                : "text-gray-800 hover:text-gray-900"
                }`}
            >
              <div className="company-img" style={{ height: "40px", width: "40px", borderRadius: "50%", background: "green", overflow: "hidden", lineHeight: "40px", textAlign: "center" }}>
                <img src={`https://peridotnepal.xyz/company_logo/${company?.symbol ?? 'default'}.webp`} alt={company?.companyName} />
              </div>

              <div style={{ textAlign: "left", width: "60%" }}>
                <p>{`${company?.companyName}`}</p>
              </div>

              <div className="font-[500]" style={{ textAlign: "left", width: "25%", display: "flex", justifyContent: "end", alignItems: "center" }}>
                <span>{formatMoney(company?.lastTradedPrice)}</span>
                <span
                  className={`${company?.schange > 0
                    ? "text-success"
                    : company?.schange === 0
                      ? "text-info"
                      : "text-danger"
                    } ml-[4px]`}
                >
                  {formatMoney(company?.schange)} (
                  {company?.perChange?.toFixed(2)}%)
                </span>
                <span style={{ marginLeft: "5px" }}>
                  {company?.schange > 0 ? <HiMiniArrowSmallUp className="text-success" /> : company.schange === 0 ? "" : <HiMiniArrowSmallDown className="text-danger" />}
                </span>
              </div>


            </li>
          ))}
        </TabPane>

        <TabPane tab="Mutual Fund" key="2">

        </TabPane>
      </Tabs> */}
      <div className="relative z-99 w-full">
        <div className="relative" onMouseLeave={handleMouseLeave}>
          <div className={className}>
            <span
              className="search-icon absolute top-[10px] lg:top-[76px] 2xl:top-[78px]"
              style={{
                backgroundColor:
                  isBullMarket !== undefined &&
                  (isBullMarket ? "green" : "red"),
              }}
            >
              <CiSearch
                onClick={handleClickOnSearch}
                className="text-white lg:block lg:text-[28px] text-[30px]
                 hover:cursor-pointer"
              />
            </span>
            <div>
              <input
                ref={inputRef}
                type="search"
                placeholder="Search Company"
                value={searchText}
                onChange={handleSearchTextChange}
                onKeyDown={handleKeyPress}
                onClick={(company) => {
                  handleInputClick(company);
                }}
                className={`${
                  isBullMarket !== undefined &&
                  (isBullMarket ? "border-green-700" : "red-green-700")
                } appearance-none mt-10 py-5 shadow-x rounded-full text-primary
                 bg-white lg:text-sm 2xl:text-lg bg-transparent border
                  placeholder-gray-500 font-serif focus:outline-none focus:placeholder-gray-600
                   lg:placeholder:text-base placeholder:text-[26px]`}
              />
            </div>
          </div>
          <ul
            id="suggestions-list"
            className={` ${
              showSuggestions ? "block" : "hidden"
            } suggestion-tab shadow-xl flex !bg-white absolute ${
              isBanner ? "lg:!top-[62px]" : "lg:!top-[38px]"
            } !top-[18px] z-50 lg:w-[1000px]
               flex-col  rounded-3xl
              overflow-auto lg:gap-0 gap-10 px-2 mt-5 lg:mt-0 py-2 font-poppins text-[32px] 
              lg:text-[16px]`}
            style={{ maxHeight: "350px" }}
          >
            {showSuggestions && isDataLoaded && (
              <>
                <Tabs centered defaultActiveKey="1" tabBarGutter={10}>
                  <TabPane tab="All" key="1">
                    {searchData?.map((company, index) => (
                      <li
                        key={company?.symbol}
                        onClick={() => handleSuggestionClick(company?.symbol)}
                        className={`search-list flex z-10 gap-3 border-b justify-between
                         cursor-pointer text-primary hover:bg-[#F4F6F9] transition-all
                          p-2 ${
                            index === selectedItemIndex
                              ? "bg-[#F4F6F9] text-gray-800"
                              : "text-gray-800 hover:text-gray-900"
                          }`}
                      >
                        {/* <div className="company-img" style={{ height: "40px", width: "40px",
                         borderRadius: "50%", background: "green", overflow: "hidden", lineHeight: "40px",
                         textAlign: "center" }}>
                          <img src={`https://peridotnepal.xyz/company_logo/${company?.symbol ?? 'default'}.webp`}
                           alt={company?.companyName} />
                        </div> */}

                        <div style={{ textAlign: "left", width: "70%" }}>
                          <p className="lg:text-sm text-[21px]">{`${company?.companyName} (${company?.symbol})`}</p>
                        </div>

                        <div
                          className="font-[500] lg:text-sm text-[20px]"
                          style={{
                            textAlign: "left",
                            width: "25%",
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                          }}
                        >
                          <span>{formatMoney(company?.lastTradedPrice)}</span>
                          <span
                            className={`${
                              company?.schange > 0
                                ? "text-success"
                                : company?.schange === 0
                                ? "text-info"
                                : company?.schange === null
                                ? "text-info"
                                : "text-danger"
                            } ml-[4px]`}
                          >
                            {formatMoney(company?.schange)} (
                            {company?.perChange?.toFixed(2)}%)
                          </span>
                          <span style={{ marginLeft: "5px" }}>
                            {company?.schange > 0 ? (
                              <HiMiniArrowSmallUp className="text-success" />
                            ) : company.schange === 0 ? (
                              ""
                            ) : company.schange === null ? (
                              ""
                            ) : (
                              <HiMiniArrowSmallDown className="text-danger" />
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
                  </TabPane>
                  <TabPane tab="Mutual Fund" key="2"></TabPane>
                </Tabs>
              </>
            )}
            {!isDataLoaded && <div>Loading...</div>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
