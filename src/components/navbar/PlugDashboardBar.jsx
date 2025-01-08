import { useEffect, useRef } from 'react';
import Image from 'next/image';
import StepperArrow from "@/assets/images/StepperArrow.svg";

const PlugDashboardBar = () => {
    return (
      <div className="w-full h-full justify-start items-start inline-flex">
        <div className="w-[140px] h-[66px] pl-4 pr-4 pt-2 pb-2 bg-white justify-center items-center gap-2 flex">
          <div className="flex-col justify-center items-center gap-1 inline-flex">
            <div className="text-[#555555] text-[14px] font-[Poppins] font-semibold leading-[14px] break-words">
              Dashboard
            </div>
          </div>
        </div>
        <div className="w-[159px] h-[66px] pl-4 pr-4 pt-2 pb-2 bg-white justify-center items-center gap-2 flex">
          <div className="text-[#555555] text-[14px] font-[Poppins] font-semibold leading-[14px] break-words">
            My Business
          </div>
          <div className="w-4 h-4 relative">
            <div className="w-4 h-4 absolute bg-[#b12d2d] rounded-full" />
            <div
              className="absolute w-[5.2px] h-[2.6px] left-[5.2px] top-[7.2px]"
              style={{ border: "2px solid #555555" }}
            ></div>
          </div>
        </div>
        <div className="w-[159px] h-[66px] pl-4 pr-4 pt-2 pb-2 bg-white justify-center items-center gap-2 flex">
          <div className="text-[#555555] text-[14px] font-[Poppins] font-semibold leading-[14px] break-words">
            Analytics
          </div>
          <div className="w-4 h-4 relative">
            <div className="w-4 h-4 absolute bg-[#F0F0F0] rounded-full" />
            <div
              className="absolute w-[5.2px] h-[2.6px] left-[5.2px] top-[7.2px]"
              style={{ border: "2px solid #555555" }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PlugDashboardBar;
  