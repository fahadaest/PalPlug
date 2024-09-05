import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const RotatingIcon = () => {
  const [isMoving, setIsMoving] = useState(false);

  const handleClick = () => {
    setIsMoving(!isMoving);
  };

  return (
    <div
      className={`h-[18px] w-[18px]  border-[#555555] bg-[#F0F0F0] rounded-full flex justify-center items-center cursor-pointer ${
        isMoving ? 'animate-rotate360 ' : ''
      }`}
      onClick={handleClick}
    >
      <RiArrowDropDownLine className='text-[19px]' />
    </div>
  );
};

export default RotatingIcon;