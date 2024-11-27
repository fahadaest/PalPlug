'use client';
import React, { useEffect, useState } from 'react';
import DropdownComponent from './DropdownComponent';

const OrderRequirements = () => {
    const [isResumeDropdownVisible, setResumeDropdownVisible] = useState(false);
    const [isAdditionalQuestionsVisible, setIsAdditionalQuestionsVisible] = useState(false);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [questions, setQuestions] = useState([{ id: 1, text: '' }]);
    const [savedQuestions, setSavedQuestions] = useState([]);

    const [selectedResumeOption, setSelectedResumeOption] = useState('');

    const toggleResumeDropdown = () => {
        setResumeDropdownVisible(prev => !prev);
    };

    const toggleAdditionalQuestions = () => {
        setIsAdditionalQuestionsVisible(prev => !prev);
    };

    const handleDropdownClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownOpen(!isDropdownOpen);
    };
   
    
    const handleQuestionChange = (id, text) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
    };

    const handleSaveQuestion = () => {
        const nonEmptyQuestions = questions.filter(q => q.text.trim() !== '');
        setSavedQuestions([...savedQuestions, ...nonEmptyQuestions]);
        setQuestions([{ id: questions.length + 1, text: '' }]);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, text: '' }]);
    };

    const handleOptionChange = (option) => {
        setSelectedResumeOption(option);
    };

    return (
        <div className='w-full max-w-[978px] h-auto pl-[16px] pr-[16px] md:p-[40px_80px_40px_80px] mt-5 rounded-[8px] bg-white'>
            <div className='flex flex-col gap-[45px]'>
                <div className='flex flex-col gap-[16px]'>

                    <h1 className='text-[16px] leading-tight font-semibold'>
                        Which of these items will you require to fulfill <br /> your orders?
                    </h1>
                    <p className='text-[14px] sm:text-base font-[400] text-[#555555] leading-[18px]'>
                        Add questions to help buyers provide you with exactly what you need to start working <br />
                        on their order.
                    </p>
                </div>
                <div className='flex flex-col gap-[16px]'>
                    <div className="flex items-center gap-[8px] sm:gap-[16px]">
                        <input
                            id="resume"
                            type="checkbox"
                            onChange={toggleResumeDropdown}
                            className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
                        />
                        <label htmlFor="resume" className="text-[14px] sm:text-[16px] font-semibold">Resume</label>
                    </div>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isResumeDropdownVisible ? 'max-h-40' : 'max-h-0'}`}
                        style={{
                            maxHeight: isResumeDropdownVisible ? '200px' : '0px',
                            display: isResumeDropdownVisible ? 'block' : 'none'
                        }}
                    >
                        <div className='flex flex-col gap-[8px] md:ml-[35px]'>
                            <label className='text-[14px] text-[#2F2F2F] font-[600]'>Format</label>
                            <div className='w-[276px]' onClick={handleDropdownClick}>
                                <DropdownComponent
                                    isOpen={isDropdownOpen}
                                    options={['Option 1', 'Option 2', 'Option 3']}
                                    selectedOption={selectedResumeOption}
                                    onOptionChange={handleOptionChange}
                                     width='276px' 
                                    label='select Format'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-[8px] sm:gap-[16px]">
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

                <div className="flex items-center gap-[8px] sm:gap-[16px]">
                    <input
                        id="additional-questions"
                        type="checkbox"
                        onChange={toggleAdditionalQuestions}
                        className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
                    />
                    <label htmlFor="additional-questions" className="text-[14px] sm:text-[16px] font-semibold">Additional Questions</label>
                </div>

                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isAdditionalQuestionsVisible ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{ maxHeight: isAdditionalQuestionsVisible ? '800px' : '0px' }}
                >
                    <div className="md:ml-[35px]">
                        {questions.map((q) => (
                            <div key={q.id} className="flex flex-col gap-[8px]">
                                <label htmlFor={`question-${q.id}`} className="block text-[#2F2F2F] text-[14px] font-[600]">
                                    Question
                                </label>
                                <textarea
                                    id={`question-${q.id}`}
                                    onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                                    className="border rounded-[8px] w-full max-w-[703px] h-[147px] py-2 px-3 text-[16px] font-[400] text-gray-700 leading-[24px]"
                                    rows="4"
                                    placeholder="Type out what question you’d like to ask your customer, it will be shown to them  during their request process."
                                ></textarea>
                                <p className="text-[#939393] text-xs pb-[16px]">max. 600 characters</p>
                            </div>
                        ))}
                        <div className="flex flex-wrap gap-[16px]">
                            <button className="h-[40px] w-full sm:w-[194px] p-2 bg-[#005382] text-white text-sm font-semibold rounded mb-2" type="button"
                                onClick={handleSaveQuestion}
                                disabled={questions.every(q => !q.text.trim())}
                            >
                                Save Question
                            </button>
                            <button className="h-[40px] w-full sm:w-[194px] p-2 bg-[#005382] text-white text-sm font-semibold rounded" type="button"
                                onClick={handleAddQuestion}
                            >
                                Add another Question
                            </button>
                        </div>
                        <ul className="mt-4 list-disc pl-5 text-sm text-[#2F2F2F]">
                            {savedQuestions.map((q, index) => (
                                <li key={index}>{q.text}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderRequirements;
