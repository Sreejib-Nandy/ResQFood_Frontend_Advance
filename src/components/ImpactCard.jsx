import React from 'react'

const ImpactCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>

      <span className="text-xl md:text-2xl font-semibold mt-1">
        {value ?? 0}
      </span>
    </div>
  );
};

export default ImpactCard
