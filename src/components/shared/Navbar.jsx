import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiCircleQuestion } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import Avatar from "react-avatar";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between mx-3 h-16">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6">
          <div className="p-3 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out">
            <RxHamburgerMenu size={"20px"} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              className="w-7"
              src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png"
              alt="gmail-logo"
            />
            <h1 className="text-2xl text-grey-500 font-normal">Gmail</h1>
          </div>
        </div>
      </div>
      <div className="md:block hidden w-[50%]">
        <div className="flex items-center bg-[#EAF1FB] px-1 py-1 rounded-full focus-within:bg-white">
          <div className="flex items-center w-9 h-9 justify-center rounded-full hover:bg-gray-300 cursor-pointer transition-all duration-200 ease-in-out">
            <IoIosSearch size={"22px"} className="text-gray-700" />
          </div>
          <input
            type="search"
            placeholder="Search Mail"
            className="rounded-full w-full bg-transparent outline-none px-1 placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="md:block hidden">
        <div className="flex items-center gap-2">
        <div className="p-3 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out">
            <CiCircleQuestion size={"22px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-1000 ease-in-out hover:rotate-90">
            <IoSettingsOutline size={"22px"} />
          </div>
          <div className="p-3 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out">
            <TbGridDots size={"22px"} />
          </div>
          <div className="cursor-pointer rounded-full hover:scale-110 bg-gray-200 transition-all duration-1000 ease-in-out">
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7oMra0QkSp_Z-gShMOcCIiDF5gc_0VKDKDg&s"
              size="35"
              round={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
