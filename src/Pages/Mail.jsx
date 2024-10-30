import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { IoMdArrowBack, IoMdMore } from "react-icons/io";
import {
  MdDeleteOutline,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineAddTask,
  MdOutlineDriveFileMove,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
  MdOutlineWatchLater,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";

const Mail = () => {
  const selectedMailPath = useSelector((state) => state.navSlice.selectedMailPath);
  const emails = useSelector((state) => state.appSlice.emails);
  const navigate = useNavigate();
  const params = useParams();

  //finding the selected email
  const selectedEmail = emails.find((email) => {
    return email.id === params.id;
  });

  //deleting the selected email by using delete button
  const deleteMailById = async (id) => {
    try {
      await deleteDoc(doc(db, "emails", id));
      navigate(`/${selectedMailPath}`); // Navigate after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedEmail) {
      // If the selected email does not exist, navigate to inbox
      navigate(`/${selectedMailPath}`);
    }
  },[selectedEmail,navigate])


  const handleArrowBack = () => {
    navigate(`/${selectedMailPath}`);
  };
  const iconsButton = [
    { icon: <IoMdArrowBack size={"20px"} />, function: handleArrowBack },
    { icon: <BiArchiveIn size={"20px"} /> },
    { icon: <MdOutlineReport size={"20px"} /> },
    {
      icon: <MdDeleteOutline size={"20px"} />,
      function: () => deleteMailById(params.id),
    },
    { icon: <MdOutlineMarkEmailUnread size={"20px"} /> },
    { icon: <MdOutlineWatchLater size={"20px"} /> },
    { icon: <MdOutlineAddTask size={"20px"} /> },
    { icon: <MdOutlineDriveFileMove size={"20px"} /> },
    { icon: <IoMdMore size={"20px"} /> },
  ];

  if(!selectedEmail) {
    return null
  }

  return (
    <div className="flex-1 bg-white/70 rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1 text-gray-700 py-2">
          {iconsButton.map((item, index) => {
            return (
              <div
                key={index}
                onClick={item.function}
                style={{ '--delay': `${index * 300}ms` }}
                className="p-2 rounded-full hover:bg-teal-300/30 cursor-pointer transition-all duration-1000 ease-in-out animate-slideIn opacity-0 [animation-delay:var(--delay)]"
              >
                {item.icon}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 animate-slideIn">
          <button className="rounded-full p-1 hover:bg-teal-300/30 transition-all duration-200 ease-in-out">
            <MdKeyboardArrowLeft size={"24px"} />
          </button>
          <button className="rounded-full p-1 hover:bg-teal-300/30 transition-all duration-200 ease-in-out">
            <MdKeyboardArrowRight size={"24px"} />
          </button>
        </div>
      </div>
      <div className="h-[75vh] overflow-y-auto p-4 animate-fadeIn">
        <div className="flex items-center justify-between bg-transparent gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium">{selectedEmail.subject}</h1>
            <span className="text-sm bg-gray-200 rounded-md px-2">inbox</span>
          </div>
          <div className="flex-none text-gray-500 my-5 text-sm">
            <p>{selectedEmail.createdAt}</p>
          </div>
        </div>
        <div className="text-gray-600 text-sm">
          <h1>{selectedEmail.to}</h1>
          <span>to me</span>
        </div>
        <div className="my-10 custom-list">
          <div
            className="formatted-content"
            dangerouslySetInnerHTML={{ __html: selectedEmail.message }}
          ></div>

          {/* <p>{selectedEmail.message}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Mail;
