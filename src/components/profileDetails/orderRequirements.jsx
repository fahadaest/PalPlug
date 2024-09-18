'use client';
import React, { useState } from 'react';

const OrderRequirements = () => {
    const [isResumeDropdownVisible, setResumeDropdownVisible] = useState(false);
    const [isAdditionalQuestionsVisible, setIsAdditionalQuestionsVisible] = useState(false);

    const toggleResumeDropdown = () => {
        setResumeDropdownVisible(prev => !prev);
    };

    const toggleAdditionalQuestions = () => {
        setIsAdditionalQuestionsVisible(prev => !prev);
    };

    return (
        <div className='flex flex-col pt-4 justify-center bg-gray-200 px-4 sm:px-6 md:px-8 lg:px-16'>
            <div className='w-full max-w-[978px] mx-auto rounded-lg shadow-sm pb-20 pt-10 px-6 sm:px-8 md:px-12 lg:px-16 bg-white'>
                <div>
                    <h1 className='text-lg sm:text-xl md:text-2xl leading-tight font-semibold'>
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
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                isResumeDropdownVisible ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                            style={{ maxHeight: isResumeDropdownVisible ? '160px' : '0px' }}
                        >
                            <label htmlFor="File Format" className="block mb-2 ml-5 text-[#2F2F2F] font-semibold">File Format</label>
                            <div className='p-0 ml-5'>
                                <select className='h-[48px] w-[276px] max-w-full bg-white border rounded-lg pl-2'>
                                    <option value="">abc</option>
                                    <option value="">ccc</option>
                                    <option value="">dddd</option>
                                </select>
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
        </div>
    );
}

export default OrderRequirements;
