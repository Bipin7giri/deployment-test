"use client";
import { Checkbox, Input, InputNumber, Select, Slider } from "antd";
import { useEffect, useState } from "react";
import { RiCheckFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../_redux/action";
import { setScreenerFilterList } from "../../_redux/toolsSlice";
import api from "../../../../api/axios";
const { Option } = Select;

export const CreateFilterDropdown = (
  { setSelectedKeys, confirm },
  dataIndex
) => {

  const { screenerFilterList } = useSelector((state) => state.tools);
  const dispatch = useDispatch();

  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState(0);
  const [filterMinValue, setFilterMinValue] = useState(0);
  const [filterMaxValue, setFilterMaxValue] = useState(0);

  const handleApplyFilter = () => {
    if (filterKey !== "3") {
      const index = screenerFilterList.ratio_list?.findIndex(
        (item) => item.ratio_name === dataIndex
      );
      if (index !== -1) {
        const updatedRatioList = [...screenerFilterList?.ratio_list];
        const currentItem = updatedRatioList[index];
        if (currentItem && currentItem.hasOwnProperty("end")) {
          const { end, ...rest } = currentItem;
          updatedRatioList[index] = {
            ...rest,
            filter_type: filterKey,
            start: filterValue,
          };
          const updatedScreenerFilterList = {
            ...screenerFilterList,
            ratio_list: updatedRatioList,
          };
          dispatch(actions.postScreenerV2(updatedScreenerFilterList));
          dispatch(setScreenerFilterList(updatedScreenerFilterList));
        } else {
          const { end, ...rest } = currentItem;
          updatedRatioList[index] = {
            ...rest,
            filter_type: filterKey,
            start: filterValue,
          };
          const updatedScreenerFilterList = {
            ...screenerFilterList,
            ratio_list: updatedRatioList,
          };
          dispatch(actions.postScreenerV2(updatedScreenerFilterList));
          dispatch(setScreenerFilterList(updatedScreenerFilterList));
        }
      }
    } else if (filterKey === "3") {
      const index = screenerFilterList?.ratio_list.findIndex(
        (item) => item.ratio_name === dataIndex
      );
      if (index !== -1) {
        const updatedRatioList = [...screenerFilterList?.ratio_list];
        updatedRatioList[index] = {
          ...updatedRatioList[index],
          filter_type: filterKey,
          start: filterMinValue,
          end: filterMaxValue,
        };
        const updatedScreenerFilterList = {
          ...screenerFilterList,
          ratio_list: updatedRatioList,
        };
        dispatch(actions.postScreenerV2(updatedScreenerFilterList));
        dispatch(setScreenerFilterList(updatedScreenerFilterList));
      }
    } else {
      // do nothing
    }

    confirm();
    setSelectedKeys(filterKey[0]);
  };

  const handleInputChange = (value) => {
    setFilterValue(parseInt(value));
  };

  const handleMinInputChange = (value) => {
    setFilterMinValue(value);
  };

  const handleMaxInputChange = (value) => {
    setFilterMaxValue(value);
  };

  return (
    <>
      <div className="p-[14px]">
        <div className="flex justify-between">
          <h5 className="capitalize text-md font-[500]">{dataIndex}</h5>
          <div className="cursor-pointer">
            {filterKey && (
              <button
                className="lg:text-xs text-xxs mx-1 text-info font-[600] border border-info px-1 py-0.5 flex items-center space-x-1 cursor-pointer"
                onClick={handleApplyFilter}
              >
                <span>Apply Filter</span>
                <RiCheckFill className="text-green-500 lg:text-sm text-xs" />
              </button>
            )}
          </div>
        </div>
        <div className="p-[8px] flex justify-between gap-4">
          <div>
            <Select
              className="mb-[8px] w-[130px]"
              placeholder="Select filter"
              onChange={(value) => setFilterKey(value)}
            >
              <Option key="1">Above</Option>
              <Option key="2">Below</Option>
              <Option key="3">Between</Option>
            </Select>
          </div>
          {filterKey && (
            <>
              {filterKey === "3" && (
                <div className="flex gap-2">
                  <Input
                    className="w-[130px]"
                    placeholder="Min"
                    onChange={(e) => handleMinInputChange(e.target.value)}
                  />
                  <Input
                    className="w-[130px]"
                    placeholder="Max"
                    onChange={(e) => handleMaxInputChange(e.target.value)}
                  />
                </div>
              )}
              {filterKey !== "3" && (
                <Input
                  className="w-[130px]"
                  placeholder="Enter value"
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export const CreateMarketCapFilterDropdown = (
  { setSelectedKeys, selectedKeys, confirm, clearFilters },
  dataIndex
) => {
  const { screenerFilterList } = useSelector((state) => state.tools);
  const dispatch = useDispatch();
  const [highMC, setHighMC] = useState(0);
  const [priceRange, setPriceRange] = useState([0, highMC]);
  const [postpriceRange, setpostPriceRange] = useState([0, 204793079]);

  const [isSliderUpdate, setIsSliderUpdate] = useState(false);

  const handlePriceChnage = (value) => {
    setPriceRange(value);
  };

  const handlePostPriceChange = (value) => {
    setpostPriceRange(value);
  };

  const handlePriceInputNumberChange = (value, index) => {
    const newRange = [...priceRange];
    newRange[index] = value;
    setpostPriceRange(newRange);
    setPriceRange(newRange);
  };
  const [filterValue, setFilterValue] = useState("");

  const handleApplyFilter = () => {
    if (priceRange) {
      const index = screenerFilterList?.ratio_list.findIndex(
        (item) => item.ratio_name === dataIndex
      );
      if (index !== -1) {
        const updatedRatioList = [...screenerFilterList?.ratio_list];
        updatedRatioList[index] = {
          ...updatedRatioList[index],
          filter_type: 3,
          start: parseInt(priceRange[0]),
          end: parseInt(priceRange[1]),
        };
        const updatedScreenerFilterList = {
          ...screenerFilterList,
          ratio_list: updatedRatioList,
        };
        dispatch(actions.postScreenerV2(updatedScreenerFilterList));
        dispatch(setScreenerFilterList(updatedScreenerFilterList));
      }
    }
    confirm();
    setSelectedKeys(filterValue[0]);
  };

  useEffect(() => {
    if (dataIndex) {
      setIsSliderUpdate(true);
      setHighMC(184793079);
    }
  }, [dataIndex]);

  return (
    <>
      <div className="p-[14px] max-w-[50vw]">
        <div className="flex justify-between">
          <h5 className="capitalize text-md font-[500]">{dataIndex}</h5>
          <div className="cursor-pointer">
            {priceRange && (
              <button
                className="lg:text-xs text-xxs mx-1 text-info font-[600] border border-info px-1 py-0.5 flex items-center space-x-1 cursor-pointer"
                onClick={handleApplyFilter}
              >
                <span>Apply Filter</span>
                <RiCheckFill className="text-green-500 lg:text-sm text-xs" />
              </button>
            )}
          </div>
        </div>
        <div className="p-[8px] flex justify-between gap-4">
          {isSliderUpdate && highMC > 0 && (
            <div className="mt-[12px] ">
              <div>
                <Slider
                  trackStyle={{ height: "8px" }}
                  style={{ height: "20px" }}
                  range={{ draggableTrack: true }}
                  value={priceRange[1] > 0 ? priceRange : [0, highMC]}
                  onChange={handlePriceChnage}
                  onAfterChange={handlePostPriceChange}
                  min={0}
                  max={highMC + 1}
                />
              </div>
              <div className="flex justify-center gap-10">
                <InputNumber
                  min={0}
                  max={highMC + 1}
                  style={{ fontSize: "14px", textAlign: "center" }}
                  value={priceRange[0]}
                  onChange={(value) => handlePriceInputNumberChange(value, 0)}
                />
                <InputNumber
                  min={0}
                  max={highMC + 1}
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    width: "5vw",
                  }}
                  value={priceRange[1] > 0 ? priceRange[1] : highMC}
                  className="centered-input-number"
                  onChange={(value) => handlePriceInputNumberChange(value, 1)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export const CreateSectorDropdown = (
  { setSelectedKeys, selectedKeys, confirm, clearFilters },
  dataIndex
) => {
  const { screenerFilterList } = useSelector((state) => state.tools);
  const [sectorList, setSectorList] = useState([]);
  const [sectorLoading, setSectorLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [checkedSectorArray, setCheckedSectorArray] = useState([]);

  const dispatch = useDispatch();

  const handleApplyFilter = () => {
    if (value?.length > 0) {
      const upperCaseValues = value?.map((item) => item?.toUpperCase());
      const sectorsRatio = {
        id: 1,
        ratio_name: "Sectors",
        filter_type: 4,
        start: upperCaseValues,
      };
      let updatedList = { ...screenerFilterList };
      if (Array.isArray(updatedList?.ratio_list)) {
        const filteredList = updatedList.ratio_list?.filter(
          (item) => item?.ratio_name !== "Sectors"
        );
        updatedList.ratio_list = [...filteredList, sectorsRatio];
      } else {
        updatedList.ratio_list = [sectorsRatio];
      }

      dispatch(actions.postScreenerV2(updatedList));
      dispatch(setScreenerFilterList(updatedList));
    }
    confirm();
  };

  useEffect(() => {
    setValue(checkedSectorArray);
  }, [checkedSectorArray]);

  useEffect(() => {
    if (screenerFilterList?.ratio_list?.length > 0) {
      const sectorsItem = screenerFilterList?.ratio_list?.find(
        (item) => item.ratio_name === "Sectors" && item.filter_type === 4
      );
      const sectorArray = sectorsItem ? sectorsItem?.start : [];
      setCheckedSectorArray(sectorArray);
    }
    if (checkedSectorArray?.length > 0) {
      setValue(checkedSectorArray);
    }
  }, [screenerFilterList]);

  // fetch sectors
  const fetchSectors = async () => {
    try {
      setSectorLoading(true);
      const res = await api.post(`/report/getAllSectors`);
      if (res) {
        let tempList = res?.data?.data?.filter(
          (item, id) => item?.sector_name !== "Mutual Fund"
        );
        setSectorList(tempList);
        setSectorLoading(false);
      }
    } catch (error) {
      setSectorLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setValue((prevCheckedValues) => [...prevCheckedValues, value]);
    } else {
      setValue((prevCheckedValues) =>
        prevCheckedValues.filter((item) => item !== value)
      );
    }
  };

  return (
    <>
      <div className="p-[7px] w-full flex flex-col">
        <div className="flex justify-between">
          <h5 className="capitalize text-md font-[500]">{dataIndex}</h5>
          <div className="cursor-pointer">
            {value?.length > 0 ? (
              <button
                className="lg:text-xs text-xxs mx-1 text-info font-[600] border border-info px-1 py-0.5 flex items-center space-x-1 cursor-pointer"
                onClick={handleApplyFilter}
              >
                <span>Apply Filter</span>
                <RiCheckFill className="text-green-500 lg:text-sm text-xs" />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p-[8px] flex justify-between gap-4">
          {sectorList?.length > 0 ? (
            <div className="flex flex-col">
              {sectorList?.map((sector, id) => {
                const caseToCheck = sector?.sector_name?.toUpperCase();
                return (
                  <div className="mt-[4px]" key={id}>
                    <Checkbox
                      value={caseToCheck}
                      onChange={onChange}
                      checked={value?.includes(caseToCheck)}
                    >
                      {sector.sector_name}
                    </Checkbox>
                  </div>
                );
              })}
            </div>
          ) : (
            "no data found"
          )}
        </div>
      </div>
    </>
  );
};
