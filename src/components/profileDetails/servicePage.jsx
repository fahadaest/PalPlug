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
  const [selectedServices, setSelectedServices] = useState({
    referral: false,
    resume: false,
    interview: false,
  });
  const [orderChecks, setOrderChecks] = useState({
    resume: false,
    jobLink: false,
    portfolio: false,
    additionalQuestions: false
  });
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const currentStep = useSelector((state) => state.user.servicescurrentStep);
  const dispatch = useDispatch();
  const [dropdownState, setDropdownState] = useState({
    referral: { selectedOption: '', isDetailsVisible: false, isOpen: false },
    resume: { selectedOption: '', isDetailsVisible: false, isOpen: false },
    interview: { selectedOption: '', isDetailsVisible: false, isOpen: false },
  });
  const handleServiceCheckbox = (service) => {
    setSelectedServices((prev) => ({
      ...prev,
      [service]: !prev[service],
    }));
    setDropdownState((prevState) => ({
      ...prevState,
      [service]: {
        ...prevState[service],
        isDetailsVisible: !prevState[service].isDetailsVisible,
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
  useEffect(() => {
    if (currentStep === 1) {
      const step1Selected = Object.values(selectedServices).some(Boolean);
      setIsContinueDisabled(!step1Selected);
    } else if (currentStep === 2) {
      const step2Selected = Object.values(orderChecks).some(Boolean);
      setIsContinueDisabled(!step2Selected);
    } else {
      setIsContinueDisabled(false);
    }
  }, [currentStep, selectedServices, orderChecks]);
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
        <div className="bg-gray-100 flex flex-col items-center min-h-max ">
          {currentStep === 1 && (
            <div className="bg-white h-[auto] flex flex-col gap-[45px] w-auto max-w-[978px] rounded-[8px] pt-[40px] pl-[16px] pr-[16px] md:p-[40px_80px_40px_80px] mt-5">
              <div className="flex flex-col gap-[16px]">
                <h2 className="text-lg font-semibold">Services you want to offer</h2>
                <p className="text-[#555555] text-sm font-normal leading-tight">
                  Select which services you'd like to offer to your customers. You can select one or more services from the list.
                </p>
              </div>
              <div className="flex items-baseline flex-nowrap flex-col gap-[16px]">
                <label className="flex flex-col items-start sm:space-x-6 cursor-pointer">
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <input
                      type="checkbox"
                      className="accent-[#005382] cursor-pointer"
                      checked={selectedServices.referral}
                      onChange={() => handleServiceCheckbox("referral")}
                    />
                    <h3 className="text-base font-semibold">Standard Employee Referral</h3>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-base mt-[8px] font-normal">About this package</p>
                    <p className="leading-tight text-sm text-[#555555]">
                      You will offer to schedule a <span className="font-semibold leading-tight">30 min video call</span> with
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
                      <div className="pl-0 sm:pl-7 items-end sm:flex-row sm:justify-between w-auto md:w-[789px] flex flex-col">
                        <div className="flex gap-[8px] flex-col w-full">
                          <label className="text-gray-700 text-[14px] font-[600]" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px] xs:w-[250px] sm:w-[300px] p-4 text-[16px] border rounded-[8px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="w-[300px] pt-[11px] pb-[11px] flex items-start sm:items-center">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[8px] pl-0 sm:pl-7">
                      <label className="block text-[#2F2F2F] text-[14px] font-[600]">
                        Delivery time
                      </label>
                      <div
                        className="h-[48px] w-[358px] md:w-[276px]"
                        onClick={(e) => handleDropdownClick(e, "referral")}
                      >
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
              <div className="flex flex-col gap-[16px]">
                <div>
                  <label className="flex flex-col items-start sm:space-x-6 cursor-pointer">
                    <div className="flex flex-row justify-start items-center space-x-2">
                      <input
                        type="checkbox"
                        className="accent-[#005382] cursor-pointer"
                        checked={selectedServices.resume}
                        onChange={() => handleServiceCheckbox("resume")}
                      />
                      <h3 className="text-base font-semibold">Resume Review</h3>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                      <p className="text-base mt-[8px] font-normal">About this package</p>
                      <p className="leading-tight text-sm text-[#555555]">
                        You will provide a 30 min call with your customer about their resume and provide feedback on improvements.
                        You will also provide one 15 min follow up review upon revision.
                      </p>
                    </div>
                  </label>
                </div>
                {dropdownState.resume.isDetailsVisible && (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="pl-0 sm:pl-7 items-end sm:flex-row sm:justify-between w-auto md:w-[789px] flex flex-col">
                        <div className="flex gap-[8px] flex-col w-full">
                          <label className="text-gray-700 text-[14px] font-[600]" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px] xs:w-[250px] sm:w-[300px] p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="w-[300px] pt-[11px] pb-[11px] flex items-start sm:items-center">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[8px] pl-0 sm:pl-7">
                      <label className="block text-[#2F2F2F] text-[14px] font-[600]">
                        Delivery time
                      </label>
                      <div
                        className="h-[48px] w-[358px] md:w-[276px]"
                        onClick={(e) => handleDropdownClick(e, "resume")}
                      >
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
              <div className="flex flex-col gap-[16px]">
                <label className="flex flex-col items-start sm:space-x-6 cursor-pointer">
                  <div className="flex flex-row justify-start items-center space-x-2">
                    <input
                      type="checkbox"
                      className="accent-[#005382] cursor-pointer"
                      checked={selectedServices.interview}
                      onChange={() => handleServiceCheckbox("interview")}
                    />
                    <h3 className="text-base font-semibold">Interview Prep</h3>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <p className="text-base font-normal mt-[8px]">About this package</p>
                    <p className="leading-tight text-sm text-[#555555] mt-2">
                      You will set up a 30 min call for preparation before the candidate's interview.
                      It would be helpful to go into detail on what the company looks for in the position as well as some tips
                      and tricks to help your customer crush the interview and land them the job (successful hire not guaranteed).
                    </p>
                  </div>
                </label>
                {dropdownState.interview.isDetailsVisible && (
                  <>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="pl-0 sm:pl-7 items-end sm:flex-row sm:justify-between w-auto md:w-[789px] flex flex-col">
                        <div className="flex gap-[8px] flex-col w-full">
                          <label className="text-gray-700 text-[14px] font-[600]" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px] xs:w-[250px] sm:w-[300px] p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="w-[300px] pt-[11px] pb-[11px] flex items-start sm:items-center">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[8px] pl-0 sm:pl-7">
                      <label className="block text-[#2F2F2F] text-[14px] font-[600]">
                        Delivery time
                      </label>
                      <div
                        className="h-[48px] w-[358px] md:w-[276px]"
                        onClick={(e) => handleDropdownClick(e, "interview")}
                      >
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
            <OrderRequirements onChildChecksChange={setOrderChecks} />
          )}
          <div className="w-full max-w-[978px] h-auto flex justify-end xs:flex xs:justify-center sm:justify-center md:justify-end">
            <button
              type="submit"
              disabled={isContinueDisabled}
              className={`bg-[#005382] text-white p-[11px_20px_11px_20px] mt-5 rounded-[8px] ${
                isContinueDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ display: currentStep === 3 ? 'none' : 'block' }}
            >
              Save & Continue
            </button>
          </div>
          {currentStep === 3 && (
            <Requirement />
          )}
        </div>
      </form>
    </>
  );
};

export default ServicesSelection;
