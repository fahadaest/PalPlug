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


  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');



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


  const handleOptionChange1 = (option) => {
    setSelectedOption1(option); 
    };
  
  const handleOptionChange2 = (option) => {
    setSelectedOption2(option); 

  };
  
  const handleOptionChange3 = (option) => {
    setSelectedOption3(option); 
    };


      
    
  

  return (
    <>
      <form onSubmit={currentStep === 3 ? handleFinish : handleContinue}>
        <div className="bg-gray-100 pt-10 pb-10 flex flex-col items-center min-h-max px-4">
          {currentStep === 1 && (
            <div className="bg-white sm:h-[auto] md:h-[1262px] w-auto max-w-[978px] rounded-[8px] pt-[40px] pl-[80px] pr-[80px] pb-[40px]">
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
                      <div className="h-[48px] w-[276px] t" onClick={handleDropdownClick}>
                        <DropdownComponent
                          options={['Option 1', 'Option 2', 'Option 3']}
                          selectedOption={selectedOption1} 
                          onOptionChange={handleOptionChange1}
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
                        <label className="text-gray-700 text-[14px] font-[600] mb-2" htmlFor="price">
                        Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            placeholder="$ Price for this service"
                            className="h-[48px] xs:w-[250px] sm:w-[300px]  p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="mt-2 w-[300px] sm:mt-0 flex items-center ">
                          <p className="text-[14px] font-[500] italic text-[#939393] leading-[20px]">
                            How much should I charge?
                          </p>
                        </div>
                      </div>
                   
                   
                      </div>
                    </div>
                    <div className="mt-4 pl-0 sm:pl-7">
                    <label className="block text-[#2F2F2F] text-[14px] font-[600] mb-2">
                    Delivery time
                      </label>
                      <div className="h-[48px] w-[276px]" onClick={handleDropdownClick}>
                      <DropdownComponent
                        options={['Option 1', 'Option 2', 'Option 3']}
                        selectedOption={selectedOption2} 
                        onOptionChange={handleOptionChange2} 
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
                      You will set up a 30 min call for preparation before the candidate's interview. It would be helpful to go into detail on what the company looks for in the position as well as some tips and tricks to help your customer crush the interview and land them the job (successful hire not guaranteed).
                    </p>
                  </div>
                </label>

                {isDetailsVisible.interview && (
                  <>
                    <div className="mt-4 flex flex-col sm:flex-row sm:justify-between">
                      <div className="pl-0 sm:pl-7 w-full flex flex-col sm:flex-row sm:justify-between">
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
                      <div className="h-[48px] w-[276px]" onClick={handleDropdownClick}>
    <DropdownComponent
      options={['Option 1', 'Option 2', 'Option 3']}
      selectedOption={selectedOption3} 
      onOptionChange={handleOptionChange3} 
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
}

export default ServicesSelection;


