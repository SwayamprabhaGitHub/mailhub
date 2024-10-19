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
      <div className="flex items-center gap-2">
        <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
          <RxHamburgerMenu size={"20px"} />
        </div>
        <img className="w-8" src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="gmail-logo"/>
        <h1 className="text-2xl text-grey-500 font-medium">Gmail</h1>
      </div>
    </div>
    <div className="md:block hidden w-[50%] mr-60">
        <div className="flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full">
        <IoIosSearch size={"24px"} className="text-gray-700" />
        <input type="search"
        placeholder="Search Mail"
        className="rounded-full w-full bg-transparent outline-none px-1"
          />
        </div>
    </div>
    <div className="md:block hidden">
        <div className="flex items-center gap-2">
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                <CiCircleQuestion size={"20px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                <IoSettingsOutline size={"20px"} />
            </div>
            <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer">
                <TbGridDots size={"20px"} />
            </div>
            <div className="cursor-pointer">
                <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7oMra0QkSp_Z-gShMOcCIiDF5gc_0VKDKDg&s" size="40" round={true} />
            </div>
        </div>
    </div>
  </div>
    )
  
};

export default Navbar;
