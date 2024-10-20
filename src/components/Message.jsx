import React from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Message = () => {
    const navigate = useNavigate();
    const openMail = () => {
        navigate("/inbox/934r439r43ir");
    }
  return (
    <div onClick={openMail} className="flex items-start justify-between bordrd-b border-gray-200 px-4 py-2 text-sm cursor-pointer hover:shadow-md">
        <div className="flex items-center gap-3">
            <div className="flex-none text-gray-300">
                <MdCropSquare className="w-5 h-5" /> 
                {/* {improve} */}
            </div>
            <div className="flex-none text-gray-300">
                <RiStarLine className="w-5 h-5" />
            </div>
        </div>
        <div className="flex-1 ml-4">
            <p className="text-gray-600 truncate inline-block max-w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis vitae sit beatae eius assumenda hic!</p>
        </div>
        <div className="flex-none text-gray-400 text-sm">
            time ayega
        </div>
    </div>
  );
};

export default Message;
