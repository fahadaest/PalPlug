'use client';
import React, { useState } from 'react';
import DropdownComponent from './DropdownComponent';

const OrderRequirements = () => {
    const [isResumeDropdownVisible, setResumeDropdownVisible] = useState(false);
    const [isAdditionalQuestionsVisible, setIsAdditionalQuestionsVisible] = useState(false);

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleResumeDropdown = () => {
        setResumeDropdownVisible(prev => !prev);
    };

    const toggleAdditionalQuestions = () => {
        setIsAdditionalQuestionsVisible(prev => !prev);
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();
        e.stopPropagation();  // Stop the event from propagating to the form
        setDropdownOpen(!isDropdownOpen);  // Toggle the dropdown visibility
      };
    
    return (
            <div className='w-full max-w-[978px] h-[1216px]    rounded-lg  pt-10 pb-10    sm:px-8 md:px-12 lg:px-16 bg-white'>
                <div className='pl-[16px]'>
                    <h1 className='text-lg sm:text-xl  md:text-2xl leading-tight font-semibold'>
                        Which of these items will you require to fulfill <br /> your orders?
                    </h1>
                    <p className='text-[14px] sm:text-base font-[400] text-[#555555] pt-2 line-clamp-2'>
                        Add questions to help buyers provide you with exactly what you need to start working <br />
                        on their order.
                    </p>

                    <div className=" flex mt-5 flex-col gap-7">
                        <div className="flex items-center gap-3 sm:gap-5">
                            <input
                                id="resume"
                                type="checkbox"
                                onChange={toggleResumeDropdown}
                                className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
                            />
                            <label htmlFor="resume" className="text-[14px] sm:text-[16px] font-semibold">Resume</label>
                        </div>

                        {/* Resume Dropdown Container */}
                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isResumeDropdownVisible ? 'max-h-40' : 'max-h-0'
                            }`}
                            style={{ 
                                maxHeight: isResumeDropdownVisible ? '200px' : '0px',
                                display: isResumeDropdownVisible ? 'block' : 'none' 
                            }}
                            >
                                <label>Format</label>
                                <div className='w-[250px] ' onClick={handleDropdownClick}>
                                <DropdownComponent  isOpen={isDropdownOpen} 
                                options={['Option 1', 'Option 2', 'Option 3']}
                                                
                    />

                            </div>
                            
                            
                            </div>
                                                

                        <div className="flex items-center gap-3 sm:gap-5">
                            <input
                                id="job-link"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
                            />
                            <label htmlFor="job-link" className="text-[14px] sm:text-[16px] font-semibold">Job Link/URL</label>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-5">
                            <input
                                id="portfolio-link"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
                            />
                            <label htmlFor="portfolio-link" className="text-[14px] sm:text-[16px] font-semibold">Portfolio Link/URL</label>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-5">
                            <input
                                id="additional-questions"
                                type="checkbox"
                                onChange={toggleAdditionalQuestions}
                                className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
                            />
                            <label htmlFor="additional-questions" className="text-[14px] sm:text-[16px] font-semibold">Additional Questions</label>
                        </div>

                        {/* Additional Questions Section */}
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isAdditionalQuestionsVisible ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            style={{ maxHeight: isAdditionalQuestionsVisible ? '320px' : '0px' }}
                        >
                            <div className="mt-1 ml-5">
                                <div className="mb-4">
                                    <label htmlFor="question" className="block text-[#2F2F2F] text-sm font-bold mb-2">
                                        Question
                                    </label>
                                    <textarea
                                        id="question"
                                        className="shadow appearance-none border rounded w-[703px] h-[147px] py-2 px-3 text-sm font-medium text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows="4"
                                        placeholder="Type out what question you’d like to ask your customer, it will be shown to them  during their request process."
                                    ></textarea>
                                    <p className="text-[#939393] text-xs mt-1">max. 600 characters</p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <button className="h-[40px] w-full sm:w-[194px] p-2 bg-[#939393] text-white text-sm font-semibold rounded mb-2" type="button">
                                        Save Question
                                    </button>
                                    <button className="h-[40px] w-full sm:w-[194px] p-2 bg-[#939393] text-white text-sm font-semibold rounded" type="button">
                                        Add another Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default OrderRequirements;
