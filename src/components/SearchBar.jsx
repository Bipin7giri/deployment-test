"use client";
import React, { useState, useEffect, useRef } from "react";
import { HiSearch } from "react-icons/hi";
import { formatMoney } from "../utils/formatMoney";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
// import companyActions from "../pages/company/redux/actions";
// import { useDispatch } from "react-redux";

const SearchBar = ({
  companies,
  setToggleSearch,
  searchToggle,
  setToggleSearchSmallScreen,
}) => {
  const inputRef = useRef(null);
  // const dispatch = useDispatch();
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
        company.symbol.toLowerCase().includes(value) ||
        company.companyName.toLowerCase().includes(value)
    );
    setSearchData(filteredData);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (symbol) => {
    // dispatch(companyActions.companyDetail(symbol));
    router.push(`/company/${symbol}`);
    setToggleSearch(false);
    setToggleSearchSmallScreen(false);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (searchToggle) {
      inputRef.current?.focus();
    }
  }, [searchToggle]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (selectedItemIndex !== -1) {
        const selectedSearchData = searchData[selectedItemIndex];
        router.push(`/company/${selectedSearchData.symbol}`);
        setToggleSearch(false);
        setToggleSearchSmallScreen(false);
      } else {
        const enteredValue = searchText.toLowerCase();
        const matchedCompany = filteredCompanies.find(
          (company) =>
            company.symbol.toLowerCase().includes(enteredValue) ||
            company.companyName.toLowerCase().includes(enteredValue)
        );
        if (matchedCompany) {
          router.push(`/company/${matchedCompany.symbol}`);
          setToggleSearch(false);
          setToggleSearchSmallScreen(false);
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
      setToggleSearch(false);
      setToggleSearchSmallScreen(false);
      setSelectedItemIndex(-1);
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

  useEffect(() => {
    if (companies?.length > 0) {
      const uniqueCompanies = Array.from(
        new Set(companies.map((company) => company.symbol))
      ).map((symbol) => companies.find((company) => company.symbol === symbol));
      const filteredUniqueData = uniqueCompanies?.filter(
        (item) => item?.companyName !== ""
      );
      setSearchData(filteredUniqueData);
      setFilteredCompanies(filteredUniqueData);
      setShowSuggestions(true);
      setSearchText("");
    }
  }, [companies, searchToggle]);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  return (
    <div className="relative w-full pt-14">
      <div className="flex items-center gap-8 mb-4">
        <button
          onClick={() => setToggleSearchSmallScreen(false)}
          className="bg-gray-100 rounded-full flex items-center justify-center"
          style={{ width: "64px", height: "64px" }}
        >
          <GoArrowLeft className="text-3xl" />
        </button>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search Company"
          value={searchText}
          onChange={handleSearchTextChange}
          onKeyDown={handleKeyPress}
          className="appearance-none text-4xl flex-1 lg:text-sm placeholder:text-4xl bg-transparent border border-gray-600 rounded-full w-full py-3 px-8 placeholder-gray-500 font-serif text-gray-900 focus:outline-none focus:placeholder-gray-600"
        />
      </div>

      <ul className="flex flex-col max-h-[1000px] min-h-[400px] overflow-auto lg:gap-0 gap-10 px-2 mt-8 mb-6 lg:mt-0 py-2 font-poppins text-[32px] lg:text-[16px]">
        {showSuggestions && (
          <>
            {searchData?.map((company, index) => (
              <li
                key={company?.symbol}
                onClick={() => handleSuggestionClick(company?.symbol)}
                className={`flex justify-between gap-2 text-3xl w-full cursor-pointer hover:bg-[#F4F6F9] transition-all p-2 ${
                  index === selectedItemIndex
                    ? "bg-[#F4F6F9] text-gray-800"
                    : "text-gray-800 hover:text-gray-900"
                }`}
              >
                <span>{`${company?.companyName} (${company?.symbol})`}</span>
                <span className="font-[500] text-end">
                  {formatMoney(company?.lastTradedPrice)}
                  <span
                    className={`${
                      company?.schange > 0
                        ? "text-success"
                        : company?.schange === 0
                        ? "text-info"
                        : "text-danger"
                    } ml-[4px]`}
                  >
                    {formatMoney(company?.schange)} (
                    {company?.perChange?.toFixed(2)}%)
                  </span>
                </span>
                {/* <span className={`${companies?.schange > 0 ? "text-success" : "text-danger"}`}></span> */}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default SearchBar;
