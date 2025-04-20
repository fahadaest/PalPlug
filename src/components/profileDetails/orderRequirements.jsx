'use client';
import React, { useEffect, useState } from 'react';
import DropdownComponent from './DropdownComponent';

const OrderRequirements = ({ onChildChecksChange, onFormatChange, onQuestionsChange }) => {
  // Track which checkboxes are checked
  const [childChecks, setChildChecks] = useState({
    resume: false,
    jobLink: false,
    portfolio: false,
    additionalQuestions: false,
  });

  // Existing local states
  const [isResumeDropdownVisible, setResumeDropdownVisible] = useState(false);
  const [isAdditionalQuestionsVisible, setIsAdditionalQuestionsVisible] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [questions, setQuestions] = useState([{ id: 1, text: '' }]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [selectedResumeOption, setSelectedResumeOption] = useState('');
  const [questionError, setQuestionError] = useState('');

  // --------------------------------------------
  // NEW: Checkbox handlers that also toggle UI
  // --------------------------------------------
  const handleResumeCheckbox = (e) => {
    const isChecked = e.target.checked;
    setResumeDropdownVisible(isChecked);
    setChildChecks((prev) => ({ ...prev, resume: isChecked }));
  };

  const handleJobLinkCheckbox = (e) => {
    const isChecked = e.target.checked;
    setChildChecks((prev) => ({ ...prev, jobLink: isChecked }));
  };

  const handlePortfolioCheckbox = (e) => {
    const isChecked = e.target.checked;
    setChildChecks((prev) => ({ ...prev, portfolio: isChecked }));
  };

  const handleAdditionalQuestionsCheckbox = (e) => {
    const isChecked = e.target.checked;
    setIsAdditionalQuestionsVisible(isChecked);
    setChildChecks((prev) => ({ ...prev, additionalQuestions: isChecked }));
  };

  // Whenever childChecks changes, notify parent
  useEffect(() => {
    if (onChildChecksChange) {
      onChildChecksChange(childChecks);
    }
  }, [childChecks, onChildChecksChange]);

  // Existing dropdown handlers
  const handleDropdownClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedResumeOption(option);
    setDropdownOpen(false);
    if (onFormatChange) onFormatChange(option);
  };

  const handleQuestionChange = (id, text) => {
    if (text.trim().length > 600) {
      setQuestionError("You have exceeded the maximum of 600 characters.");
    } else {
      setQuestionError('');
    }
    setQuestions(questions.map(q => q.id === id ? { ...q, text } : q));
  };

  const handleSaveQuestion = () => {
    const nonEmptyQuestions = questions.filter(q => q.text.trim() !== '');
    setSavedQuestions([...savedQuestions, ...nonEmptyQuestions]);
    setQuestions([{ id: questions.length + 1, text: '' }]);
    if (questionError) {
      return;
    }
    setSavedQuestions([...savedQuestions, ...nonEmptyQuestions]);
    setQuestions([{ id: questions.length + 1, text: '' }]);
    if (onQuestionsChange) onQuestionsChange([...savedQuestions, ...nonEmptyQuestions]);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: '' }]);
  };

  return (
    <div className='w-full max-w-[978px] h-auto pl-[16px] pt-[40px] pr-[16px] md:p-[40px_80px_40px_80px] mt-5 rounded-[8px] bg-white'>
      <div className='flex flex-col gap-[45px]'>

        <div className='flex flex-col gap-[16px]'>
          <h1 className='text-[16px] leading-tight font-semibold'>
            Which of these items will you require to fulfill <br className='hidden md:block' /> your orders?
          </h1>
          <p className='text-[14px] sm:text-base font-[400] text-[#555555] leading-[18px]'>
            Add questions to help buyers provide you with exactly what you need to start working <br />
            on their order.
          </p>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex items-center gap-4">
            <input
              id="resume"
              type="checkbox"
              checked={childChecks.resume}
              onChange={handleResumeCheckbox}
              className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
            />
            <label htmlFor="resume" className="font-semibold">Resume</label>
          </div>
          {isResumeDropdownVisible && (
            <div className="flex flex-col gap-[8px] md:ml-[35px]">
              <label className="text-sm font-semibold text-[#2F2F2F]">File Format</label>
              <div className='w-[358px] md:w-[276px]' onClick={handleDropdownClick}>
                <DropdownComponent
                  isOpen={isDropdownOpen}
                  options={['Option 1', 'Option 2', 'Option 3']}
                  selectedOption={selectedResumeOption}
                  onOptionChange={handleOptionChange}
                  width="100%"
                  label="Select Format"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-[8px] sm:gap-[16px]">
          <input
            id="job-link"
            type="checkbox"
            checked={childChecks.jobLink}
            onChange={handleJobLinkCheckbox}
            className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
          />
          <label htmlFor="job-link" className="text-[14px] sm:text-[16px] font-semibold">Job Link/URL</label>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <input
            id="portfolio-link"
            type="checkbox"
            checked={childChecks.portfolio}
            onChange={handlePortfolioCheckbox}
            className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
          />
          <label htmlFor="portfolio-link" className="text-[14px] sm:text-[16px] font-semibold">Portfolio Link/URL</label>
        </div>

      
        <div className="flex items-center gap-[8px] sm:gap-[16px]">
          <input
            id="additional-questions"
            type="checkbox"
            checked={childChecks.additionalQuestions}
            onChange={handleAdditionalQuestionsCheckbox}
            className="h-4 w-4 text-blue-600 border border-neutral-white checked:accent-[#005382]"
          />
          <label htmlFor="additional-questions" className="text-[14px] sm:text-[16px] font-semibold">Additional Questions</label>
        </div>

        <div
          className={`transition-all duration-300 mt-[-30px] ease-in-out overflow-hidden ${isAdditionalQuestionsVisible ? 'max-h-auto opacity-100' : 'max-h-0 opacity-0'}`}
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
                  className="w-full max-w-[703px] h-[147px] py-2 px-3 text-[16px] font-[400] text-gray-700 leading-[24px] border border-[#D5D4DC] rounded-[8px] focus:border-[#005382] focus:outline-none"
                  rows="4"
                  placeholder="Type out what question you’d like to ask your customer, it will be shown to them  during their request process."
                ></textarea>
                <p className="text-[#939393] text-xs pb-[16px]">max. 600 characters</p>
                {questionError && (
                 <p className="text-red-500 text-xs pb-[16px]">{questionError}</p>
               )}
              </div>
            ))}
            <div className="flex flex-wrap gap-[16px]">
              <button
                className="h-[40px] w-full sm:w-[194px] p-2 bg-[#005382] text-white text-sm font-semibold rounded mb-2"
                type="button"
                onClick={handleSaveQuestion}
                disabled={questions.every(q => !q.text.trim()) || !!questionError }
              >
                Save Question
              </button>
              <button
                className="h-[40px] w-full sm:w-[194px] p-2 bg-[#005382] text-white text-sm font-semibold rounded"
                type="button"
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
};

export default OrderRequirements;
