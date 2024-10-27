"use client";
import actions from "@/app/(home)/redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaralPickTable from "./SaralPickTable";

const SaralPick = () => {
  const dispatch = useDispatch();
  const { saralPickData } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(actions.getSaralPickData());
  }, []);
  return (
    <section className="py-10 px-8 lg:mt-0 mt-44">
      <h2 className="lg:text-xl text-[24px] font-semibold mb-4">Saral Pick</h2>
      <SaralPickTable data={saralPickData} />
    </section>
  );
};

export default SaralPick;
