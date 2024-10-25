import React from "react";
import { BiSolidInbox } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDrafts, MdOutlineKeyboardArrowDown, MdOutlineWatchLater } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { setOpen } from "../../redux/appSlice";

const sideBarItems = [
  { icon: <BiSolidInbox size={"20px"} />, text: "Inbox" },
  { icon: <IoMdStar size={"20px"} />, text: "Starred" },
  { icon: <MdOutlineWatchLater size={"20px"} />, text: "Snoozed" },
  { icon: <TbSend2 size={"20px"} />, text: "Sent" },
  { icon: <MdOutlineDrafts size={"20px"} />, text: "Drafts" },
  { icon: <MdOutlineKeyboardArrowDown size={"20px"} />, text: "More" }
];

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-[12%]">
      <div className="p-3 pt-1">
        <button onClick={() => dispatch(setOpen(true))} className="flex items-center gap-2 p-4 rounded-2xl hover:shadow-md hover:scale-105 bg-[#C2E7FF] transition-all duration-200 ease-in-out active:scale-95">
          <LuPencil size={"20px"} />
          Compose
        </button>
      </div>
      <div className="text-gray-500">
        {sideBarItems.map((item, index) => {
          return (
            <div key={Math.random()} className="flex items-center gap-4 pl-6 py-1 rounded-r-full cursor-pointer hover:bg-teal-100 my-2 transition-all duration-200 ease-in-out">
              {item.icon}
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
