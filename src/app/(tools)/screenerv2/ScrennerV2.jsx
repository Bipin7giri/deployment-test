"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { IoIosArrowDropdown } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import CompanyList from "./_component/CompanyList";
import {
  Dropdown,
  Menu,
  Modal,
  Space,
  message,
  Tag,
  Button,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import api from "../../../api/axios";
import {
  CreateFilterDropdown,
  CreateMarketCapFilterDropdown,
} from "./_component/CreateFilterDropdown";
import actions from "../_redux/action";
import { setScreenerFilterList } from "../_redux/toolsSlice";
import { formatMoney } from "../../../utils/formatMoney";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { TbRestore } from "react-icons/tb";
import Image from "next/image";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center h-9 my-5 rounded-md border-[1px] bg-white overflow-hidden">
      <div className="grid place-items-center h-full w-12 text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        className="h-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search filters.."
      />
    </div>
  );
};

const FilterNavButtons = ({ title, isActive, onClick, rounded }) => {
  return (
    <button
      className={`${
        isActive
          ? "bg-[#D9D9D9] text-primary"
          : "bg-secondary text-primary border border-black"
      } border border-gray-200 cursor-pointer px-2 py-2 lg:px-2 lg:py-1 lg:text-sm text-lg 
          leading-5 mr-3 ${
            rounded === "scrennerV2" ? "rounded-md" : "rounded-full"
          } `}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const ScrennerV2 = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const topFilterMenu = (
    column,
    id,
    handleRemoveClick,
    screenerFilterList,
    columnTags
  ) => {
    let matchingRatio = screenerFilterList?.ratio_list?.find(
      (ratio) => ratio.ratio_name === column
    );
    const handleMenuClick = ({ key }) => {
      if (key === "remove") {
        handleRemoveClick(id);
        if (matchingRatio) {
          let updatedList = {
            ...screenerFilterList,
            ratio_list: screenerFilterList?.ratio_list?.filter(
              (ratio) => ratio.ratio_name !== matchingRatio?.ratio_name
            ),
          };
          dispatch(actions.postScreenerV2(updatedList));
          dispatch(setScreenerFilterList(updatedList));
        }
      } else if (key === "reset" && column === "Sectors") {
        if (matchingRatio && matchingRatio.filter_type !== 0) {
          const updatedRatioList = screenerFilterList?.ratio_list?.map(
            (ratio) => {
              if (ratio.ratio_name === column && ratio.start !== undefined) {
                const { start, ...rest } = ratio;
                return {
                  ...rest,
                  filter_type: 0,
                };
              }
              return ratio;
            }
          );

          const updatedScreenerFilterList = {
            ...screenerFilterList,
            ratio_list: updatedRatioList,
          };
          dispatch(actions.postScreenerV2(updatedScreenerFilterList));
          dispatch(setScreenerFilterList(updatedScreenerFilterList));
        }
      } else if (key === "reset" && column !== "Sectors") {
        if (matchingRatio && matchingRatio.filter_type !== 0) {
          const updatedRatioList = screenerFilterList?.ratio_list?.map(
            (ratio) => {
              if (ratio.ratio_name === column) {
                const { start, end, ...rest } = ratio;
                return {
                  ...rest,
                  filter_type: 0,
                };
              }
              return ratio;
            }
          );

          screenerFilterList = {
            ...screenerFilterList,
            ratio_list: updatedRatioList,
          };
          dispatch(actions.postScreenerV2(screenerFilterList));
          dispatch(setScreenerFilterList(screenerFilterList));
        }
      } else {
        // do nothing
      }
    };

    return (
      <Menu onClick={handleMenuClick}>
        {matchingRatio && matchingRatio.filter_type !== 0 ? (
          <>
            <Menu.Item key="reset">
              <div className="flex gap-3 items-center">
                <TbRestore className="text-lg " />
                <p>Reset</p>
              </div>
            </Menu.Item>
            <Menu.Divider className="border-[1px]" />
          </>
        ) : (
          <>
            {column === "Sectors" && (
              <p className="text-xs">
                Choose any sector in filter below first.
              </p>
            )}
          </>
        )}
        {column !== "Sectors" && (
          <Menu.Item key="remove">
            <div className="flex gap-3 items-center">
              <RiDeleteBinLine className="text-lg " />
              <p>Remove</p>
            </div>
          </Menu.Item>
        )}
      </Menu>
    );
  };

  const [oneLineShowHeight, setOneLineShowHeight] = useState(0);
  const [columnTags, setColumnTags] = useState([]);
  const [latestYear, setlatestYear] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [chooseColumnTags, setChooseColumnTags] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratioList, setRatioList] = useState([]);
  const [filteredRatios, setFilteredRatios] = useState([]);
  const [selectedSector, setSelectedSector] = useState("General");
  const [screenerName, setScreenerName] = useState("");
  const [dropdownChange, setDropdownChange] = useState();
  const [loadedScrennerName, setLoadedScreenerName] = useState("");

  const [dropDownItems, setDropDownItems] = useState([]);

  const [isScreenerSaveModalOpen, setIsScreenerSaveModalOpen] = useState(false);

  const {
    loading,
    screenerFilterList,
    getAllSavedScreener,
    screenerByID,
    saveScreener,
    scrennerV2Data,
    isSavedOrLoadedScreener,
  } = useSelector((state) => state.tools);
  const { isLoggedIn, currentUser, is_subscribed } = useSelector(
    (state) => state.auth
  );

  const prevScreenerFilterList = useRef(null);

  const removeColumn = (indexToRemove) => {
    const tempCol = [...columnTags];
    tempCol.splice(indexToRemove, 1);
    setColumnTags([...tempCol]);
  };

  const handleOneLineShowOption = () => {
    setOneLineShowHeight(50);
  };

  const handleMultiLineShowOption = () => {
    setOneLineShowHeight(0);
  };

  const showModal = () => {
    setIsModalOpen(true);
    fetchRatios();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const filterMenu = [
    { name: "General", value: "General" },
    { name: "Banking", value: "Commercial Banks" },
    { name: "Insurance", value: "Life Insurance" },
    { name: "Hydro", value: "Hydro Power" },
    { name: "Manufacturing", value: "Manufacturing And Processing" },
    { name: "Investment", value: "Investment" },
    { name: "Technical", value: "Technical" },
    { name: "Rating", value: "Rating" },
    { name: "Others", value: "Others" },
  ];

  const handleButtonClick = (index, indicator) => {
    setActiveIndex(index);
    setSelectedSector(indicator);
    setCurrentPage(1);
  };

  const sortColumn = (a, b, dataIndex) => {
    const aValue =
      typeof a[dataIndex] === "string"
        ? parseFloat(a[dataIndex])
        : a[dataIndex];
    const bValue =
      typeof b[dataIndex] === "string"
        ? parseFloat(b[dataIndex])
        : b[dataIndex];

    return aValue - bValue;
  };

  const funcolumnTags = (e) => {
    const tempNewFilterToAdd = { ...screenerFilterList };
    tempNewFilterToAdd.ratio_list = [
      ...(tempNewFilterToAdd.ratio_list || []),
      {
        id: e?.id,
        ratio_name: e?.ratio_name,
        filter_type: 0,
        table_name: e?.table_name,
      },
    ];
    dispatch(actions.postScreenerV2(tempNewFilterToAdd));
    dispatch(setScreenerFilterList(tempNewFilterToAdd));
    let value = e?.ratio_name;

    const newColumn = {
      title: <span className="dragHandler cursor-move">{value}</span>,
      dataIndex: value,
      key: value,
      width: 100,
      sorter: (a, b) => sortColumn(a, b, value),
      filterIcon: (filtered) => (
        <Image
          src="/assets/icon/filter.png"
          alt="filter"
          className="img-with-filter"
          style={{ color: filtered ? "#1890ff" : undefined, width: "auto" }}
          width={23}
          height={23}
        />
      ),
      filterDropdown: (props) =>
        value === "Market Cap"
          ? CreateMarketCapFilterDropdown(props, value)
          : CreateFilterDropdown(props, value),
      render: (text) => (
        <div
          className={
            !is_subscribed && (value == "Camel" || value == "Altman")
              ? "blur-column"
              : ""
          }
        >
          <div
            className={`text-center ${
              !isLoggedIn && value !== "LTP" && "blur-md"
            }`}
          >
            {!text
              ? "-"
              : value === "Market Cap"
              ? formatMoney(text?.toFixed(2))
              : typeof text === "number"
              ? text?.toFixed(2)
              : text}
          </div>
        </div>
      ),
    };
    setColumnTags([...columnTags, newColumn]);
    isChecked(e.ratio_name);
  };

  const checkedFilter =
    columnTags?.length > 0 &&
    columnTags
      ?.filter(
        (item, id) =>
          item?.dataIndex !== "Symbol" && item?.dataIndex !== "Sector"
      )
      ?.map((item, id) => item?.dataIndex);

  const fetchRatios = async () => {
    try {
      const res = await api.get(
        "/screener/get_all_ratio_list_v2/" + selectedSector
      );
      if (res) {
        setRatioList(res.data.data);
        const transformedArray = [];
        res?.data?.data?.forEach((item) => {
          const ratios = item.ratios;
          ratios.forEach((ratio) => {
            transformedArray.push({
              id: ratio.id,
              ratio_name: ratio.ratio_name,
              type: 1,
              table_name: ratio.table_name,
            });
          });
        });
        const ratiosTags = transformedArray?.map((ratio) => {
          return {
            name: ratio.ratio_name,
            checked: checkedFilter && checkedFilter?.includes(ratio.ratio_name),
          };
        });
        setChooseColumnTags(ratiosTags);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setlatestYear(scrennerV2Data?.data?.recentYear);
  }, [scrennerV2Data]);

  useEffect(() => {
    fetchRatios();
  }, [selectedSector]);

  const filterData = (searchTerm) => {
    if (!searchTerm) {
      return ratioList;
    }
    const filteredData = [];
    ratioList.forEach((section) => {
      const filteredRatios = section?.ratios.filter((ratio) => {
        const ratioName = ratio?.ratio_name?.toLowerCase();
        const searchWords = searchTerm?.toLowerCase().split(/\s+/);
        return searchWords.every((word) => ratioName?.includes(word));
      });

      if (filteredRatios.length > 0) {
        filteredData.push({
          ...section,
          ratios: filteredRatios,
        });
      }
    });

    return filteredData;
  };

  useEffect(() => {
    setFilteredRatios(filterData(searchTerm));
  }, [searchTerm, ratioList]);

  const isChecked = (chooseTag) => {
    const index = chooseColumnTags.findIndex((item) => item.name === chooseTag);
    if (index !== -1) {
      chooseColumnTags[index].checked = true;
      setChooseColumnTags([...chooseColumnTags]);
    }
  };

  const removeChecked = (chooseTag) => {
    const index = chooseColumnTags.findIndex((item) => item.name === chooseTag);
    if (index !== -1) {
      chooseColumnTags[index].checked = false;
      setChooseColumnTags([...chooseColumnTags]);
    }
  };

  useEffect(() => {
    let temChooseColumnTags = [...chooseColumnTags];
    temChooseColumnTags.forEach((columnTag) => {
      const columnName = columnTag.name;
      const columnExists = columnTags.some(
        (column) => column.title === columnName
      );
      columnTag.checked = columnExists;
    });
    setChooseColumnTags(temChooseColumnTags);
  }, []);

  const getColumnToAdd = (value) => {
    return {
      title: <span className="dragHandler cursor-move">{value}</span>,
      dataIndex: value,
      key: value,
      width: 100,
      sorter: (a, b) => a[value] - b[value],
      filterIcon: (filtered) => (
        <Image
          src="/assets/icon/filter.png"
          alt="filter"
          className="img-with-filter"
          style={{ color: filtered ? "#1890ff" : undefined, width: "auto" }}
          width={23}
          height={23}
        />
      ),
      filterDropdown: (props) =>
        value === "Market Cap"
          ? CreateMarketCapFilterDropdown(props, value)
          : CreateFilterDropdown(props, value),
      render: (text) => (
        <div
          className={`text-center ${
            !isLoggedIn && value !== "LTP" && "blur-md"
          }`}
        >
          {text == 0
            ? 0
            : !text
            ? "-"
            : value === "Market Cap"
            ? formatMoney(text?.toFixed(2))
            : typeof text === "number"
            ? text?.toFixed(2)
            : text}
        </div>
      ),
    };
  };

  useEffect(() => {
    let newTags = columnTags;
    const defaultRatioList = ["symbol", "Sectors"];
    const checkCloumnTags = columnTags?.filter((item) =>
      defaultRatioList?.includes(item?.dataIndex)
    );
    if (checkCloumnTags?.length > 0) {
      newTags = checkCloumnTags;
    }
    const updatedColumnTags = newTags.map((tag) => {
      const foundRatio = screenerFilterList?.ratio_list?.find(
        (item) => item.ratio_name === tag?.dataIndex
      );
      if (foundRatio) {
        const updatedTag = { ...tag };
        if (foundRatio.filter_type === "1" || foundRatio.filter_type === 1) {
          delete updatedTag?.["end"];
          updatedTag.start = foundRatio.start;
        } else if (
          foundRatio.filter_type === "2" ||
          foundRatio.filter_type === 2
        ) {
          delete updatedTag?.start;
          updatedTag["end"] = foundRatio.start;
        } else if (
          foundRatio.filter_type === "3" ||
          foundRatio.filter_type === 3
        ) {
          updatedTag.start = foundRatio.start;
          updatedTag["end"] = foundRatio.end;
        } else if (
          foundRatio.filter_type === "4" ||
          foundRatio.filter_type === 4
        ) {
          updatedTag["sector"] = foundRatio?.start;
        } else {
          delete updatedTag?.start;
          delete updatedTag?.["end"];
          delete updatedTag["sector"];
        }
        return updatedTag;
      }
      return tag;
    });

    if (updatedColumnTags?.length > 0) {
      const newDataIndexes = updatedColumnTags?.map((item) => item?.dataIndex);
      updatedColumnTags?.push(
        ...(screenerFilterList?.ratio_list
          ?.filter(
            (item) =>
              !["symbol", "sector"].includes(item.ratio_name) &&
              !newDataIndexes.includes(item.ratio_name)
          )
          ?.map((item) => {
            return getColumnToAdd(item.ratio_name);
          }) ?? [])
      );
      let a = updatedColumnTags;
      setColumnTags(updatedColumnTags);
    }
  }, [screenerFilterList]);

  useEffect(() => {
    if (prevScreenerFilterList.current !== screenerFilterList) {
      prevScreenerFilterList.current = screenerFilterList;
      const updatedColumnTags = columnTags.map((tag) => {
        const foundRatio = screenerFilterList?.ratio_list?.find(
          (item) => item.ratio_name === tag?.dataIndex
        );
        if (foundRatio) {
          const updatedTag = { ...tag };
          if (foundRatio.filter_type === "1" || foundRatio.filter_type === 1) {
            delete updatedTag?.["end"];
            updatedTag.start = foundRatio.start;
          } else if (
            foundRatio.filter_type === "2" ||
            foundRatio.filter_type === 2
          ) {
            delete updatedTag?.start;
            updatedTag["end"] = foundRatio.start;
          } else if (
            foundRatio.filter_type === "3" ||
            foundRatio.filter_type === 3
          ) {
            updatedTag.start = foundRatio.start;
            updatedTag["end"] = foundRatio.end;
          } else if (
            foundRatio.filter_type === "4" ||
            foundRatio.filter_type === 4
          ) {
            updatedTag["sector"] = foundRatio?.start;
          } else {
            delete updatedTag?.start;
            delete updatedTag?.["end"];
            delete updatedTag["sector"];
          }
          return updatedTag;
        }
        return tag;
      });
      if (updatedColumnTags?.length > 0) {
        setColumnTags(updatedColumnTags);
      }
    }
  }, [columnTags]);

  // save load
  const handleSaveScrennerClick = () => {
    setIsScreenerSaveModalOpen(true);
  };

  const cancleScreenerModal = () => {
    setIsScreenerSaveModalOpen(false);
  };

  const handleLoadScrennerClick = () => {
    if (isLoggedIn) {
      dispatch(actions.getAllSavedScrenner({ user_id: currentUser }));
    }
  };

  const submitSaveScrenner = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      const payload = {
        user_id: `${currentUser}`,
        name: screenerName,
        layout: JSON.stringify(screenerFilterList),
      };
      dispatch(actions.saveScrenner(payload));
      setIsScreenerSaveModalOpen(false);
      message.success("Screener save successfully.");
      const { name } = getAllSavedScreener.data.find(
        (item) => item.id === saveScreener.data.id
      );
      setScreenerName(name);
    } else {
      message.success("Login first to unlock this feature.");
    }
  };

  const updateScreener = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      const payload = {
        id: screenerByID.data
          ? screenerByID?.data[0]?.id
          : saveScreener.data[0],
        user_id: `${currentUser}`,
        name: screenerName,
        layout: JSON.stringify(screenerFilterList),
      };
      dispatch(actions.updateScreener(payload));

      setScreenerName(screenerName);
      setIsScreenerSaveModalOpen(false);
      message.success("Screener updated successfully.");
    } else {
      message.success("Login first to unlock this feature.");
    }
  };

  const handleInputChange = (event) => {
    setScreenerName(event.target.value);
  };

  useEffect(() => {
    if (getAllSavedScreener?.data?.length > 0) {
      const items = getAllSavedScreener?.data?.map(({ id, name }) => ({
        key: id,
        name: name,
      }));
      setDropDownItems(items);
    }
  }, [getAllSavedScreener]);

  useEffect(() => {
    handleLoadScrennerClick();
  }, [isLoggedIn, saveScreener]);

  const handleMenuItemClick = (e) => {
    const selectedItemKey = e.key;
    setDropdownChange(selectedItemKey);
    dispatch(actions.getSavedScrennerByID({ id: selectedItemKey }));
  };

  const handleDeleteItemClick = (e) => {
    const selectedItemKey = e.key;

    dispatch(actions.deleteScreenerById({ id: selectedItemKey }));
    message.success("Layout deleted successfully");
  };

  const menu = (
    <Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
      {isLoggedIn ? (
        <>
          {dropDownItems.length > 0 ? (
            dropDownItems.map((item) => (
              <Menu.Item key={item.key} className="flex ">
                <span onClick={() => handleMenuItemClick(item)}>
                  {item.name}
                </span>
                <Divider type="vertical" />
                <Button
                  onClick={() => handleDeleteItemClick(item)}
                  type="link"
                  danger
                  icon={<MdOutlineDelete />}
                  className="ml-auto"
                />
              </Menu.Item>
            ))
          ) : (
            <Menu.Item>
              <span>Please first save a layout to view layouts.</span>
            </Menu.Item>
          )}
        </>
      ) : (
        <Menu.Item>
          <span>Login first to view your layouts.</span>
        </Menu.Item>
      )}
    </Menu>
  );

  useEffect(() => {
    if (screenerByID?.data?.length > 0) {
      dispatch(setScreenerFilterList([]));
      setLoadedScreenerName(screenerByID?.data?.[0]?.name);
      setScreenerName(screenerByID?.data?.[0]?.name);
      const layoutObject = JSON.parse(screenerByID?.data?.[0]?.layout);
      dispatch(setScreenerFilterList(layoutObject));
      dispatch(actions.postScreenerV2(layoutObject));
    }
  }, [screenerByID, dropdownChange]);

  return (
    <>
      <div className="lg:mt-0 mt-[160px] bg-secondary">
        <div className=" w-full lg:px-10 py-12 px-4 mx-auto">
          <div className="flex justify-between items-center w-full gap-[4%]">
            <div
              className={`${
                oneLineShowHeight > 0 && "max-h-[60px]"
              } relative rounded-md py-[20px] px-[10px] border-[1px] bg-secondary w-[94%] overflow-hidden`}
            >
              <div className="flex gap-3 flex-wrap items-center cursor-pointer">
                {columnTags?.map((column, id) => {
                  return (
                    <>
                      {id !== 0 && (
                        <Space direction="vertical">
                          <Dropdown
                            overlay={() =>
                              topFilterMenu(
                                column?.dataIndex,
                                id,
                                removeColumn,
                                screenerFilterList,
                                columnTags
                              )
                            }
                            placement="bottomLeft"
                          >
                            <div
                              key={id}
                              className="flex items-center bg-secondary rounded-md border-[1px] py-1 px-2 !cursor-pointer"
                            >
                              <span className="text-gray-700 lg:text-sm text-2xl font-semibold mr-2 !cursor-pointer">
                                {column?.title} &nbsp;{" "}
                                {column?.start && column?.end ? (
                                  <span className="text-xs font-light !cursor-pointer">
                                    {" "}
                                    {column?.start} - {column?.end}{" "}
                                  </span>
                                ) : column?.start ? (
                                  <span className="text-xs font-light !cursor-pointer">
                                    above {column?.start}
                                  </span>
                                ) : column?.end ? (
                                  <span className="text-xs font-light !cursor-pointer">
                                    {" "}
                                    below {column?.end}
                                  </span>
                                ) : column?.sector ? (
                                  <span className="text-xs font-light !cursor-pointer">
                                    {" "}
                                    {column?.sector?.map((item, index) => (
                                      <span key={index}>{item} &nbsp; </span>
                                    ))}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </span>
                              {id !== 1 && <FaAngleDown />}
                            </div>
                          </Dropdown>
                        </Space>
                      )}
                    </>
                  );
                })}

                <div
                  className="cursor-pointer"
                  onClick={showModal}
                  title="Click to Add Filter"
                >
                  <IoMdAddCircleOutline className="lg:text-2xl text-5xl mx-3" />
                </div>
                <Modal
                  width={"70vw"}
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <div className="text-center w-full">
                    <h1 className="text-lg font-bold">Add Filter</h1>
                  </div>
                  <div
                    className={`${
                      oneLineShowHeight > 0 && "max-h-[60px]"
                    } w-full relative rounded-md mt-[20px] py-[20px] px-[10px] border-[1px] bg-secondary overflow-hidden`}
                  >
                    <div className="flex gap-3 flex-wrap items-center ">
                      {columnTags?.map((column, id) => {
                        return (
                          <>
                            {id !== 0 && id !== 1 && (
                              <>
                                <div
                                  key={id}
                                  className="flex items-center bg-secondary rounded-md border-[1px] py-1 px-2"
                                >
                                  <span className="text-gray-700 lg:text-sm text-xl font-semibold mr-2">
                                    {column?.title}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      removeChecked(column?.title);
                                      removeColumn(id);
                                    }}
                                    className="text-danger font-semibold focus:outline-none"
                                  >
                                    <svg
                                      className="h-4 w-4 fill-current"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fill-rule="ev enodd"
                                        d="M10 8.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95L4.636 14.5l4.95-4.95-4.95-4.95L5.05 3.636z"
                                        clip-rule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        );
                      })}
                    </div>
                    {oneLineShowHeight > 0 ? (
                      <div
                        className="cursor-pointer absolute right-[5px] bottom-[5px]"
                        onClick={() => {
                          handleMultiLineShowOption();
                        }}
                      >
                        <IoIosArrowDropdown className="lg:text-2xl text-5xl mx-3" />
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer absolute right-[5px] bottom-[5px]"
                        onClick={() => {
                          handleOneLineShowOption();
                        }}
                      >
                        <IoIosArrowDropup className="lg:text-2xl text-5xl mx-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex lg:gap-0 gap-4 justify-between items-center">
                    <SearchInput
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />

                    <div className="flex overflow-x-auto">
                      {filterMenu?.map((item, id) => (
                        <FilterNavButtons
                          key={id}
                          title={`${item?.name}`}
                          isActive={activeIndex === id}
                          onClick={() => handleButtonClick(id, item?.value)}
                          rounded="scrennerV2"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-[50vh] overflow-y-auto">
                    <ul className="flex py-3 flex-wrap gap-5 items-center">
                      {filteredRatios?.map((category) => (
                        <div key={category?.id}>
                          <h2 className="font-[600]">{category?.name}</h2>
                          <ul className="flex py-2 flex-wrap gap-5 items-center">
                            {category?.ratios?.map((ratio) => (
                              <li key={ratio.id}>
                                <div className="flex items-center">
                                  <label className="inline-flex cursor-pointer items-center">
                                    <input
                                      type="radio"
                                      className="form-radio lg:text-sm text-2xl"
                                      checked={chooseColumnTags?.some((tag) => {
                                        if (tag.name === ratio.ratio_name)
                                          return tag.checked;
                                      })}
                                      value={ratio?.ratio_name}
                                      onChange={() => {
                                        funcolumnTags(ratio);
                                      }}
                                    />
                                    <span className="ml-2 text-lg lg:text-sm">
                                      {ratio?.ratio_name}
                                    </span>
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </ul>
                  </div>
                </Modal>
              </div>
              {oneLineShowHeight > 0 ? (
                <div
                  className="cursor-pointer absolute right-[5px] bottom-[5px]"
                  onClick={() => {
                    handleMultiLineShowOption();
                  }}
                >
                  <IoIosArrowDropdown className="lg:text-2xl text-5xl mx-3" />
                </div>
              ) : (
                <div
                  className="cursor-pointer absolute right-[5px] bottom-[5px]"
                  onClick={() => {
                    handleOneLineShowOption();
                  }}
                >
                  <IoIosArrowDropup className="lg:text-2xl text-5xl mx-3" />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                className="bg-success hover:bg-success-2 text-secondary hover:text-secondary lg:px-[10px] lg:py-[4px] px-[10px] py-[10px] rounded-md 
                                lg:text-sm text-2xl font-poppins uppercase"
                onClick={handleSaveScrennerClick}
              >
                {isSavedOrLoadedScreener ? "Update" : "Save"}
              </button>
              <Modal
                width={"25vw"}
                open={isScreenerSaveModalOpen}
                onCancel={cancleScreenerModal}
                footer={[]}
              >
                <div className="w-full">
                  <h1 className="text-lg font-bold">
                    {isSavedOrLoadedScreener
                      ? "Update My Screener"
                      : "Save My Screener"}
                  </h1>
                  <form
                    className=" text-center"
                    onSubmit={
                      isSavedOrLoadedScreener
                        ? updateScreener
                        : submitSaveScrenner
                    }
                  >
                    <input
                      type="text"
                      placeholder="Screener Name"
                      className="w-full my-5 border-[2px] rounded-md px-2 py-2"
                      value={screenerName}
                      onChange={handleInputChange}
                    />
                    <button
                      className="bg-success hover:bg-success-2 text-secondary hover:text-secondary lg:px-[10px] lg:py-[4px] px-[10px] py-[10px] rounded-md 
                                        lg:text-sm text-2xl font-poppins uppercase"
                    >
                      {isSavedOrLoadedScreener ? "Update" : "Save"}
                    </button>
                  </form>
                </div>
              </Modal>
              <Space direction="vertical">
                <Dropdown overlay={menu} placement="bottomLeft">
                  <button
                    className="bg-[#D37B2A] hover:bg-[#D37B2A] text-secondary hover:text-secondary lg:px-[10px] lg:py-[4px] px-[10px] py-[10px] rounded-md 
                                            lg:text-sm text-2xl font-poppins uppercase"
                  >
                    Load
                  </button>
                </Dropdown>
              </Space>
            </div>
          </div>

          <div className="mt-[20px]">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold capitalize">
                {loadedScrennerName ? `${loadedScrennerName}'s` : ""} Screener
                Beta
              </h1>
              <p className="ml-10">
                {latestYear && (
                  <Tag color="cyan" className="px-2 py-1 lg:text-xs text-xl">
                    {" "}
                    as of {latestYear}{" "}
                  </Tag>
                )}
              </p>
            </div>
            <div className="relative">
              <CompanyList
                setColumnTags={setColumnTags}
                columnTags={columnTags}
              />
              {!loading && !isLoggedIn && (
                <button
                  className="absolute top-[45%] left-[60%] lg:left-[70%]
               bg-primary m-4 hover:bg-primary-2 font-serif lg:mt-8 w-44 
               lg:w-32 text-secondary rounded-full py-1 cursor-pointer 
               lg:text-sm text-2xl flex items-center justify-center"
                  onClick={() => {
                    router.push(`/login`);
                  }}
                >
                  Login
                  <span className="text-secondary text-3xl lg:text-xl ml-2">
                    <AiFillLock />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScrennerV2;
