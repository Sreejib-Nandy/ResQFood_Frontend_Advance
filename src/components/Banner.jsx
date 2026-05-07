import React from "react";

const Banner = () => {
  return (
    <div className="fixed max-lg:top-18 max-xl:top-0 left-0 w-full py-2.5 font-medium text-sm max-md:text-xs text-center bg-linear-to-r from-[#ff0000] to-[#FDFEFF] z-20">
      <p className="text-black">
        <span className="px-3 py-1 rounded-md text-rose-600 bg-white mr-2">
          Notice
        </span>
        Your plan has expired. Upgrade to continue
      </p>
    </div>
  );
};

export default Banner;
