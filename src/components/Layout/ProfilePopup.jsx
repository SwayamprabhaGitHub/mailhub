import React from "react";
import { RxCross1 } from "react-icons/rx";

const ProfilePopup = ({ isOpen, onClose, onLogout, onProfile }) => {
  if (!isOpen) return null;

  return (
    //e.stopPropagation() prevents the event from bubbling up to parent elements. This means that any other event listeners on parent elements won't be triggered.
    <div 
      className="absolute right-4 top-16 z-50 w-80"
      onClick={e => e.stopPropagation()}
    >
      {/* Glass effect container */}
      <div className="backdrop-blur-sm bg-white/90 rounded-lg shadow-xl border border-teal-100 overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1 bg-gradient-to-r from-teal-400 via-rose-300 to-purple-400" />
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Options</h2>
          
          <div className="flex flex-col space-y-3">
            <button
              onClick={onProfile}
              className="w-full px-4 py-2.5 text-gray-700 bg-teal-100 rounded-lg
                hover:bg-teal-200 transition-all duration-300 ease-in-out
                focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              User Profile
            </button>
            
            <button
              onClick={onLogout}
              className="w-full px-4 py-2.5 text-gray-700 bg-rose-100 rounded-lg
                hover:bg-rose-200 transition-all duration-300 ease-in-out
                focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Close button with hover effect */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center
            text-gray-950 hover:text-white rounded-full
            hover:bg-red-500/80 transition-all duration-300"
        >
          <RxCross1 />
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;