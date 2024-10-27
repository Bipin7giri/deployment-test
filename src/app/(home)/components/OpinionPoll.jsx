"use client";
import { Progress, Radio, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions";
import api from "@/api/axios";

const OpinionPoll = () => {
  const { opinionQuestion, loading, updatedPollOptions } = useSelector(
    (state) => state.home
  );
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [poll, setPoll] = useState({});

  //fetch poll question
  useEffect(() => {
    dispatch(actions.getOpinionQuestion());
  }, []);

  //store poll question to the local state
  useEffect(() => {
    if (opinionQuestion) {
      setPoll(opinionQuestion);
    }
  }, [opinionQuestion]);

  // update the poll when updated poll changes (when user click on options)
  useEffect(() => {
    if (updatedPollOptions.length > 0) {
      setPoll((prevPoll) => ({ ...prevPoll, options: updatedPollOptions }));
    }
  }, [updatedPollOptions]);

  // disptach and call vote opinion call function when user click on any options
  const handleChange = async (e) => {
    try {
      if (!isSelected) {
        const data = {
          id: opinionQuestion?.id,
          value: e.target.value,
        };
        dispatch(actions.voteOpinionPoll(data));
        setValue(e.target.value);
        setIsSelected(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-secondary rounded-xl p-8 shadow-md max-h-[400px] overflow-auto">
      <h2 className="lg:text-2xl text-[28px] font-semibold">Opinion Poll</h2>
      {!loading ? (
        <div>
          <h4 className="lg:text-lg text-[22px] font-semibold mb-4 mt-6">{poll?.question}</h4>
          <Radio.Group
            onChange={handleChange}
            value={value}
            className="flex flex-col items-start lg:gap-4 gap-6 text-lg font-medium"
          >
            {poll?.options?.map((item, id) => (
              <div className="w-full" key={id}>
                <Radio value={item.value} className="lg:text-base text-[22px]">{item.label}</Radio>
                {isSelected && <Progress percent={item.votePercentage} className="lg:text-base text-[22px]" />}
              </div>
            ))}
          </Radio.Group>
        </div>
      ) : (
        <Skeleton paragraph={{ rows: 3 }} style={{ width: "100%" }} />
      )}
    </div>
  );
};

export default OpinionPoll;
