import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedMailPath } from "../redux/navSlice";
import Messages from "../components/Mail/Messages";
import UiEmailTypeBody from "../components/UI/UiEmailTypeBody";

const Sent = () => {
  const dispatch = useDispatch();
  const [noOfMailOnCurrPage, setNoOfMailOnCurrPage] = useState(0); // this is for the pagination

  useEffect(() => {
    dispatch(setSelectedMailPath("sent"));
  }, [dispatch])

  return (
     <div className="flex-1 bg-white/70 rounded-xl mx-5">
      <UiEmailTypeBody setNoOfMailOnCurrPage={setNoOfMailOnCurrPage} noOfMailOnCurrPage={noOfMailOnCurrPage}/>
      <div className="h-[75vh] overflow-y-auto">
      <Messages noOfMailOnCurrPage={noOfMailOnCurrPage} />
      </div>
    </div>
  );
};

export default Sent;
