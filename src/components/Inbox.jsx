import React, { useState } from "react";
import DropdownMenu from "./DropDownMenu";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import { MdInbox } from "react-icons/md";
import { GoTag } from "react-icons/go";
import { FaUserFriends } from "react-icons/fa";

const mailType = [
  {
    icon: <MdInbox size={"20px"} />,
    text: "Primary",
  },
  {
    icon: <GoTag size={"20px"} />,
    text: "Promotions",
  },
  {
    icon: <FaUserFriends size={"20px"} />,
    text: "Social",
  },
];

const Inbox = () => {
  const [mailTypeSelected, setMailTypeSelected] = useState(0);

  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-gray-700 py-2">
          <div className="flex items-center gap-1">
            <DropdownMenu />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer hover:rotate-12">
            <IoMdRefresh size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <IoMdMore size={"20px"} />
          </div>
        </div>
      </div>
      <div className="h-[75vh] overflow-y-auto">
        <div className="flex items-center gap-1">
          {mailType.map((item, index) => {
            return (
              <button
                key={item.text}
                className={`${
                  mailTypeSelected === index
                    ? "border-b-4 border-b-blue-600 text-blue-600"
                    : ""
                } flex items-center p-4 gap-5 w-52 hover:bg-gray-100`}
                onClick={() => setMailTypeSelected(index)}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
