import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const RotatingIcon = () => {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div
      className={`h-[20px] w-[20px]  bg-[#F0F0F0] rounded-full flex justify-center items-center cursor-pointer ${
        isRotated ? 'rotate-180' : ''
      }`}
      onClick={handleClick}
    >
      <RiArrowDropDownLine className='text-[18px]' />
    </div>
  );
};

export default RotatingIcon;