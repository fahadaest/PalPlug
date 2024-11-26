'use client';
import React, { useEffect, useRef, useState } from "react";
import OrderRequirements from "./orderRequirements";
import { useDispatch, useSelector } from "react-redux";
import { setServicesCurrentStep } from "@/app/redux/slice/user/userSlice";
import Requirement from "./publishPage";
import { submitAllServices } from "@/app/redux/action";
import DropdownComponent from "./DropdownComponent";

const ServicesSelection = () => {
  const dropdownRef = useRef(null);

  const [dropdownState, setDropdownState] = useState({
    referral: { selectedOption: '', isDetailsVisible: false, isOpen: false },
    resume: { selectedOption: '', isDetailsVisible: false, isOpen: false },
    interview: { selectedOption: '', isDetailsVisible: false, isOpen: false },
  });

  const currentStep = useSelector((state) => state.user.servicescurrentStep);
  const dispatch = useDispatch();

  const toggleDetails = (service) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [service]: {
        ...prevState[service],
        isDetailsVisible: !prevState[service].isDetailsVisible,
      },
    }));
  };

  const handleDropdownClick = (e, service) => {
    e.preventDefault();
    e.stopPropagation();

    setDropdownState((prevState) => ({
      ...prevState,
      [service]: {
        ...prevState[service],
        isOpen: !prevState[service].isOpen,
      },
    }));
  };

  const handleOptionChange = (service, option) => {
    setDropdownState((prevState) => ({
      ...prevState,
      [service]: {
        ...prevState[service],
        selectedOption: option,
      },
    }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownState((prevState) =>
        Object.keys(prevState).reduce((acc, key) => {
          acc[key] = { ...prevState[key], isOpen: false };
          return acc;
        }, {})
      );
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleContinue = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (currentStep === 1) {
      dispatch(setServicesCurrentStep(2));
    } else if (currentStep === 2) {
      dispatch(setServicesCurrentStep(3));
    }
  };

  const handleFinish = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const formData = {
      selectedServices: dropdownState,
    };
    dispatch(submitAllServices(formData));
  };

  return (
    <>
       <form onSubmit={currentStep === 3 ? handleFinish : handleContinue}>
        <div className="bg-gray-100  flex flex-col items-center min-h-max ">
          {currentStep === 1 && (
            <div className="bg-white h-[auto] md:h-[1262px] w-auto max-w-[978px] rounded-[8px] pl-[16px] pr-[16px] md:p-[40px_80px_40px_80px] mt-5 ">
              <h2 className="text-lg font-semibold mb-4">Services you want to offer</h2>
              <p className="mb-6 text-[#555555] text-sm font-normal leading-tight">
                Select which services you'd like to offer to your customers. You can select one or more services from the list.
              </p>

              <div className="mb-6">
              <label className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#005382] cursor-pointer"
                    onChange={() => toggleDetails("referral")}
                  />
                  <div>
                    <h3 className="text-base font-semibold">Standard Employee Referral</h3>
                    <p className="text-base font-normal mt-1">About this package</p>
                    <p className="leading-tight text-sm text-[#555555] mt-2">
                      You will offer to schedule a{" "}
                      <span className="font-semibold leading-tight">30 min video call</span> with
                      the candidate to interview them and see if they are a right fit
                      for the position. If everything looks good, you will{" "}
                      <span className="font-semibold leading-tight">submit an employee referral</span>{" "}
                      for the candidate to your company. Once accepted, you will{" "}
                      <span className="font-semibold">send a referral confirmation</span>{" "}
                      to the candidate (This doesn't guarantee the candidate will
                      receive any interview or offer from the company).
                    </p>
                  </div>
                </label>
                {dropdownState.referral.isDetailsVisible && (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="pl-0 sm:pl-7 sm:flex-row sm:justify-between mt-4 w-full flex flex-col">
              
                    <div className="flex flex-col w-full">
                          <label className="text-gray-700 text-[14px] font-[600] mb-2" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px]  xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="mt-2 w-[300px] sm:mt-0 flex items-center ">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>

                  <div className="mt-4 pl-0 sm:pl-7">
                    <label className="block text-[#2F2F2F] text-[14px] font-[600] mb-2">
                      Delivery time
                    </label>
                    <div className="h-[48px] w-[276px]" onClick={(e) => handleDropdownClick(e, "referral")}>
                      <DropdownComponent
                        options={['1 day', '2 days', '3 days']}
                        selectedOption={dropdownState.referral.selectedOption}
                        onOptionChange={(option) => handleOptionChange("referral", option)}
                        label="Select Delivery Time"
                      />
                    </div>
                  </div>
                </>
                )}
              </div>

              <div className="mb-6"> 
              <label className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-3 cursor-pointer">
              <input
                    type="checkbox"
                    className="mt-1 accent-[#005382] cursor-pointer"
                    onChange={() => toggleDetails("resume")}
                  />
                  <div>
                    <h3 className="text-base font-semibold">Resume Review</h3>
                    <p className="text-base font-normal mt-1">About this package</p>
                    <p className="leading-tight text-sm text-[#555555] mt-2">
                    You will provide a 30 min call with your customer about their resume and provide feedback on improvements. You will also provide one 15 min follow up review upon revision.
                    </p>
                  </div>
                </label>

                {dropdownState.resume.isDetailsVisible && (
                    <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="pl-0 sm:pl-7 sm:flex-row sm:justify-between mt-4 w-full flex flex-col">
              
                    <div className="flex flex-col w-full">
                          <label className="text-gray-700 text-[14px] font-[600] mb-2" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px]  xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="mt-2 w-[300px] sm:mt-0 flex items-center ">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>

                  <div className="mt-4 pl-0 sm:pl-7">
                    <label className="block text-[#2F2F2F] text-[14px] font-[600] mb-2">
                      Delivery time
                    </label>                    
                    <div className="h-[48px] w-[276px]" onClick={(e) => handleDropdownClick(e, "resume")}>
                      <DropdownComponent
                        options={['2 days', '4 days', '6 days']}
                        selectedOption={dropdownState.resume.selectedOption}
                        onOptionChange={(option) => handleOptionChange("resume", option)}
                        label="Select Delivery Time"
                        />
                    </div>
                    </div>
                </>
                )}
              </div>

              <div className="mb-6">
                <label className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 accent-[#005382] cursor-pointer"
                    onChange={() => toggleDetails("interview")}
                  />
                  <div>
                    <h3 className="text-base font-semibold">Interview Prep</h3>
                    <p className="text-base font-normal mt-1">About this package</p>
                    <p className="leading-tight text-sm text-[#555555] mt-2">
                    You will set up a 30 min call for preparation before the candidate's interview. It would be helpful to go into detail on what the company looks for in the position as well as some tips and tricks to help your customer crush the interview and land them the job (successful hire not guaranteed).                    </p>
                  </div>
                </label>

                {dropdownState.interview.isDetailsVisible && (
                <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                    <div className="pl-0 sm:pl-7 sm:flex-row sm:justify-between mt-4 w-full flex flex-col">
                    <div className="flex flex-col w-full">
                          <label className="text-gray-700 text-[14px] font-[600] mb-2" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px]  xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="mt-2 w-[300px] sm:mt-0 flex items-center ">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>

                  <div className="mt-4 pl-0 sm:pl-7">
                  
                  <label className="block text-[#2F2F2F] text-[14px] font-[600] mb-2">
                    Delivery time
                  </label>                    
                  <div className="h-[48px] w-[276px]" onClick={(e) => handleDropdownClick(e, "resume")}>
                  <DropdownComponent
                        options={['5 days', '7 days', '10 days']}
                        selectedOption={dropdownState.interview.selectedOption}
                        onOptionChange={(option) => handleOptionChange("interview", option)}
                        label="Select Delivery Time"
                      />
                  </div>
                  </div>                    
                  </>
                )}
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <OrderRequirements/>
          )}
          
          <div className="w-full max-w-[978px] h-auto flex justify-end xs:flex xs:justify-center sm:justify-center md:justify-end">
    <button
        type="submit"
        className={`bg-[#005382] text-white px-4 py-2 mt-2 rounded`}
        style={{ display: currentStep === 3 ? 'none' : 'block' }}
    >
        Save & Continue
    </button>
    </div>
          {currentStep === 3 && (
            <Requirement/>
          )}
        </div>
      </form>
    </>
  );
};

export default ServicesSelection;