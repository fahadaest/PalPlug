import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const RotatingIcon = ({ isRotated }) => {
  return (
    <div
      className={`h-[20px] w-[20px] bg-[#F0F0F0] rounded-full flex justify-center items-center transition-transform duration-200 ${
        isRotated ? 'rotate-180' : ''
      }`}
    >
      <RiArrowDropDownLine className="text-[18px]" />
    </div>
  );
};

export default RotatingIcon;