'use client';
import React, { useEffect, useRef, useState } from "react";
import OrderRequirements from "./orderRequirements";
import { useDispatch, useSelector } from "react-redux";
import { setServicesCurrentStep } from "@/app/redux/slice/user/userSlice";
import Requirement from "./publishPage";
import { submitAllServices } from "@/app/redux/action";

const ServicesSelection = () => {
  const dropdownRef = useRef(null);

  const [isDetailsVisible, setDetailsVisible] = useState({
    referral: false,
    resume: false,
    interview: false,
  });
  
  const toggleDetails = (service) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [service]: !prevState[service],
    }));
  };
  
  const [isDropdownOpen, setDropdownOpen] = useState({
    referral: false,
    resume: false,
    interview: false,
  });
  
  const currentStep = useSelector((state) => state.user.servicescurrentStep);
  const dispatch = useDispatch();
  
  const [selectedServices, setSelectedServices] = useState({
    referral: false,
    resume: false,
    interview: false,
  });
  
  const handleDropdownClick = (e, type) => {
    e.preventDefault();  
    e.stopPropagation(); 
  
    setDropdownOpen((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
    setSelectedServices((prevState) => ({
      ...prevState,
      [type]: true,
    }));
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen({
        referral: false,
        resume: false,
        interview: false,
      });
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const allServicesSelected = currentStep === 1
    ? Object.values(selectedServices).every((value) => value)
    : true;

  const handleContinue = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (currentStep === 1) {
      dispatch(setServicesCurrentStep(2));
      setSelectedServices({
        referral: false,
        resume: false,
        interview: false,
      });
    } else if (currentStep === 2) {
      dispatch(setServicesCurrentStep(3));
    }
  };

  const handleFinish = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const formData = {
      selectedServices,
    };
   
    dispatch(submitAllServices(formData));
  };

  return (
    <>
      <form onSubmit={currentStep === 3 ? handleFinish : handleContinue}>
        <div className="bg-gray-100 pt-10 pb-10  flex flex-col   items-center min-h-max px-4">
          {currentStep === 1 && (
            <div className="bg-white sm:h-[auto] pl-4 md:h-[1262px]   w-full sm:w-[978px] md:pl-28 rounded-lg pt-10 pb-10 pr-4 sm:pr-36">
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

                {isDetailsVisible.referral && (
                  <>
                    <div className="flex  flex-col sm:flex-row items-start sm:items-center">
                      <div className="pl-7 mt-4  w-full flex flex-col sm:flex-row sm:justify-between">
                        <div className="flex flex-col w-full">
                          <label className="text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px]  xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center ">
                          <p className="text-sm font-medium italic text-[#939393] leading-tight">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pl-0 sm:pl-7">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Delivery time
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={(e) => handleDropdownClick(e, "referral")}
                          className="w-full sm:w-[276px] h-[48px] block bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          Select

                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </button>
                        <div
                          className={`absolute z-10 mt-1 w-full sm:w-[276px] rounded-lg border overflow-y-auto   border-gray-300 bg-white ${isDropdownOpen.referral ? 'block' : 'hidden'} max-h-60 overflow-y-auto`}
                        >
                        
                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 1</label>
                        </div>


                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 2</label>
                        </div>

                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 3</label>
                        </div>

                        </div>
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
                      You will provide a 30 min call with your customer about their resume and provide feedback on improvements. You will also provide one 15 min follow-up review upon revision.
                    </p>
                  </div>
                </label>

                {isDetailsVisible.resume && (
                  <>
                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                      <div className="pl-0 sm:pl-7 w-full flex flex-col sm:flex-row sm:justify-between">
                     
                       <div className="pl-0   w-full flex flex-col sm:flex-row sm:justify-between">
                        <div className="flex flex-col w-full">
                          <label className="text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px]  xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center ">
                          <p className="text-sm font-medium italic text-[#939393] leading-tight">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                   
                   
                      </div>
                    </div>
                    <div className="mt-4 pl-0 sm:pl-7">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Delivery time
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={(e) => handleDropdownClick(e, "resume")}
                          className="w-full sm:w-[276px] h-[48px] block bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          Select
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </button>
                       
                        <div
                          className={`absolute z-10 mt-1 w-full sm:w-[276px] rounded-lg border border-gray-300 bg-white ${isDropdownOpen.resume ? 'block' : 'hidden'} max-h-60 overflow-y-auto`}
                        >
                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 1</label>
                        </div>


                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 2</label>
                        </div>

                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 3</label>
                        </div>
                        </div>
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
                      You will set up a 30 min call for preparation before the candidate's interview. It would be helpful to go into detail on what the company looks for in the position as well as some tips and tricks to help your customer crush the interview and land them the job (successful hire not guaranteed).
                    </p>
                  </div>
                </label>

                {isDetailsVisible.interview && (
                  <>
                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                      <div className="pl-0 sm:pl-7 w-full flex flex-col sm:flex-row sm:justify-between">
                        <div className="flex flex-col w-full">
                          <label className="text-gray-700 text-sm font-medium mb-2" htmlFor="price">
                            Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px]  xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                        <div className="mt-2 sm:mt-0  flex items-center">
                          <p className="text-sm font-medium italic text-[#939393] leading-tight">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pl-0 sm:pl-7">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Delivery time
                      </label>
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={(e) => handleDropdownClick(e, "interview")}
                          className="w-full sm:w-[276px] h-[48px] block bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          Select
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <i className="fas fa-chevron-down"></i>
                          </div>
                        </button>
                        <div
                          className={`absolute z-10 mt-1 w-full sm:w-[276px] overflow-y-scroll rounded-lg border   border-gray-300 bg-white ${isDropdownOpen.interview ? 'block' : 'hidden'} max-h-60 overflow-y-auto`}
                        >
                          <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 1</label>
                        </div>


                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 2</label>
                        </div>

                        <div className="group flex items-center px-4 py-2 hover:bg-[#005382]">
                        <input type="checkbox" className="form-checkbox h-4 w-4  accent-[#005382]" />
                        <label className="ml-2 text-gray-700 text-sm group-hover:text-white">Option 3</label>
                        </div>
                        </div>
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
}

export default ServicesSelection;


