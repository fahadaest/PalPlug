import React, { useState } from 'react';
import Robot from '@/assets/images/Robot.svg';
import Image from 'next/image';

const Requirement = () => {
  // NEW: Track which radio option is selected
  const [selectedValue, setSelectedValue] = useState('');

  // Handle radio change
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="bg-white pl-[16px] pt-[40px] pr-[16px] border md:p-[40px_80px_40px_80px] mt-5 rounded-[8px] w-full max-w-[978px]">

      <div className="flex justify-center items-center flex-col gap-[24px]">
        <Image src={Robot} alt='Robo' className="cursor-pointer w-24 h-24 sm:w-auto sm:h-auto" />
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">You're almost there!</h1>
        <p className="text-sm sm:text-base text-[#555555] font-semibold">
          You just need to fill out the following requirements to start selling
        </p>
      </div>

      <div className='flex justify-center flex-col gap-[24px] pt-2 items-center'>
        <div className="h-auto max-w-[666px] flex flex-col gap-[24px]">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 ">
            Let's check if you need to fill out Form W-9
          </h2>
          <p className="text-sm sm:text-base text-gray-600 ">
            Form W-9 is used in the U.S. for tax purposes. You are required to fill it out only if you're defined as a U.S. person by the U.S. tax authorities. <span className="font-semibold">Answering ‘No’ completes the check.</span>{' '}
            <a href="#" className="text-blue-600 underline">
              What is a U.S. person (as defined by the U.S. tax authorities)?
            </a>
          </p>

          <div className="flex flex-col gap-[16px]">
            <p className="text-sm sm:text-base text-gray-800 font-semibold">
              Are you a U.S. person?
            </p>

            <label className="block border border-gray-800 rounded-[4px] cursor-pointer p-2">
              <input
                type="radio"
                name="us_person"
                value="no"
                checked={selectedValue === 'no'}
                onChange={handleRadioChange}
                className="mr-2 accent-[#005382]"
              />
              <span className="text-gray-800 text-[14px] font-medium">No</span>
              <div className='pl-[16px] pr-[16px]'>
                <p className="text-[12px] sm:text-base text-gray-600">
                  I confirm that I am not a U.S. person and I am a user performing work outside of the U.S.
                </p>
              </div>
            </label>

            <label className="block border border-gray-800 rounded-[4px] cursor-pointer p-2">
              <input
                type="radio"
                name="us_person"
                value="yes"
                checked={selectedValue === 'yes'}
                onChange={handleRadioChange}
                className="mr-2 accent-[#005382]"
              />
              <span className="text-gray-800 text-[14px] font-medium">Yes</span>
              <div className='pl-[16px] pr-[16px]'>
                <p className="text-[12px] sm:text-base text-gray-600">
                  U.S. tax authorities might request Form W-9 and information regarding your activity on Fiverr.
                </p>
              </div>
            </label>
          </div>

          <div className="text-center text-xs sm:text-sm">
            <p className="text-gray-600">
              Learn more about{' '}
              <a href="#" className="text-blue-600 underline">
                tax regulations
              </a>{' '}
              and read our{' '}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>{' '}
              to learn how we use your data.
            </p>
          </div>
        </div>
      </div>

      <div className="flex sm:w-[80%] sm:justify-center md:justify-end pl-[16px] pr-[16px] md:w-[100%] mt-[300px]">
        {/* Button is disabled unless user selected 'yes' or 'no' */}
        <button
          disabled={selectedValue === ''}
          className={`bg-[#005382] h-[40px] w-full sm:w-[175px] text-white font-semibold text-sm p-[11px_20px_11px_20px] rounded-[8px] ${
            selectedValue === '' ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Publish
        </button>
      </div>

    </div>
  );
};

export default Requirement;
