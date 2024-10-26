import React from "react";
import Sidebar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Layout/Navbar";
import Card from "../components/UI/Card";

const Body = () => {
  const showSidebar = useSelector((state) => state.appSlice.showSidebar);
  return (
    <Card>
    <div className="bg-gradient-to-br from-white/100 via-transparent to-white/10 h-screen w-screen overflow-hidden z-10">
      <Navbar />
      <div className="flex">
        {/* Adjust the width and overflow */}
        <div
          className={`transition-all duration-1000 ease-in-out ${
            showSidebar ? "w-[13%]" : "w-0 overflow-hidden"
          }`}
        >
          <Sidebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
    </Card>
  );
};

export default Body;
