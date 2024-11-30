import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMailPath } from "../redux/navSlice";
import Messages from "../components/Mail/Messages";
import UiEmailTypeBody from "../components/UI/UiEmailTypeBody";

const AllMails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedMailPath("allmails"));
  }, [dispatch]);

  return (
    <div className="flex-1 bg-white/70 rounded-xl mx-5">
      <UiEmailTypeBody/>
      <div className="h-[75vh] overflow-y-auto">
        <Messages />
      </div>
    </div>
  );
};

export default AllMails;
