'use client';
import React, { useState } from "react";
import OrderRequirements from "./orderRequirements";
import ServicesProgressBar from "../navbar/ServicesProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { setServicesCurrentStep } from "@/app/redux/slice/user/userSlice";
import Requirement from "./publishPage";
import { submitAllServices } from "@/app/redux/action";


const ServicesSelection = () => {
  
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
  
    } ;
  
  

  return (
    <>
    <form onSubmit={currentStep === 3 ? handleFinish : handleContinue}>
    <div className="bg-gray-100 h-screen flex flex-col items-center min-h-max px-4">
       {currentStep === 1 && (
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Services you want to offer</h2>
        <p className="mb-6 text-[#555555] text-sm font-normal leading-tight">
          Select which services you'd like to offer to your customers. You can
          select one or more services from the list.
        </p>

        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#005382] cursor-pointer"
              onChange={() => toggleDetails("referral")}
            />
            <div>
              <h3 className="text-base font-semibold">Standard Employee Referral</h3>
              <p className="text-base font-normal mt-1">About this package</p>
              <p className="leading-relaxed text-sm text-[#555555] mt-2">
                You will offer to schedule a{" "}
                <span className="font-semibold">30 min video call</span> with
                the candidate to interview them and see if they are a right fit
                for the position. If everything looks good, you will{" "}
                <span className="font-semibold">
                  submit an employee referral
                </span>{" "}
                for the candidate to your company. Once accepted, you will{" "}
                <span className="font-semibold">
                  send a referral confirmation
                </span>{" "}
                to the candidate (This doesn't guarantee the candidate will
                receive any interview or offer from the company).
              </p>
            </div>
          </label>

          {isDetailsVisible.referral && (
            <>
            <div className="mt-4 flex flex-col sm:flex-row justify-around items-start sm:items-center">
  <div className=" w-full flex justify-around flex-col sm:flex-row">
    <div className=" flex flex-col">
      <label className="text-gray-700 text-sm font-medium mb-2" htmlFor="price">
        Price
      </label>
      <input
        type="text"
        id="price"
        placeholder="$ Price for this service"
        className="h-[48px] w-full sm:w-[300px] p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
    <div className="ml-0 sm:ml-4 mt-2 sm:mt-10">
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
  <div className="relative">
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
      className={`absolute z-10 mt-1 w-full sm:w-[276px] rounded-lg border border-gray-300 bg-white ${isDropdownOpen.referral ? 'block' : 'hidden'}`}
    >
      <div className="flex items-center px-4 py-2 hover:bg-gray-100">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        <label className="ml-2 text-gray-700">Option 1</label>
      </div>
      <div className="flex items-center px-4 py-2 hover:bg-gray-100">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
        <label className="ml-2 text-gray-700">Option 2</label>
      </div>
      <div className="flex items-center px-4 py-2 hover:bg-gray-100">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
        <label className="ml-2 text-gray-700">Option 3</label>
      </div>
    </div>
  </div>
</div>

            </>
          )}
        </div>

        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#005382] cursor-pointer"
              onChange={() => toggleDetails("resume")}
            />
            <div>
              <h3 className="text-base font-semibold">Resume Review</h3>
              <p className="text-base font-normal mt-1">About this package</p>
              <p className="leading-relaxed text-sm text-[#555555] mt-2">
                You will provide a 30 min call with your customer about their
                resume and provide feedback on improvements. You will also
                provide one 15 min follow-up review upon revision.
              </p>
            </div>
          </label>

          {isDetailsVisible.resume && (
            <>
                    <div className="mt-4 flex flex-col sm:flex-row justify-around items-start sm:items-center">
  <div className=" w-full flex justify-around flex-col sm:flex-row">
    <div className=" flex flex-col">
      <label className="text-gray-700 text-sm font-medium mb-2" htmlFor="price">
        Price
      </label>
      <input
        type="text"
        id="price"
        placeholder="$ Price for this service"
        className="h-[48px] w-full sm:w-[300px] p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
    <div className="ml-0 sm:ml-4 mt-2 sm:mt-10">
      <p className="text-sm font-medium italic text-[#939393] leading-tight">
        How much should I charge?
      </p>
    </div>
  </div>
</div>              <div className="mt-4 pl-0 sm:pl-7">
                <label className="block text-gray-700 text-sm font-medium mb-2">Delivery time</label>
                <div className="relative">
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
                    className={`absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white ${isDropdownOpen.resume ? 'block' : 'hidden'}`}
                  >
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <label className="ml-2 text-gray-700">Option 1</label>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                      <label className="ml-2 text-gray-700">Option 2</label>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <label className="ml-2 text-gray-700">Option 3</label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mb-6">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 accent-[#005382] cursor-pointer"
              onChange={() => toggleDetails("interview")}
            />
            <div>
              <h3 className="text-base font-semibold">Interview Prep</h3>
              <p className="text-base font-normal mt-1">About this package</p>
              <p className="leading-relaxed text-sm text-[#555555] mt-2">
                You will set up a 30 min call for preparation before the
                candidate's interview. It would be helpful to go into detail on
                what the company looks for in the position as well as some tips
                and tricks to help your customer crush the interview and land
                them the job (successful hire not guaranteed).
              </p>
            </div>
          </label>

          {isDetailsVisible.interview && (
            <>
                    <div className="mt-4 flex flex-col sm:flex-row justify-around items-start sm:items-center">
  <div className=" w-full flex justify-around flex-col sm:flex-row">
    <div className=" flex flex-col">
      <label className="text-gray-700 text-sm font-medium mb-2" htmlFor="price">
        Price
      </label>
      <input
        type="text"
        id="price"
        placeholder="$ Price for this service"
        className="h-[48px] w-full sm:w-[300px] p-4 text-[16px] border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
    <div className="ml-0 sm:ml-4 mt-2 sm:mt-10">
      <p className="text-sm font-medium italic text-[#939393] leading-tight">
        How much should I charge?
      </p>
    </div>
  </div>
</div>

              <div className="mt-4 pl-0 sm:pl-7">
                <label className="block text-gray-700 text-sm font-medium mb-2">Delivery time</label>
                <div className="relative">
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
                    className={`absolute z-10 mt-1 w-full rounded-lg border border-gray-300 bg-white ${isDropdownOpen.interview ? 'block' : 'hidden'}`}
                  >
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <label className="ml-2 text-gray-700">Option 1</label>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                      <label className="ml-2 text-gray-700">Option 2</label>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-100">
                      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" />
                      <label className="ml-2 text-gray-700">Option 3</label>
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
          <>

<OrderRequirements/>
</>

         )}
         
      <div className="justify-end mt-4">
      <button
  type="submit"
  // disabled={!allServicesSelected}
  className={`${
    allServicesSelected ? "bg-[#005382]" : "bg-[#005382]"
  } text-white px-4 py-2 mt-4 rounded`}
>
  Save & Continue
</button>
                     </div>
                     {currentStep === 3 && (
          <>

<Requirement/>
</>

         )}
    </div>
    
    </form>
    </>
  );
}


export default ServicesSelection;
