import React from "react";

const Card = ({ children, className }) => {
    console.log("card")
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-slate-100">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-lg animate-[blob_7s_infinite]" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-lg animate-[blob_7s_infinite_2s]" />
          <div className="absolute -bottom-4 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-lg animate-[blob_7s_infinite_4s]" />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/30 via-transparent to-rose-500/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/50 via-transparent to-slate-300/50" />
      </div>
      {children}
      
    </div>
  );
};

export default Card;
