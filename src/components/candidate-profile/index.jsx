'use client'; 

import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import Image from 'next/image';
import Done from "@/assets/images/Done.svg";
import User from "@/assets/images/user11.svg";
import Docuemnt from "@/assets/images/document-checkmark.svg";
import User_message from "@/assets/images/users-message-support.svg";
import { setPlugRoute } from '@/app/redux/slice/user/userSlice'; 
import { useRouter } from 'next/navigation'; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter(); 
  const user = useSelector((state) => state.user.user); // Get user from Redux state
  const userId = user?.id || user?.uid; // Get userId or uid from the user object

  const handleGetStartedClick = () => {
    dispatch(setPlugRoute(false)); 
    router.push(`/profile/${userId}`); // Use userId for routing
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row min-h-screen p-5 lg:p-10 gap-8">
      {/* Profile Information */}
      <div className="flex flex-col">
        <div className="bg-white p-4 md:p-6 border rounded-lg h-auto md:h-[248px] w-full md:w-[363px]">
          <div className="flex items-center h-[50px] mb-1 w-full md:w-[206px]">
            <div className="w-[44px] h-[44px] bg-[#D9D9D9] rounded-full"></div>
            <div className="ml-4">
              <h2 className="text-[14px] md:text-[16px] font-semibold leading-tight">{user?.displayName}</h2>
              <p className="text-[12px] md:text-[14px]">@{user?.username}</p>
            </div>
          </div>
          <div className='pl-2'>
            <h3 className="text-[#555555] font-semibold text-sm md:text-lg mb-2">Verified info</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] md:text-[16px] font-normal text-[#555555]">Email Address</span>
              <Image src={Done} alt="Done" height={24} width={24} />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] md:text-[16px] font-normal text-[#555555]">Phone Number</span>
              <Image src={Done} alt="Done" height={24} width={24} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] md:text-[16px] font-normal text-[#555555]">LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[361px] pl-4">
          <p className="font-light text-xs md:text-[14px] leading-tight text-gray-600 mt-4">
            You're currently on your buyer profile. To access your freelancer profile, switch to
          </p>
        </div>
      </div>

      {/* Profile Checklist */}
      <div className="bg-white border rounded-lg p-4 md:p-6 w-full lg:w-[853px] h-auto lg:h-[390px] pt-6 border-t border-gray-200">
        <div className="pb-5">
          <h2 className="text-lg font-semibold">Profile Checklist</h2>
          <div className="flex gap-4 items-center">
            <div className="w-full md:w-[511px] bg-[#D2EFFF] mt-1 rounded-[8px] h-[8px]">
              <div className="bg-[#005382] h-[8px] rounded-[5px]" style={{ width: '25%' }}></div>
            </div>
            <div>
              <h1 className="text-sm font-medium">25%</h1>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Fill out Profile */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white h-auto md:h-[76px] rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF] text-[#005382] mb-2 md:mb-0">
              <Image src={User} alt="User" height={24} width={24} />
            </div>
            <div className="flex-1 px-2 md:px-4 text-center md:text-left">
              <h3 className="text-[14px] md:text-[18px] font-semibold">Fill out Profile</h3>
              <p className="text-[12px] md:text-[14px] leading-tight text-[#939393]">
                Let others know more about you when they visit your profile by filling out your profile.
              </p>
            </div>
            <p 
              className="text-[#005382] text-[14px] md:text-[16px] font-medium mt-2 md:mt-0 cursor-pointer"
              onClick={handleGetStartedClick} // Navigate to profile
            >
              Get Started
            </p>
          </div>

          {/* Add Resume */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white h-auto md:h-[76px] rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF] text-[#005382] mb-2 md:mb-0">
              <Image src={Docuemnt} alt="Document" height={24} width={24} />
            </div>
            <div className="flex-1 px-2 md:px-4 text-center md:text-left">
              <h3 className="text-[14px] md:text-[18px] font-semibold">Add Your Resume</h3>
              <p className="text-[12px] md:text-[14px] leading-tight text-[#939393]">
                Upload your resume so Plugs can assess if you're a good fit for their company.
              </p>
            </div>
            <p className="text-[#005382] text-[14px] md:text-[16px] font-medium mt-2 md:mt-0">
              Get Started
            </p>
          </div>

          {/* Set Communication Preferences */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white h-auto md:h-[76px] rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF] text-[#005382] mb-2 md:mb-0">
              <Image src={User_message} alt="User_message" height={24} width={24} />
            </div>
            <div className="flex-1 px-2 md:px-4 text-center md:text-left">
              <h3 className="text-[14px] md:text-[18px] font-semibold">Set Communication Preferences</h3>
              <p className="text-[12px] md:text-[14px] leading-tight text-[#939393]">
                Let Plugs know your communication preferences.
              </p>
            </div>
            <p className="text-[#005382] text-[14px] md:text-[16px] font-medium mt-2 md:mt-0">
              50%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
