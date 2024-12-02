import React, { useState } from "react";
import { MdCropSquare, MdLabelImportantOutline } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStripHTML } from "../hooks/useStripHTML";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const Message = ({ email, index }) => {
  const selectedMailPath = useSelector(
    (state) => state.navSlice.selectedMailPath
  );
  const navigate = useNavigate();

  const [selectSquare, setSelectSquare] = useState(false); // for selecting a particular box
  const [selectStarred, setSelectStarred] = useState(false); // for selecting starred box

  const handleSelectedEmail = (event) => {
    event.stopPropagation()
    setSelectSquare(!selectSquare);
  }

  const handleSelectedStarredEmail = async (event) => {
    event.stopPropagation()
    const starredStatus = email?.starred ? false : true;
    try {
      await updateDoc(doc(db, "emails", email.id),{
        starred: starredStatus
      })

    } catch (error) {
      toast.error(error.message);
    }
    // setSelectStarred(!selectStarred);
  }

  const openMail = () => {
    navigate(`/${selectedMailPath}/${email.id}`);
  };

  return (
    <div
      onClick={openMail}
      style={{ "--delay": `${index * 100}ms` }}
      className="flex items-center justify-between border-b border-gray-200 px-4 text-sm cursor-pointer hover:bg-rose-300/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out animate-slideUp opacity-0 [animation-delay:var(--delay)]"
    >
      <div className="flex items-center gap-3">
        <div className="flex-none text-gray-300 px-1 py-2" onClick={handleSelectedEmail} >
          {selectSquare ? <IoMdCheckboxOutline className="w-5 h-5 text-teal-400" />:<MdCropSquare className="w-5 h-5" />}
          {/* {improve} */}
        </div>
        <div className="flex-none text-gray-300 px-1 py-2" onClick={handleSelectedStarredEmail}>
        {email?.starred ? <RiStarSFill className="w-5 h-5 text-teal-400" />:<RiStarLine className="w-5 h-5" />}
        </div>
      </div>
      <div className="flex-1 ml-4 flex items-center gap-6">
        <p className="text-black font-bold w-64">{(selectedMailPath !== "sent" && email?.from) || (selectedMailPath === "sent" && email?.to)}</p>
        <p className="text-gray-600 truncate inline-block w-[50rem]">
          <strong>{email?.subject}</strong>-{useStripHTML(email?.message)}
        </p>
      </div>
      <div className="flex-none text-gray-400 text-sm">
        <p>{email?.createdAt}</p>
      </div>
    </div>
  );
};

export default Message;
