import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="relative flex items-center max-w-90 max-md:max-w-70 w-full bg-gray-500/20 h-6 rounded-full overflow-hidden max-md:mx-5">
      <div
        className="bg-linear-to-r from-[#afe706] to-[#ffff24] h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />

      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-black">
        {value}%
      </span>
    </div>
  );
};

export default ProgressBar;
