import React, { useEffect } from "react";
import Messages from "../components/Mail/Messages";
import { useDispatch } from "react-redux";
import { setSelectedMailPath } from "../redux/navSlice";
import UiEmailTypeBody from "../components/UI/UiEmailTypeBody";

const Inbox = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedMailPath("inbox"));
  }, [])

  return (
     <div className="flex-1 bg-white/70 rounded-xl mx-5">
      <UiEmailTypeBody/>
      <div className="h-[75vh] overflow-y-auto">
        <Messages />
      </div>
    </div>
  );
};

export default Inbox;
