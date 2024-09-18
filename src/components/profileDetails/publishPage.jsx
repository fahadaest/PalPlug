import React from 'react';
import Robot from '@/assets/images/Robot.svg';
import Image from 'next/image';
const Requirement = () => {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white border p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-[978px]">

        <div className="flex justify-center items-center flex-col mb-6 text-center">
          <Image src={Robot} alt='Robo' className="cursor-pointer w-24 h-24 sm:w-auto sm:h-auto" />
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">You're almost there!</h1>
          <p className="text-sm sm:text-base text-[#555555] font-semibold">
            You just need to fill out the following requirements to start selling
          </p>
        </div>
  
        <div className='flex justify-center items-center'>
          <div className="h-auto  max-w-[666px]  mb-6 p-4 md:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Let's check if you need to fill out Form W-9
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Form W-9 is used in the U.S. for tax purposes. You are required to fill it out only if you're defined as a U.S. person by the U.S. tax authorities. <span className="font-semibold">Answering ‘No’ completes the check.</span>{' '}
              <a href="#" className="text-blue-600 underline">
                What is a U.S. person (as defined by the U.S. tax authorities)?
              </a>
            </p>
            <p className="text-sm sm:text-base text-gray-800 font-semibold mt-10 mb-4">
              Are you a U.S. person?
            </p>
            <div className="space-y-4">
              <label className="block border border-gray-300 rounded-lg p-4 cursor-pointer">
                <input type="radio" name="us_person" className="mr-2 accent-[#005382]" />
                <span className="text-gray-800">No</span>
                <p className="text-sm sm:text-base text-gray-600 ml-6">
                  I confirm that I am not a U.S. person and I am a user performing work outside of the U.S.
                </p>
              </label>
              <label className="block border border-gray-300 rounded-lg p-4 cursor-pointer">
                <input type="radio" name="us_person" className="mr-2 accent-[#005382]" />
                <span className="text-gray-800">Yes</span>
                <p className="text-sm sm:text-base text-gray-600 ml-6">
                  U.S. tax authorities might request Form W-9 and information regarding your activity on Fiverr.
                </p>
              </label>
            </div>
            <div className="text-center text-xs sm:text-sm mt-10">
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
   
        <div className="flex justify-center w-[85%]  sm:justify-end mt-10 sm:mt-20">
          <button className="bg-[#005382] h-[40px] w-full sm:w-[175px] text-white font-semibold text-sm py-2 px-6 rounded-lg">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
export default Requirement;